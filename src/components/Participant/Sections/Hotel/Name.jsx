import React from "react"
import PropTypes from "prop-types"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { i18n } from "../../../../locale"

function Name({ hotels }) {
  return (
    <Field
      name="hotel.name"
      render={({ field }) => (
        <TextField {...field} select className="flex mt-1" label={i18n("Hotel")}>
          <MenuItem value={i18n("No accommodation")}>{i18n("No accommodation")}</MenuItem>
          {hotels.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

Name.propTypes = {
  hotels: PropTypes.array,
}

Name.defaultProps = {
  hotels: [],
}

export default Name
