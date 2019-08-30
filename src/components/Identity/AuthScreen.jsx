import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { i18n } from "../../locale"
import IdentityContext from "../../context/identity-context"
import Login from "./Login"
import Logout from "./Logout"
import SnackbarWrapper from "../SnackbarWrapper"

function AuthScreen() {
  const { isLoggedIn } = React.useContext(IdentityContext)
  const [snackbar, notify] = React.useState({ open: false, message: "" })

  const onNotify = (message) => {
    notify({ open: !snackbar.open, message })
  }

  return (
    <Box m={2}>
      <Typography paragraph variant="body2">
        {isLoggedIn
          ? i18n("Log out using the button below. Your data is safely stored on our servers")
          : i18n("Welcome back! Log in with your credentials to access your tournaments")}
      </Typography>
      {isLoggedIn ? <Logout onNotify={onNotify} /> : <Login onNotify={onNotify} />}
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
    </Box>
  )
}

export default AuthScreen
