import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import { i18n } from "../../locale"
import { identity } from "../../identity"
import { Login, Logout } from "./"
import { notify } from "../Toast"

function Account(props) {
  React.useEffect(() => {
    if (props.match.params.expired) {
      notify.warn("Your session has expired. Please login again")
    }
  }, [props.match.params.expired])

  return (
    <div className="m-4">
      <Typography paragraph variant="body2">
        {identity.token
          ? i18n("Log out using the button below. Your data is safely stored on our servers")
          : i18n("Welcome back! Log in with your credentials to access your tournaments")}
      </Typography>
      {identity.token ? <Logout /> : <Login />}
    </div>
  )
}

Account.propTypes = {
  match: PropTypes.any,
}

Account.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
}

export default Account
