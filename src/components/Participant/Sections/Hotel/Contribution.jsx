import React from "react"
import PropTypes from "prop-types"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { hasError } from "../../../../utils/validation"

function Contribution({ hidden }) {
  if (hidden) {
    return null
  }

  return (
    <Field
      name="hotel.room.contribution"
      render={({ field, form }) => (
        <TextField
          {...field} // "name", "value", "onChange", "onBlur"
          select
          className="flex w-1/2 mt-2"
          label="Contribution"
          error={hasError(form, field.name)}
          helperText="How much does the participant pay"
        >
          <MenuItem value="default">Bed in room</MenuItem>
          <MenuItem value="full">100%</MenuItem>
          <MenuItem value="empty">0%</MenuItem>
        </TextField>
      )}
    />
  )
}

Contribution.propTypes = {
  hidden: PropTypes.bool,
}

Contribution.defaultProps = {
  hidden: false,
}

export default Contribution
