import React from "react"
import PropTypes from "prop-types"
import { Button, FormControlLabel, Switch } from "@material-ui/core"
import { Form, FieldArray } from "formik"
import { SettingContext } from "../../context"
import Input from "../Formik/Input"
import { Datepicker, LanguageChoice } from "../Settings"
import columns from "./possible-columns"
import Debug from "../Debug"

function SettingsFormik({ errors, touched, isSubmitting, values, setFieldValue }) {
  return (
    <SettingContext.Provider value={{ errors, touched, isSubmitting, values, setFieldValue }}>
      <Form autoComplete="off">
        <FieldArray
          name="columns"
          render={({ push, remove }) =>
            Object.keys(columns).map((column, index) => (
              <FormControlLabel
                key={index}
                label={columns[column]}
                className="flex"
                control={
                  <Switch
                    value={column}
                    name="columns"
                    color="primary"
                    checked={values.columns.includes(column)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        push(column)
                      } else {
                        const idx = values.columns.indexOf(column)
                        remove(idx)
                      }
                    }}
                  />
                }
              />
            ))
          }
        />
        <Datepicker name="arrival" label="Arrival" />
        <Datepicker name="departure" label="Departure" />
        <Input
          className="flex w-1/2 mt-2"
          name="currency"
          label="Currency"
          helper="Currency setting is required"
        />
        <LanguageChoice />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="mt-2"
          disabled={isSubmitting}
        >
          Save settings
        </Button>
      </Form>

      <Debug subject={{ errors, touched, isSubmitting, values }} />
    </SettingContext.Provider>
  )
}

SettingsFormik.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
  setFieldValue: PropTypes.func,
}

export default SettingsFormik
