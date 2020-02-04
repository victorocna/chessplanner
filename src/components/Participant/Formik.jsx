import React from "react"
import PropTypes from "prop-types"
import { Button, Typography } from "@material-ui/core"
import { Warning } from "@material-ui/icons"
import { Form } from "formik"
import Input from "../Formik/Input"
import { AppContext, ParticipantContext } from "../../context/"
import { Name, Type, Gender, Notes } from "./Form"
import { i18n } from "../../locale"
import { HotelSection, PaymentSection, TournamentSection } from "./Sections"
import shouldShow from "../../utils/shouldShow"
import fromStore from "../../utils/fromStore"

function ParticipantFormik(props) {
  const { errors, touched, isSubmitting, isValid, values, setFieldValue } = props

  const { settings } = React.useContext(AppContext)
  const [step, setStep] = React.useState("initial")

  const autocompleteSubmit = (participantValues) => {
    const valuesToAutocomplete = ["name", "yob", "federation", "title", "type"]
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

  const [taxes, setTaxes] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const all_taxes = await fromStore("taxes")
      setTaxes(all_taxes)
    }
    fetchData()
  }, [])

  return (
    <ParticipantContext.Provider value={{ errors, touched, isSubmitting, values, setFieldValue }}>
      {step === "initial" && (
        <Form autoComplete="off">
          <Type />
          <div className="mb-4">
            {/* TODO: automcomplete only for players */}
            <Name onSubmit={autocompleteSubmit} />
          </div>

          {shouldShow("yob").basedOn(settings) && (
            <Input
              className="flex w-1/ mt-4 mb-4"
              name="yob"
              type="number"
              label={i18n("Year of birth")}
              helper={i18n("Optional")}
            />
          )}

          {shouldShow("gender").basedOn(settings) && <Gender />}
          {shouldShow("federation").basedOn(settings) && (
            <Input
              className="flex w-1/2 mb-4"
              name="federation"
              label={i18n("Federation")}
              helper={federationHelper()}
            />
          )}

          {shouldShow("title").basedOn(settings) && (
            <Input
              className="flex w-1/2 mb-4"
              name="title"
              label={i18n("Title")}
              helper={i18n("Optional")}
            />
          )}

          {shouldShow("club").basedOn(settings) && (
            <Input
              className="flex mb-4"
              name="club"
              label={i18n("Club")}
              helper={i18n("Optional")}
            />
          )}

          <Typography variant="h6" className="mt-8">
            {i18n("Choose tournaments")}
          </Typography>
          <TournamentSection />

          <Typography variant="h6" className="mt-8">
            {i18n("Choose accommodation")}
          </Typography>
          <HotelSection />

          {shouldShow("notes").basedOn(settings) && (
            <div>
              <Typography variant="h6" className="mt-8">
                {i18n("Details")}
              </Typography>
              <Notes />
            </div>
          )}

          <Button
            variant="contained"
            color="secondary"
            type="button"
            className="mt-8"
            disabled={taxes.length === 0}
            onClick={() => {
              setStep("confirm")
            }}
          >
            {i18n("Continue to taxes")}
          </Button>

          {taxes.length === 0 && (
            <Typography variant="body2" className="mt-4">
              <span>No taxes found. </span>
              <a href="/#/new-tax">Did you forget to add a tax?</a>
            </Typography>
          )}
        </Form>
      )}

      {step === "confirm" && (
        <Form autoComplete="off">
          <Typography variant="h6" className="mt-8">
            {i18n("Review taxes and payment")}
          </Typography>
          <PaymentSection />

          {shouldShow("notes").basedOn(settings) && (
            <div>
              <Typography variant="h6" className="mt-8">
                {i18n("Details")}
              </Typography>
              <Notes />
            </div>
          )}

          <Button
            variant="outlined"
            color="primary"
            className="mr-4 mt-4"
            disabled={isSubmitting}
            onClick={() => {
              setStep("initial")
            }}
          >
            {i18n("Modify entry")}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="mr-4 mt-4"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {i18n("Save")}
          </Button>
          {!isValid && (
            <div className="flex items-center text-red-600 mt-4">
              <Warning fontSize="large" />
              <div className="ml-1">
                <div>Validation error! Review the fields marked with the color red.</div>
                <div>These errors can also be found in the previous section.</div>
              </div>
            </div>
          )}
        </Form>
      )}
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
