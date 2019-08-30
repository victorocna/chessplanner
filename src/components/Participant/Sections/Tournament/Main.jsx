import React from "react"
import PropTypes from "prop-types"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { hasError } from "../../../../utils/validation"

function Main({ tournaments }) {
  return (
    <Field
      name="tournaments.main"
      render={({ field, form }) => (
        <TextField
          {...field}
          select
          className="flex mt-1"
          label="Main tournament"
          error={hasError(form, field.name)}
        >
          {tournaments
            .filter((item) => item.type && item.type === "main")
            .map((item, index) => (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  )
}

Main.propTypes = {
  tournaments: PropTypes.array,
}

Main.defaultProps = {
  tournaments: [],
}

export default Main
