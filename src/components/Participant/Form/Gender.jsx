import React from "react"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { i18n } from "../../../locale"
import { showError, hasError } from "../../../utils/validation"

function Gender() {
  return (
    <Field
      type="text"
      name="gender"
      render={({ field, form }) => (
        <TextField
          {...field}
          select
          className="flex mb-4 w-1/2"
          label={i18n("Gender")}
          error={hasError(form, field.name)}
          helperText={showError(form, field.name, "Optional")}
        >
          <MenuItem value="M">{i18n("Male")}</MenuItem>
          <MenuItem value="F">{i18n("Female")}</MenuItem>
          <MenuItem value="O">{i18n("Other")}</MenuItem>
        </TextField>
      )}
    />
  )
}

export default Gender
