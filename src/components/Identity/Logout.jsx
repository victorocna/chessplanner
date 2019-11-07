import React from "react"
import PropTypes from "prop-types"
import IdentityContext from "../../context/identity-context"
import { Button } from "@material-ui/core"
import clearCache from "./clearCache"

function Logout({ onNotify }) {
  const identity = React.useContext(IdentityContext)
  const handleLogout = async (event) => {
    event.preventDefault()
    return new Promise((resolve) => {
      delete identity.token
      resolve()
    })
      .then(await clearCache)
      .then(() => {
        onNotify("You have been successfully logged out.")
      })
  }

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  )
}

Logout.propTypes = {
  onNotify: PropTypes.func,
}

Logout.defaultProps = {
  onNotify: () => {},
}

export default Logout
