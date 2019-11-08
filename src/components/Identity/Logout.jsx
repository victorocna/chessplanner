import React from "react"
import { Button } from "@material-ui/core"
import clearCache from "./clear-cache"

function Logout() {
  const handleLogout = async (event) => {
    event.preventDefault()
    return new Promise((resolve) => {
      localStorage.removeItem("token")
      resolve()
    })
      .then(await clearCache)
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default Logout
