import React from "react"
import PropTypes from "prop-types"
import IdentityContext from "../../context/identity-context"
import { Button, TextField } from "@material-ui/core"
import cacheData from "./cacheData"

function Login({ onNotify }) {
  const formRef = React.useRef()
  const { loginUser } = React.useContext(IdentityContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    loginUser(email, password)
      .then(() => {
        onNotify("Login successful! Redirecting home...")
      })
      .then(await cacheData)
      .then(() => {
        setTimeout(() => {
          window.location.href = "/#/"
        }, 2000)
      })
      .catch(() => {
        onNotify("Invalid credentials. Please try again")
      })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="login-form">
      <TextField
        variant="outlined"
        label="Email"
        name="email"
        type="text"
        className="flex mb-1 mr-1"
        margin="dense"
        autoFocus
      />
      <TextField
        variant="outlined"
        label="Password"
        name="password"
        type="password"
        className="flex mb-1 mr-1"
        margin="dense"
      />
      <Button variant="contained" color="secondary" type="submit">
        Login
      </Button>
    </form>
  )
}

Login.propTypes = {
  onNotify: PropTypes.func,
}

Login.defaultProps = {
  onNotify: () => {},
}

export default Login
