import React from "react"
import PropTypes from "prop-types"
import { TextField } from "@material-ui/core"
import { Field } from "formik"
import { showError, hasError, showValid } from "../../utils/validation"

function FormikInput({ name, type, label, helper, className }) {
  return (
    <Field
      name={name}
      render={({ field, form }) => (
        <TextField
          {...field} // "name", "value", "onChange", "onBlur"
          type={type}
          className={className}
          label={label}
          error={hasError(form, field.name)}
          helperText={showError(form, field.name, helper)}
          InputProps={{
            endAdornment: showValid(form, field.name),
          }}
        />
      )}
    />
  )
}

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.any,
  className: PropTypes.string,
}

FormikInput.defaultProps = {
  className: "flex mt-2",
  type: "text",
  label: "",
  helper: "",
}

export default FormikInput
