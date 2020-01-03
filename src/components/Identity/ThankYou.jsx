import React from "react"
import PropTypes from "prop-types"
import { Link, Typography } from "@material-ui/core"

const ThankYou = (props) => {
  if (!props.location.state) {
    window.location.href = "/#/"
    return null
  }
  const { email } = props.location.state

  return (
    <div className="m-4">
      <Typography variant="h6" className="mb-1">
        Thank you! Your account has been created.
      </Typography>
      <Typography variant="body2" className="mb-1">
        Please check your email sent to <strong>{email}</strong> and confirm your account.
      </Typography>
      {email.indexOf("gmail.com") > -1 && (
        <Link href="https://mail.google.com">Click here to open Gmail</Link>
      )}
    </div>
  )
}

ThankYou.propTypes = {
  location: PropTypes.any,
}

ThankYou.defaultProps = {
  location: {
    state: {
      email: "",
    },
  },
}

export default ThankYou
