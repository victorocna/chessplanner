import React from "react"
import PropTypes from "prop-types"
import { Button } from "@material-ui/core"
import { Form } from "formik"
import { TournamentContext } from "../../context"
import FormikInput from "../Formik/Input"
import { TournamentType } from "../Tournament/"
import WhatsNext from "../WhatsNext"

function TournamentFormik({ errors, touched, isSubmitting, values, submitCount }) {
  return (
    <TournamentContext.Provider value={{ errors, touched, isSubmitting, values, submitCount }}>
      <Form autoComplete="off">
        <FormikInput name="name" label="Tournament name" helper="Required" />
        <FormikInput name="description" label="Description" helper="Optional" />
        <TournamentType />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="mt-2"
          disabled={isSubmitting}
        >
          Save tournament
        </Button>

        {!!submitCount && !isSubmitting && <WhatsNext path="/#/tournaments" />}
      </Form>
    </TournamentContext.Provider>
  )
}

TournamentFormik.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
  submitCount: PropTypes.number,
}

export default TournamentFormik
