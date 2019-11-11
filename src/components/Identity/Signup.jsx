import React from "react"
import { Button, TextField, Link, Typography } from "@material-ui/core"
import api from "../../api"
import { notify } from "../Toast"
import Password from "./Password"

function Signup() {
  const [isSubmitting, setSubmitting] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)

    api
      .signup({
        username: event.target.username.value,
        password: event.target.password.value,
        origin: window.location.origin,
      })
      .then(() => {
        notify.success("Sign up successful! Please check your email")
      })
      .catch(() => {
        setSubmitting(false)
        notify.error("Error! Something went wrong, please try again")
      })
  }

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <Typography variant="h6" className="mb-1">
        Sign up for a Masterplanner account
      </Typography>
      <TextField
        variant="outlined"
        label="Your email"
        name="username"
        type="text"
        className="flex mb-1 mr-1"
        margin="dense"
        autoFocus
      />
      <Password />
      <p>You will be creating a demo account.</p>
      <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
        Sign up
      </Button>
      <Link href="/#/signin" className="ml-2">
        Already have an account?
      </Link>
    </form>
  )
}

export default Signup
