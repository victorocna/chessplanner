import React from "react"
import IdentityContext from "../../context/identity-context"
import useLoading from "./useLoading"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

function Signup() {
  const formRef = React.useRef()
  const { signupUser } = React.useContext(IdentityContext)
  const { load } = useLoading()

  const handleSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    load(signupUser(email, password))
      .then(() => {
        // TODO: success
      })
      .catch(() => {
        // TODO: error
      })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="login-form">
      <TextField
        variant="outlined"
        label="Your email"
        name="email"
        type="text"
        className="flex mb-1 mr-1"
        margin="dense"
        autoFocus
      />
      <TextField
        variant="outlined"
        label="Your desired password"
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

export default Signup
