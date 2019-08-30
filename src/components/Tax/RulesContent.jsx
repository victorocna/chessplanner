import React from "react"
import PropTypes from "prop-types"
import { TextField, CardContent, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { hasError } from "../../utils/validation"
import { i18n } from "../../locale"
import { possibleKeys, possibleOperands } from "./options"

function TaxRulesContent({ index }) {
  return (
    <CardContent>
      <Field
        type="text"
        name={`rules[${index}].name`}
        render={({ field, form }) => (
          <TextField
            {...field}
            className="flex mt-2"
            label={i18n("Rule name")}
            error={hasError(form, field.name)}
            autoFocus
          />
        )}
      />
      <Field
        name={`rules[${index}].key`}
        render={({ field, form }) => (
          <TextField
            {...field}
            select
            className="flex mt-2"
            label={i18n("Key selection")}
            error={hasError(form, field.name)}
          >
            {possibleKeys.map((option, i) => (
              <MenuItem key={i} value={option.key}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Field
        name={`rules[${index}].eq`}
        render={({ field, form }) => (
          <TextField
            {...field}
            select
            className="flex mt-2"
            label={i18n("Symbol selection")}
            error={hasError(form, field.name)}
          >
            {possibleOperands.map((option, j) => (
              <MenuItem key={j} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Field
        type="text"
        name={`rules[${index}].val`}
        render={({ field, form }) => (
          <TextField
            {...field}
            className="flex mt-2"
            label={i18n("Comparison value")}
            error={hasError(form, field.name)}
          />
        )}
      />
    </CardContent>
  )
}

TaxRulesContent.propTypes = {
  index: PropTypes.number,
}

TaxRulesContent.defaultProps = {
  index: 0,
}

export default TaxRulesContent
