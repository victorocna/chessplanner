import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

export default function SnackbarWrapper(props) {
  const [openSnackbar, setSnackbar] = useState(false)

  useEffect(() => {
    if (props.openSnackbar) {
      setSnackbar(true)
    }
  }, [props.openSnackbar])

  const hideSnackBar = () => {
    setSnackbar(false)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.openSnackbar && openSnackbar}
      message={props.message}
      autoHideDuration={6000}
      onClose={hideSnackBar}
      action={
        <IconButton key="close" aria-label="Close" color="inherit" onClick={hideSnackBar}>
          <CloseIcon />
        </IconButton>
      }
    />
  )
}

SnackbarWrapper.propTypes = {
  openSnackbar: PropTypes.bool,
  message: PropTypes.string,
}

SnackbarWrapper.defaultProps = {
  message: "Something went wrong",
}
