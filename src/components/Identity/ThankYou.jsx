import React from "react"
import PropTypes from "prop-types"
import { Button, Typography } from "@material-ui/core"
import { RetrySend } from "../Identity"

const ThankYou = ({ history, location }) => {
  if (!location.state) {
    history.push("/")
    return null
  }
  const { hash, username } = location.state

  return (
    <div className="m-4">
      <Typography variant="h6" className="mb-1">
        Thank you! Your account has been created.
      </Typography>
      <Typography variant="body2" className="mb-1">
        Please check your email sent to <strong>{username}</strong> and confirm your account.
      </Typography>
      {username.indexOf("gmail.com") > -1 && (
        <Button
          variant="contained"
          color="primary"
          href="https://mail.google.com"
          target="_blank"
          className="mb-1"
        >
          Open Gmail
        </Button>
      )}
      <RetrySend username={username} hash={hash} />
    </div>
  )
}

ThankYou.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
}

ThankYou.defaultProps = {
  history: {
    push: () => {},
  },
  location: {
    state: {
      hash: "",
      username: "",
    },
  },
}

export default ThankYou
