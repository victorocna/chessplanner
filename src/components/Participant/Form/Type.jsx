import React from "react"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { i18n } from "../../../locale"
import { showError, hasError } from "../../../utils/validation"
import { possibleKeys } from "./options"

function Type() {
  return (
    <Field
      type="text"
      name="type"
      render={({ field, form }) => (
        <TextField
          {...field}
          select
          className="flex mt-4 w-1/2"
          label={i18n("Type of participant")}
          error={hasError(form, field.name)}
          helperText={showError(form, field.name, i18n("Required"))}
        >
          {possibleKeys.map((option, i) => {
            return (
              <MenuItem key={i} value={option.key}>
                {option.text}
              </MenuItem>
            )
          })}
        </TextField>
      )}
    />
  )
}

export default Type
