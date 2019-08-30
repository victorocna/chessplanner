import React from "react"
import PropTypes from "prop-types"
import { Button, Divider, List, ListItem } from "@material-ui/core"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"

const ConfirmUpload = (props) => {
  const { open, onClose, onConfirm, message } = props
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
        <List>
          {Object.keys(message).map((item, index) => {
            let itemKey = item.replace(/\./g, " ")
            let itemValue = message[item]
            if (itemValue.toString().length === 13 && !isNaN(new Date(itemValue))) {
              itemKey += "[dd.mm.yy]"
              itemValue = new Date(itemValue).toLocaleDateString("ro-RO")
            }

            return (
              <ListItem key={index}>
                <strong className="capitalize p-r-5px">{itemKey}</strong> → {itemValue}
              </ListItem>
            )
          })}
        </List>
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
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.any,
}

ConfirmUpload.defaultProps = {
  open: false,
  onClose: () => {},
  onConfirm: () => {},
  message: "",
}

export default ConfirmUpload
