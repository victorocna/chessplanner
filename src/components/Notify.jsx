import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

export default class Notify extends React.Component {
  state = {
    open: false,
    message: "",
  }

  openSnackBar = (message = "Something went wrong") => {
    this.setState({
      open: true,
      message: message,
    })
  }

  hideSnackBar = () => {
    this.setState({
      open: false,
      message: "",
    })
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.hideSnackBar}
        message={this.state.message}
        action={
          <IconButton key="close" aria-label="Close" color="inherit" onClick={this.hideSnackBar}>
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }
}
