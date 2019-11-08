import React from "react"
import { Box, Typography, FormControlLabel, Button } from "@material-ui/core"
import NeedHelp from "./NeedHelp"
import fh from "./file-helpers"
import useChip from "./useChip"
import useCheckbox from "./useCheckbox"
import useLoading from "./useLoading"
import useStyles from "../useStyles"
import { notify } from "../Toast"
import prepareUpload from "./prepare-upload"
import fromStore from "../../utils/fromStore"
import howMuch from "../../utils/howMuch"
import deepObject from "../../utils/deepObject"
import api from "../../api"
import { Loading } from "../Loading"
import { i18n } from "../../locale"
import DndWrapper from "./DndWrapper"
import ConfirmUpload from "./ConfirmUpload"
import { validateYupSchema } from "formik"
import { participantSchema } from "../../schema"
import { participantKeys } from "../../data/initial-values"
import merge from "lodash.merge"

function Upload() {
  const classes = useStyles()
  const { chips } = useChip()
  const { isLoading, showLoading, hideLoading } = useLoading()
  const { checkbox, showSkipFirst, showHowMuch } = useCheckbox()

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
          const participant = merge(participantKeys, itemToUpload)

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

  /**
   * @see https://stackoverflow.com/a/46120369/6884801
   */
  const uploadFile = async (event) => {
    let file = event.target.files[0]
    if (!file || !fh.isValidFile(file.name)) {
      notify.warn(i18n("Error! Unsupported file extension"))
      return false
    }

    let contents = ""
    if (fh.isCsv(file.name)) {
      try {
        contents = await fh.contentsFromCsv(file)
      } catch (err) {
        notify.warn(err)
        return false
      }
    }
    if (fh.isExcel(file.name)) {
      try {
        contents = await fh.contentsFromExcel(file)
      } catch (err) {
        notify.warn(err)
        return false
      }
    }

    // skip the first line in the loaded file
    if (checkbox.skipFirst && contents.length >= 1) {
      contents.shift()
    }

    const participantsToUpload = prepareUpload(contents, chips)
    if (checkbox.howMuch) {
      const raw_taxes = await fromStore("all_taxes_by_key")
      const all_taxes = raw_taxes.map((tax) => ({
        ...tax.data,
        id: tax["ref"]["@ref"]["id"],
      }))

      for (let i = 0; i < participantsToUpload.length; i++) {
        let taxes
        try {
          taxes = howMuch(all_taxes, participantsToUpload[i])
        } catch (err) {
          // maybe add an increment with skipped participants
        }

        if (typeof taxes === "object" && howMuch.length > 0) {
          // append taxes to the original participant object
          participantsToUpload[i] = { taxes: taxes, ...participantsToUpload[i] }
        }
      }
    }

    setPayload(participantsToUpload)
    setDialog({ open: true, message: participantsToUpload[0] })
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
      <FormControlLabel
        className="checkbox-flex"
        label={i18n("Determine taxes owed by participants")}
        control={showHowMuch()}
      />
      <DndWrapper />
      <input className={classes.hidden} id="hidden" type="file" onChange={uploadFile} />
      <label htmlFor="hidden">
        <Button variant="contained" color="secondary" component="span" className={classes.button}>
          {i18n("Upload file")}
        </Button>
      </label>
      <NeedHelp />
      <ConfirmUpload
        open={dialog.open}
        message={dialog.message}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Box>
  )
}

export default Upload
