import React from "react"
import PropTypes from "prop-types"
import { Form } from "formik"
import { TaxContext } from "../../context"
import FormikInput from "../Formik/Input"
import { TaxTournament, TaxRules } from "../Tax"

function TaxFormik({ errors, touched, isSubmitting, values }) {
  return (
    <TaxContext.Provider value={{ errors, touched, isSubmitting, values }}>
      <Form autoComplete="off">
        <FormikInput name="name" label="Tax name" helper="Required" />
        <div className="splitInput">
          <FormikInput name="value" label="Tax value" helper="Required" />
          <FormikInput name="currency" label="Currency" helper="Recommended" />
        </div>
        <TaxTournament />
        <FormikInput
          name="priority"
          label="Priority"
          helper="Between 1 and 50. Taxes with high priorities will be applied first"
        />
        <br />
        <TaxRules />
      </Form>
    </TaxContext.Provider>
  )
}

TaxFormik.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
}

export default TaxFormik
