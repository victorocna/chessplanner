import React from "react"
import PropTypes from "prop-types"
import fetch from "node-fetch"
import { Field } from "formik"
import Autocomplete from "../../Autocomplete"
import { hasError } from "../../../utils/validation"

function Name({ onSubmit }) {
  /**
   * Prepare autocomplete suggestions from a public file
   */
  const [suggestions, setSuggestions] = React.useState({})
  React.useEffect(() => {
    fetch("./suggestions.json")
      .then((res) => res.json())
      .then((json) => {
        setSuggestions(json)
      })
  }, [])

  return (
    <Field
      type="text"
      name="name"
      render={({ field, form }) => (
        <Autocomplete
          {...field} // "name", "value", "onChange", "onBlur"
          userInput={field.name}
          suggestions={suggestions}
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
