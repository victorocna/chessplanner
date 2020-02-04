import React from "react"
import PropTypes from "prop-types"
import { TextField, CardContent, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { hasError } from "../../utils/validation"
import { i18n } from "../../locale"
import { possibleKeys, possibleOperands } from "./options"
import { AppContext } from "../../context/"
import shouldShow from "../../utils/shouldShow"

function TaxRulesContent({ index }) {
  const { settings } = React.useContext(AppContext)
  const filteredKeys = possibleKeys.filter(
    ({ key, required }) => required || shouldShow(key).basedOn(settings)
  )

  return (
    <CardContent>
      <Field
        type="text"
        name={`rules[${index}].name`}
        render={({ field, form }) => (
          <TextField
            {...field}
            className="flex mt-8"
            label={i18n("Rule name")}
            helperText={i18n("Give your rule a meaningful name, it will be useful later on")}
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
            className="flex mt-8"
            label={i18n("Key selection")}
            helperText={i18n("For more options, update your settings")}
            error={hasError(form, field.name)}
          >
            {filteredKeys.map((option, i) => (
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
            className="flex mt-8"
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
            className="flex mt-8"
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
