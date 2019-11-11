import React from "react"
import { Button, TextField, Typography, Link } from "@material-ui/core"
import api from "../../api"
import { notify } from "../Toast"

const Forgot = () => {
  const [isSubmitting, setSubmitting] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)

    api
      .forgot({
        username: event.target.username.value,
        origin: window.location.origin,
      })
      .then(() => {
        notify.success("Success! You will receive an email with instructions")
      })
      .catch((err) => {
        if ([400, 403, 404].includes(err.status)) {
          notify.error(err.message)
        } else {
          notify.error("Error! Something went wrong, please try again")
        }
        setSubmitting(false)
      })
  }

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <Typography variant="h6" className="mb-1">
        Forgot your Masterplanner password? Recover it below
      </Typography>
      <TextField
        variant="outlined"
        label="Your email"
        name="username"
        type="email"
        className="flex mb-1 mr-1"
        margin="dense"
        autoComplete="new-password"
        autoFocus
      />
      <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
        Recover password
      </Button>
      <Link href="/#/account" className="ml-2">
        Login here
      </Link>
    </form>
  )
}

export default Forgot
