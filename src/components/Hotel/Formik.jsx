import React from "react"
import PropTypes from "prop-types"
import { Form } from "formik"
import { HotelContext } from "../../context"
import FormikInput from "../Formik/Input"
import { RoomTypes } from "../Hotel"

function HotelFormik({ errors, touched, isSubmitting, values }) {
  return (
    <HotelContext.Provider value={{ errors, touched, isSubmitting, values }}>
      <Form autoComplete="off">
        <FormikInput name="name" label="Hotel name" helper="Required" />
        <FormikInput name="description" label="Hotel description" helper="Optional" />
        <br />
        <RoomTypes />
      </Form>
    </HotelContext.Provider>
  )
}

HotelFormik.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
}

export default HotelFormik
