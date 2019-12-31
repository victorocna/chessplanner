import React from "react"
import PropTypes from "prop-types"
import { Link, Typography } from "@material-ui/core"

const ThankYou = (props) => {
  const { email } = props
  if (!email) {
    window.location.href = "/#/"
  }

  return (
    <div className="m-4">
      <Typography variant="h6" className="mb-1">
        Thank you! Your account has been created.
      </Typography>
      <Typography variant="body2" className="mb-1">
        Please check your email sent to <strong>{email}</strong> and confirm your account.
      </Typography>
      {email.indexOf("gmail.com") > -1 && (
        <Link href="https://mail.google.com">
          Click here to open Gmail
        </Link>
      )}
    </div>
  )
}

ThankYou.propTypes = {
  email: PropTypes.string,
}

ThankYou.defaultProps = {
  email: "",
}

export default ThankYou
