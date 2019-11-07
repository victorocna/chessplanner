import React from "react"
import PropTypes from "prop-types"
import IdentityContext from "../../context/identity-context"
import { Button, TextField, Link, Paper, Typography } from "@material-ui/core"
import cacheData from "./cacheData"
import api from "../../api"
import store from "store"

function Login({ onNotify }) {
  const formRef = React.useRef()
  const identity = React.useContext(IdentityContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    api
      .signin({
        username,
        password,
      })
      .then((token) => {
        // set the token in local storage and in React context
        store.set("token", token)
        identity.token = token
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
        name="username"
        type="email"
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
      <Link href="/#/forgot" className="ml-2">
        Forgot password?
      </Link>

      <Paper className="mt-2 p-4 paper-signup">
        <Typography variant="h6">Don&apos;t have an account yet?</Typography>
        <Typography variant="body2">
          Create a demo account to try out Masterplanner today.
        </Typography>
        <Button variant="contained" color="primary" href="/#/signup" className="mt-1">
          Sign up for Masterplanner
        </Button>
      </Paper>
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
