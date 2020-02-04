import React from "react"
import PropTypes from "prop-types"
import { Field } from "formik"
import Autocomplete from "../../Autocomplete"
import { hasError } from "../../../utils/validation"

function Name({ ready, onSubmit }) {
  return (
    <Field
      type="text"
      name="name"
      render={({ field, form }) => (
        <Autocomplete
          {...field} // "name", "value", "onChange", "onBlur"
          userInput={field.name}
          ready={ready}
          onSubmit={onSubmit}
          error={hasError(form, field.name)}
        />
      )}
    />
  )
}

Name.propTypes = {
  ready: PropTypes.bool,
  onSubmit: PropTypes.func,
}

export default Name
