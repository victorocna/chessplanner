import React from "react"
import { TextField } from "@material-ui/core"
import { Field } from "formik"
import { hasError } from "../../../utils/validation"

function Notes() {
  return (
    <Field
      name="notes"
      render={({ field, form }) => (
        <TextField
          {...field} // "name", "value", "onChange", "onBlur"
          variant="outlined"
          multiline
          rows={3}
          className="flex mt-1"
          label="Notes"
          error={hasError(form, field.name)}
        />
      )}
    />
  )
}

export default Notes
