import React from "react"
import PropTypes from "prop-types"
import { Button, TextField, Link, Paper, Typography } from "@material-ui/core"
import cacheData from "./cache-data"
import api from "../../api"
import { notify } from "../Toast"
import Password from "./Password"

function Login(props) {
  const { onSuccess } = props
  const [isSubmitting, setSubmitting] = React.useState(false)

  const handleLogin = async (event) => {
    if (isSubmitting) {
      return false // return early if the first request did not finish
    }
    event.preventDefault()
    setSubmitting(true)

    api
      .login({
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((token) => {
        // set the token in local storage and in React context
        localStorage.setItem("token", token)
        notify.success("Login successful! Redirecting home...")
      })
      .then(await cacheData)
      .then(() => {
        setTimeout(() => {
          onSuccess() // re-renders main component with settings
          window.location.href = "/#/"
        }, 2000)
      })
      .catch((err) => {
        if ([400, 403, 404].includes(err.status)) {
          notify.error(err.message)
        } else {
          notify.error("Error! Something went wrong, please try again")
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <TextField
        variant="outlined"
        label="Email"
        name="username"
        type="email"
        className="flex mb-4 mr-4"
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

      <Paper className="mt-8 p-4 paper-signup">
        <Typography variant="h6">Don&apos;t have an account yet?</Typography>
        <Typography variant="body2">
          Create a demo account to try out Chessplanner today.
        </Typography>
        <Button variant="contained" color="primary" href="/signup" className="mt-4">
          Sign up for Chessplanner
        </Button>
      </Paper>
    </form>
  )
}

Login.propTypes = {
  onSuccess: PropTypes.func,
}

Login.defaultProps = {
  onSuccess: () => {},
}

export default Login
