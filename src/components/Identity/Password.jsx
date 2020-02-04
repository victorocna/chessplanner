import React from "react"
import PropTypes from "prop-types"
import { TextField, InputAdornment, IconButton } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"

const Password = (props) => {
  const { label } = props

  const [showPassword, setVisibility] = React.useState(false)
  const togglePassword = () => {
    setVisibility(!showPassword)
  }

  return (
    <TextField
      variant="outlined"
      label={label}
      name="password"
      type={showPassword ? "text" : "password"}
      className="flex mb-4 mr-4"
      margin="dense"
      autoComplete="new-password"
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

Password.propTypes = {
  label: PropTypes.string,
}

Password.defaultProps = {
  label: "Password",
}

export default Password
