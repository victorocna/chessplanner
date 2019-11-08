import React from "react"
import { Typography } from "@material-ui/core"
import { i18n } from "../../locale"
import { identity } from "../../identity"
import { Login, Logout } from "./"

function Account() {
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

export default Account
