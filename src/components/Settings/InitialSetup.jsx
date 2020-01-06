import React from "react"
import { Field } from "formik"
import { Checkbox, FormControlLabel } from "@material-ui/core"
import { i18n } from "../../locale"

const InitialSetup = () => {
  return (
    <Field
      name="hide.initialsetup"
      render={({ field }) => (
        <FormControlLabel
          className="checkbox-flex mt-4"
          label={i18n("Hide initial setup?")}
          control={
            <Checkbox
              {...field} // "name", "value", "onChange", "onBlur"
              checked={field.value}
            />
          }
        />
      )}
    />
  )
}

export default InitialSetup
