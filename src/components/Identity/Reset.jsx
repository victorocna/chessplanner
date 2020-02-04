import React from "react"
import PropTypes from "prop-types"
import { Button, Typography, Link } from "@material-ui/core"
import api from "../../api"
import { notify } from "../Toast"
import Password from "./Password"

const Reset = (props) => {
  const [isSubmitting, setSubmitting] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)

    api
      .reset({
        password: event.target.password.value,
        hash: props.match.params.hash,
      })
      .then(() => {
        notify.success("Success! Your password has been reset")
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
      <Typography variant="h6" className="mb-4">
        Type your new password below
      </Typography>
      <Password label="Your new password" />
      <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
        Reset password
      </Button>
      <Link href="/#/account" className="ml-2">
        Want to login instead?
      </Link>
    </form>
  )
}

Reset.propTypes = {
  match: PropTypes.any,
}

Reset.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
}

export default Reset
