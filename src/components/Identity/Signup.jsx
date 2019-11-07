import React from "react"
import { Button, TextField, Link, Typography } from "@material-ui/core"
import api from "../../api"
import SnackbarWrapper from "../SnackbarWrapper"

function Signup() {
  const [isSubmitting, submitting] = React.useState(false)

  const [snackbar, notify] = React.useState({ open: false, message: "" })
  const onNotify = (message) => {
    notify({ open: !snackbar.open, message })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitting(true)
    const username = event.target.email.value
    const password = event.target.password.value

    api
      .signup({
        username,
        password,
        origin: window.location.origin
      })
      .then(() => {
        onNotify("Sign up successful! Please check your email")
      })
      .catch(() => {
        onNotify("Error! Something went wrong, please try again")
      })
  }

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <Typography variant="h6" className="mb-1">Sign up for a Masterplanner account</Typography>
      <TextField
        variant="outlined"
        label="Your email"
        name="email"
        type="text"
        className="flex mb-1 mr-1"
        margin="dense"
        autoFocus
      />
      <TextField
        variant="outlined"
        label="Your desired password"
        name="password"
        type="password"
        className="flex mb-1 mr-1"
        margin="dense"
      />
      <p>You will be creating a demo account.</p>
      <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
        Sign up
      </Button>
      <Link href="/#/signin" className="ml-2">
        Already have an account?
      </Link>
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
    </form>
  )
}

export default Signup
