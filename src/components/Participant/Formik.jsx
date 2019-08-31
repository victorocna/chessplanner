import React from "react"
import PropTypes from "prop-types"
import { Button, Typography } from "@material-ui/core"
import { Form } from "formik"
import Input from "../Formik/Input"
import { AppContext, ParticipantContext } from "../../context/"
import { Name, Type, Gender, Notes } from "./Form"
import { i18n } from "../../locale"
import { HotelSection, PaymentSection, TournamentSection } from "./Sections"
import shouldShow from "../../utils/shouldShow"
import Debug from "../Debug"

function ParticipantFormik({ errors, touched, isSubmitting, isValid, values, setFieldValue }) {
  const { settings } = React.useContext(AppContext)
  const [step, setStep] = React.useState("initial")

  const autocompleteSubmit = (participantValues) => {
    const valuesToAutocomplete = ["name", "yob", "gender", "federation", "club"]
    for (let i = 0; i < valuesToAutocomplete.length; i++) {
      setFieldValue(valuesToAutocomplete[i], participantValues[valuesToAutocomplete[i]])
    }
  }

  const federationHelper = () => (
    <a
      href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      ISO3 Format
    </a>
  )

  return (
    <ParticipantContext.Provider value={{ errors, touched, isSubmitting, values, setFieldValue }}>
      {step === "initial" && (
        <Form autoComplete="off">
          <Name onSubmit={autocompleteSubmit} />
          <Type />

          {shouldShow("yob").basedOn(settings) && (
            <Input
              className="flex w-1/2 mb-1"
              name="yob"
              type="number"
              label={i18n("Year of birth")}
              helper={i18n("Optional")}
            />
          )}

          {shouldShow("gender").basedOn(settings) && <Gender />}
          {shouldShow("club").basedOn(settings) && (
            <Input
              className="flex mb-1"
              name="club"
              label={i18n("Club")}
              helper={i18n("Optional")}
            />
          )}

          {shouldShow("federation").basedOn(settings) && (
            <Input
              className="flex w-1/2 mb-1"
              name="federation"
              label={i18n("Federation")}
              helper={federationHelper()}
            />
          )}

          <Typography variant="h6" className="mt-2">
            {i18n("Choose tournaments")}
          </Typography>
          <TournamentSection />

          <Typography variant="h6" className="mt-2">
            {i18n("Choose accommodation")}
          </Typography>
          <HotelSection />

          {shouldShow("notes").basedOn(settings) && (
            <div>
              <Typography variant="h6" className="mt-2">
                {i18n("Details")}
              </Typography>
              <Notes />
            </div>
          )}

          <Button
            variant="contained"
            color="secondary"
            type="button"
            className="mt-2"
            disabled={!isValid}
            onClick={() => {
              setStep("confirm")
            }}
          >
            {i18n("Continue to taxes")}
          </Button>
        </Form>
      )}

      {step === "confirm" && (
        <Form autoComplete="off">
          <Typography variant="h6" className="mt-2">
            {i18n("Review taxes and payment")}
          </Typography>
          <PaymentSection />

          {shouldShow("notes").basedOn(settings) && (
            <div>
              <Typography variant="h6" className="mt-2">
                {i18n("Details")}
              </Typography>
              <Notes />
            </div>
          )}

          <Button
            variant="outlined"
            color="primary"
            className="mr-1 mt-1"
            onClick={() => {
              setStep("initial")
            }}
          >
            {i18n("Modify entry")}
          </Button>
          <Button variant="contained" color="secondary" className="mr-1 mt-1" type="submit">
            {i18n("Save")}
          </Button>
        </Form>
      )}
      <Debug subject={{ errors, touched, isSubmitting, isValid, values, setFieldValue }} />
    </ParticipantContext.Provider>
  )
}

ParticipantFormik.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  setFieldValue: PropTypes.func,
}

export default ParticipantFormik
