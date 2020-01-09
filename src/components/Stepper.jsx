import React from "react"
import { Stepper, Step, StepLabel } from "@material-ui/core"
import { Link, Typography } from "@material-ui/core"
import { ThumbUp } from '@material-ui/icons';
import { AppContext } from "../context/"

function getSteps() {
  return [
    "Review and save your settings",
    "Create your first tournament",
    "Create your first tax rule",
    "Optionally, create accommodation rules",
  ]
}

const getItem = (item) => {
  return JSON.parse(localStorage.getItem(item) || []).length
}

const StepperWrapper = () => {
  const [count] = React.useState({
    hotels: getItem("hotels"),
    taxes: getItem("taxes"),
    tournaments: getItem("tournaments"),
  })

  const [completed, setCompleted] = React.useState({})
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  React.useEffect(() => {
    if (count.settings) {
      setCompleted((completed) => ({ ...completed, 0: true }))
      handleNext()
    }
    if (count.tournaments) {
      setCompleted((completed) => ({ ...completed, 1: true }))
      handleNext()
    }
    if (count.taxes) {
      setCompleted((completed) => ({ ...completed, 2: true }))
      handleNext()
    }

    // mark as completed the optional rule
    setCompleted((completed) => ({ ...completed, 3: true }))
  }, [count])

  const { settings } = React.useContext(AppContext)
  if (settings && settings.hide && settings.hide.initialsetup) {
    if (Object.keys(completed).length === steps.length) {
      return null
    }
  }

  return (
    <div className="mb-4">
      <Typography variant="h6" className="mb-1">
        Masterplanner initial setup
      </Typography>
      <Typography variant="body2" className="mb-1">
        Complete the following steps to be able to manage participants.
      </Typography>

      {Object.keys(completed).length === steps.length && (
        <div className="flex items-center text-green-600 mb-1">
          <ThumbUp />
          <div className="ml-1">
            Success! You have finished the initial setup.
            <Link href="/#/settings" className="ml-1">
              Hide initial setup
            </Link>
          </div>
        </div>
      )}

      <Stepper className="stepper" activeStep={activeStep} nonLinear orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel completed={!!completed[index]}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default StepperWrapper
