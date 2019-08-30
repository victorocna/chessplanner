import React from "react"
import PropTypes from "prop-types"
import { TextField, CardContent } from "@material-ui/core"
import { Field } from "formik"
import { hasError } from "../../utils/validation"

function RoomTypesContent({ index }) {
  return (
    <CardContent>
      <Field
        type="text"
        name={`roomTypes[${index}].name`}
        render={({ field, form }) => (
          <TextField
            {...field}
            className="flex mt-2"
            label="Room name"
            error={hasError(form, field.name)}
            autoFocus
          />
        )}
      />
      <Field
        type="number"
        name={`roomTypes[${index}].capacity`}
        render={({ field, form }) => (
          <TextField
            {...field}
            className="flex mt-2"
            label="Room capacity"
            error={hasError(form, field.name)}
          />
        )}
      />
      <Field
        type="number"
        name={`roomTypes[${index}].price`}
        render={({ field, form }) => (
          <TextField
            {...field}
            className="flex mt-2"
            label="Room price (full)"
            error={hasError(form, field.name)}
          />
        )}
      />
      <Field
        type="text"
        name={`roomTypes[${index}].currency`}
        render={({ field, form }) => (
          <TextField
            {...field}
            className="flex mt-2"
            label="Currency"
            error={hasError(form, field.name)}
          />
        )}
      />
    </CardContent>
  )
}

RoomTypesContent.propTypes = {
  index: PropTypes.number,
}

RoomTypesContent.defaultProps = {
  index: 0,
}

export default RoomTypesContent
