import React from "react"
import PropTypes from "prop-types"
import { Field } from "formik"
import { TextField } from "@material-ui/core/"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import enGBLocale from "date-fns/locale/en-GB"
import { i18n } from "../../../../locale"
import { hasError } from "../../../../utils/validation"
import ParticipantContext from "../../../../context/participant-context"

function Timeframe({ hidden }) {
  const { values, setFieldValue } = React.useContext(ParticipantContext)

  const hasAccomodation = () => {
    return values.hotel.name && values.hotel.name !== i18n("No accommodation")
  }
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d)
  }
  const nights = () => {
    if (!values.hotel.arrival || !values.hotel.departure) {
      return ""
    }

    const _arrival = new Date(values.hotel.arrival)
    const _departure = new Date(values.hotel.departure)

    if (isValidDate(_arrival) && isValidDate(_departure)) {
      const timeDiff = _departure.getTime() - _arrival.getTime()
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

      if (!isNaN(diffDays) && diffDays > 0) {
        return diffDays
      }
    }
    return "N/A"
  }

  React.useEffect(() => {
    if (hasAccomodation()) {
      if (!values.hotel.arrival) {
        values.hotel.arrival = +Date.now()
      }
      if (!values.hotel.departure) {
        values.hotel.departure = +new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      }
    } else {
      values.hotel.arrival = ""
      values.hotel.departure = ""
    }

    setFieldValue("hotel.nights", nights())
    // eslint-disable-next-line
  }, [values.hotel.name])
  React.useEffect(() => {
    setFieldValue("hotel.nights", nights())
    // eslint-disable-next-line
  }, [values.hotel.arrival, values.hotel.departure])

  if (hidden) {
    return null
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enGBLocale}>
        <Field
          name="hotel.arrival"
          render={({ field, form }) => (
            <DatePicker
              {...field} // "name", "value", "onChange", "onBlur"
              format="dd/MM/yyyy"
              className="flex w-1/2 mt-2"
              label={i18n("Arrival")}
              error={hasError(form, "hotel.arrival")}
              onChange={(newDate) => {
                setFieldValue("hotel.arrival", +newDate)
              }}
              autoOk
            />
          )}
        />

        <Field
          name="hotel.departure"
          render={({ field, form }) => (
            <DatePicker
              {...field} // "name", "value", "onChange", "onBlur"
              format="dd/MM/yyyy"
              className="flex w-1/2 mt-2"
              label={i18n("Departure")}
              error={hasError(form, "hotel.departure")}
              onChange={(newDate) => {
                setFieldValue("hotel.departure", +newDate)
              }}
              autoOk
            />
          )}
        />
      </MuiPickersUtilsProvider>

      <Field
        name="hotel.nights"
        render={({ field, form }) => {
          return (
            <TextField
              {...field} // "name", "value", "onChange", "onBlur"
              className="flex w-1/2 mt-2"
              label={i18n("Total nights")}
              error={hasError(form, "hotel.nights")}
              disabled
            />
          )
        }}
      />
    </div>
  )
}

Timeframe.propTypes = {
  hidden: PropTypes.bool,
}

Timeframe.defaultProps = {
  hidden: false,
}

export default Timeframe
