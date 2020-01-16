import React from "react"
import PropTypes from "prop-types"
import { Button, Paper, Typography } from "@material-ui/core"
import api from "../../api"

const Confirm = (props) => {
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)
  React.useEffect(() => {
    api
      .confirm({
        hash: props.match.params.hash
      })
      .then(() => {
        // valid hash
        setSuccess(true)
      })
      .catch(() => {
        // invalid hash
        setError(true)
      })
  }, [props.match.params.hash])

  return (
    <div className="m-4">
      {success && (
        <Paper className="mb-2 p-4 paper-signup">
          <Typography variant="h6">Success!</Typography>
          <Typography variant="body2">
            Your account has been confirmed. You may login using your credentials
          </Typography>
          <Button variant="contained" color="primary" href="/#/account" className="mt-1">
            Sign in
          </Button>
        </Paper>
      )}

      {error && (
        <Paper className="mb-2 p-4 paper-signup">
          <Typography variant="h6">Error!</Typography>
          <Typography variant="body2">
            We are unable to verify your account. Please try again later or sign up again for a
            Chessplanner account.
          </Typography>
          <Button variant="contained" color="primary" href="/#/signup" className="mt-1">
            Sign up
          </Button>
        </Paper>
      )}
    </div>
  )
}

Confirm.propTypes = {
  match: PropTypes.any,
}

Confirm.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
}

export default Confirm
