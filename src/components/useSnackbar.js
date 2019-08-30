import React, { useState } from "react"
import SnackbarWrapper from "./SnackbarWrapper"

const useSnackbar = () => {
  const [snackbar, notify] = useState({
    open: false,
    message: "",
  })

  const NotifyWrapper = () => {
    if (snackbar.open) {
      return <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
    }
    return false
  }

  return {
    snackbar,
    notify,
    NotifyWrapper,
  }
}

export default useSnackbar
