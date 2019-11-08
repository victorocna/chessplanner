import React from "react"
import { Button, TextField, Link, Paper, Typography } from "@material-ui/core"
import cacheData from "./cache-data"
import api from "../../api"
import { notify } from "../Toast"
import Password from "./Password"

function Login() {
  const [isSubmitting, setSubmitting] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    const username = event.target.username.value
    const password = event.target.password.value

    api
      .login({
        username,
        password,
      })
      .then((token) => {
        // set the token in local storage and in React context
        localStorage.setItem("token", token)
        notify.success("Login successful! Redirecting home...")
      })
      .then(await cacheData)
      .then(() => {
        setSubmitting(false)
        setTimeout(() => {
          window.location.href = "/#/"
        }, 2000)
      })
      .catch(() => {
        notify.error("Invalid credentials. Please try again")
      })
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <TextField
        variant="outlined"
        label="Email"
        name="username"
        type="email"
        className="flex mb-1 mr-1"
        margin="dense"
        autoFocus
      />
      <Password />
      <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
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

export default Login
