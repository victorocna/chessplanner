import React from "react"
import { Field } from "formik"
import { InputLabel, FormControl, MenuItem, Select } from "@material-ui/core"
import { i18n } from "../../locale"

function LanguageChoice() {
  return (
    <Field
      name="language"
      render={({ field }) => (
        <FormControl className="flex w-1/2 mt-2">
          <InputLabel htmlFor="language-choice">
            {i18n("Language")}
          </InputLabel>
          <Select
            {...field} // "name", "value", "onChange", "onBlur"
            inputProps={{ name: "language", id: "language-choice" }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ro">Română</MenuItem>
            <MenuItem value="fr" disabled>
              Français
            </MenuItem>
          </Select>
        </FormControl>
      )}
    />
  )
}

export default LanguageChoice
