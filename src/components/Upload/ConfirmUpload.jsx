import React from "react"
import PropTypes from "prop-types"
import { Button, Divider } from "@material-ui/core"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import { humanReadable } from "./helpers"

const ConfirmUpload = (props) => {
  const { open, chips, message, onClose, onConfirm } = props
  const handleClose = () => {
    onClose()
  }
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Confirm upload</DialogTitle>
      <DialogContent>
        <div className="mb-1">
          This is the first row you will be uploading. Would you like to continue with the import?
        </div>
        <Divider />
        <div className="my-4 grid grid-confirm-upload">
          {Object.keys(message).map((item, i) => (
            <React.Fragment key={i}>
              <strong className="p-r-5px">{chips[i].text}</strong>
              <div>{humanReadable(chips[i].datatype, message[item])}</div>
            </React.Fragment>
          ))}
        </div>
      </DialogContent>
      <DialogActions className="mb-1 mr-1">
        <Button onClick={handleClose} color="primary" variant="outlined">
          No, cancel import
        </Button>
        <Button onClick={handleConfirm} color="secondary" variant="contained">
          Yes, continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmUpload.propTypes = {
  open: PropTypes.bool,
  chips: PropTypes.array,
  message: PropTypes.any,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

ConfirmUpload.defaultProps = {
  open: false,
  chips: [],
  message: "",
  onClose: () => {},
  onConfirm: () => {},
}

export default ConfirmUpload
