import React from "react"
import { TextField, InputAdornment, IconButton } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"

const Password = () => {
  const [showPassword, setVisibility] = React.useState(false)
  const togglePassword = () => {
    setVisibility(!showPassword)
  }

  return (
    <TextField
      variant="outlined"
      label="Your desired password"
      name="password"
      type={showPassword ? "text" : "password"}
      className="flex mb-1 mr-1"
      margin="dense"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Password
