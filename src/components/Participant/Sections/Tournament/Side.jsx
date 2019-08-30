import React from "react"
import PropTypes from "prop-types"
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core"
import { FieldArray } from "formik"
import { ParticipantContext } from "../../../../context"

function Side({ tournaments }) {
  const { values } = React.useContext(ParticipantContext)
  const name = "tournaments.side" // from initial values

  return (
    <FieldArray
      name={name}
      render={({ push, remove }) => (
        <FormGroup className="flex mt-1" label="Side tournament">
          {tournaments
            .filter((item) => item.type && item.type === "side")
            .map((item, index) => (
              <FormControlLabel
                key={index}
                label={item.name}
                control={
                  <Checkbox
                    value={item.name}
                    name={name}
                    checked={values.tournaments.side.includes(item.name)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        push(item.name)
                      } else {
                        const idx = values.tournaments.side.indexOf(item.name)
                        remove(idx)
                      }
                    }}
                  />
                }
              />
            ))}
        </FormGroup>
      )}
    />
  )
}

Side.propTypes = {
  tournaments: PropTypes.array,
}

Side.defaultProps = {
  tournaments: [],
}

export default Side
