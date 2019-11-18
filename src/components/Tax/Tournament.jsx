import React from "react"
import store from "store"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import TaxContext from "../../context/tax-context"

function TaxTournament() {
  const { errors, touched } = React.useContext(TaxContext)
  const helperText = (fallback = "") => {
    if (errors.tournament && touched.tournament) {
      return errors.tournament
    }
    return fallback
  }

  const [tournaments, setTournaments] = React.useState([{ value: "*", label: "Every tournament" }])
  React.useEffect(() => {
    const all_tournaments = store.get("tournaments")
    const tournaments = all_tournaments
      .filter((item) => item.data.name)
      .map((item) => ({ value: item.data.name, label: item.data.name }))

    setTournaments((prevState) => [...prevState, ...tournaments])
  }, [])

  return (
    <Field
      type="number"
      name="tournament"
      render={({ field }) => (
        <TextField
          {...field}
          select
          className="flex mt-1 mr-1"
          label="Choose tournament"
          error={errors.tournament && touched.tournament}
          helperText={helperText("Required")}
        >
          {tournaments.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

export default TaxTournament
