import React from "react"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { TournamentContext } from "../../context"
import { AppContext } from "../../context/"
import shouldShow from "../../utils/shouldShow"

function TournamentType() {
  const { settings } = React.useContext(AppContext)
  const { errors, touched } = React.useContext(TournamentContext)
  const helperText = (fallback = "") => {
    if (errors.type && touched.type) {
      return errors.type
    }
    return fallback
  }

  return (
    <Field
      type="text"
      name="type"
      render={({ field }) => (
        <TextField
          {...field}
          select
          className="flex mt-4 mr-4"
          label="Choose tournament type"
          error={errors.type && touched.type}
          helperText={helperText(
            "Participants can play in only one main tournament and in multiple sides"
          )}
        >
          <MenuItem value="main">Main tournament</MenuItem>
          {shouldShow("tournaments.side").basedOn(settings) && (
            <MenuItem value="side">Side tournament</MenuItem>
          )}
        </TextField>
      )}
    />
  )
}

export default TournamentType
