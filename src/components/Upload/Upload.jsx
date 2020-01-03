import React from "react"
import { Box, Typography, FormControlLabel, Button } from "@material-ui/core"
import { validateYupSchema } from "formik"
import merge from "lodash.merge"
import { notify } from "../Toast"
import deepObject from "../../utils/deepObject"
import api from "../../api"
import { Loading } from "../Loading"
import { i18n } from "../../locale"
import { participantSchema } from "../../schema"
import { uploadKeys } from "../../data/initial-values"
import { options, uploadFile } from "./helpers"
import { useChip, useLoading, useCheckbox } from "../Upload"
import { NeedHelp, DndWrapper, ConfirmUpload } from "../Upload"

function Upload() {
  const { chips, renderChip } = useChip(options)
  const { isLoading, showLoading, hideLoading } = useLoading()
  const { checkbox, showSkipFirst } = useCheckbox()

  const [payload, setPayload] = React.useState([])
  const [dialog, setDialog] = React.useState({
    open: false,
    message: "",
  })
  const handleClose = () => {
    setDialog({ open: false, message: "" })
  }
  const handleConfirm = async () => {
    let j = 0
    handleClose()
    showLoading()
    await Promise.all(
      payload
        .filter((item) => typeof item === "object")
        .map(async (item) => {
          const itemToUpload = deepObject(item)
          const participant = merge(uploadKeys, itemToUpload)

          await validateYupSchema(participant, participantSchema)
            .then(async () => {
              await api.create("participants", participant).then(() => {
                j++
              })
            })
            .catch((err) => {
              // eslint-disable-next-line
              console.log(err)
            })
        })
    )
    hideLoading()
    j > 0
      ? notify.success(i18n("Success! Participants imported: ") + j)
      : notify.warn(i18n("Error! No participants uploaded"))
  }

  const handleUpload = async (event) => {
    try {
      const participantsToUpload = await uploadFile(event, chips, checkbox)
      setPayload(participantsToUpload)
      setDialog({ open: true, chips, message: participantsToUpload[0] })
    } catch (err) {
      notify.warn(err.message)
    }
  }

  return (
    <Box m={2} className="hotelForm">
      {isLoading ? <Loading /> : null}
      <Typography variant="h6">{i18n("Upload participants")}</Typography>
      <Typography variant="body2">
        {i18n(
          "Below you can find a list of available columns that should be present in your CSV/Excel file. Reorder or delete them according to your needs"
        )}
      </Typography>
      <FormControlLabel
        className="checkbox-flex"
        label={i18n("Headers in first row?")}
        control={showSkipFirst()}
      />
      <DndWrapper chips={chips} renderChip={renderChip} />
      <input className="hidden" id="hidden" type="file" onChange={handleUpload} />
      <label htmlFor="hidden">
        <Button variant="contained" color="secondary" component="span" className="mt-4">
          {i18n("Upload file")}
        </Button>
      </label>
      <NeedHelp />
      <ConfirmUpload
        open={dialog.open}
        chips={chips}
        message={dialog.message}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Box>
  )
}

export default Upload
