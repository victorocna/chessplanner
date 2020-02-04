import React from "react"
import PropTypes from "prop-types"
import { Field } from "formik"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import enGBLocale from "date-fns/locale/en-GB"
import { hasError } from "../../utils/validation"
import { SettingContext } from "../../context/"

function Datepicker({ name, label }) {
  const { setFieldValue } = React.useContext(SettingContext)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enGBLocale}>
      <Field
        name={name}
        render={({ field, form }) => (
          <DatePicker
            {...field} // "name", "value", "onChange", "onBlur"
            format="yyyy/MM/dd"
            className="flex w-1/2 mt-8"
            label={label}
            error={hasError(form, field.name)}
            onChange={(newDate) => {
              setFieldValue(field.name, +newDate)
            }}
            autoOk
          />
        )}
      />
    </MuiPickersUtilsProvider>
  )
}

Datepicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
}

Datepicker.defaultProps = {
  label: "",
  name: "",
}

export default Datepicker
