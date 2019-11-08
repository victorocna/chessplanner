import React from "react"
import IdentityContext from "../../context/identity-context"
import { Button } from "@material-ui/core"
import clearCache from "./clearCache"
import { notify } from "../Toast"

function Logout() {
  const identity = React.useContext(IdentityContext)
  const handleLogout = async (event) => {
    event.preventDefault()
    return new Promise((resolve) => {
      delete identity.token
      resolve()
    })
      .then(await clearCache)
      .then(() => {
        notify.success("You have been successfully logged out.")
      })
  }

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default Logout
