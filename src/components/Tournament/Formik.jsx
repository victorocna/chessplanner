import React from "react"
import PropTypes from "prop-types"
import { Button } from "@material-ui/core"
import { Form } from "formik"
import { TournamentContext } from "../../context"
import FormikInput from "../Formik/Input"
import { TournamentType } from "../Tournament/"

function TournamentFormik({ errors, touched, isSubmitting, values }) {
  return (
    <TournamentContext.Provider value={{ errors, touched, isSubmitting, values }}>
      <Form autoComplete="off">
        <FormikInput name="name" label="Tournament name" helper="Required" autoFocus />
        <FormikInput name="description" label="Description" helper="Optional" />
        <TournamentType />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="mt-8"
          disabled={isSubmitting}
        >
          Save tournament
        </Button>
      </Form>
    </TournamentContext.Provider>
  )
}

TournamentFormik.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
}

export default TournamentFormik
