import React from "react"
import PropTypes from "prop-types"
import { Field } from "formik"
import Autocomplete from "../../Autocomplete"
import FormikInput from "../../Formik/Input"
import { hasError } from "../../../utils/validation"

function Name({ ready, onSubmit }) {
  const renderAutocomplete = () => (
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

  const renderInput = () => (
    <Field
      type="text"
      name="name"
      render={({ field, form }) => (
        <FormikInput
          {...field} // "name", "value", "onChange", "onBlur"
          label="Name"
          className="flex mt-4"
          helper="Required"
          error={hasError(form, field.name)}
        />
      )}
    />
  )

  return ready ? renderAutocomplete() : renderInput()
}

Name.propTypes = {
  ready: PropTypes.bool,
  onSubmit: PropTypes.func,
}

export default Name
