import React from "react"
import PropTypes from "prop-types"
import { Button, TextField, Link, Typography } from "@material-ui/core"
import api from "../../api"
import { notify } from "../Toast"
import { Password } from "../Identity"

function Signup(props) {
  const [isSubmitting, setSubmitting] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)

    const username = event.target.username.value
    const password = event.target.password.value
    const origin = window.location.origin

    api
      .signup({
        username,
        password,
        origin,
      })
      .then(() => {
        props.history.push({
          pathname: "/thank-you",
          state: {
            email: username,
          },
        })
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
        Sign up for a Masterplanner account
      </Typography>
      <TextField
        variant="outlined"
        label="Your email"
        name="username"
        type="text"
        className="flex mb-1 mr-1"
        margin="dense"
        autoComplete="new-password"
        autoFocus
      />
      <Password />
      <p>You will be creating a demo account.</p>
      <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
        Sign up
      </Button>
      <Link href="/#/account" className="ml-2">
        Already have an account?
      </Link>
    </form>
  )
}

Signup.propTypes = {
  history: PropTypes.any,
}

Signup.defaultProps = {
  history: {
    push: () => ({}),
  },
}

export default Signup
