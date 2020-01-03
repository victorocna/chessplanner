import React from "react"
import PropTypes from "prop-types"
import { Field } from "formik"
import Autocomplete from "../../Autocomplete"
import { hasError } from "../../../utils/validation"

function Name({ onSubmit }) {
  return (
    <Field
      type="text"
      name="name"
      render={({ field, form }) => (
        <Autocomplete
          {...field} // "name", "value", "onChange", "onBlur"
          userInput={field.name}
          onSubmit={onSubmit}
          error={hasError(form, field.name)}
        />
      )}
    />
  )
}

Name.propTypes = {
  onSubmit: PropTypes.func,
}

export default Name
