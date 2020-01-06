import React from "react"
import { Stepper, Step, StepLabel } from "@material-ui/core"
import { Link, Typography } from "@material-ui/core"

function getSteps() {
  return [
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
    if (count.tournaments) {
      setCompleted((completed) => ({ ...completed, 0: true }))
      handleNext()
    }
    if (count.taxes) {
      setCompleted((completed) => ({ ...completed, 1: true }))
      handleNext()
    }
    if (count.hotels) {
      setCompleted((completed) => ({ ...completed, 2: true }))
    }
  }, [count])

  return (
    <div className="mb-4">
      <Typography variant="h6" className="mb-1">
        Masterplanner initial setup
      </Typography>
      <Typography variant="body2" className="mb-1">
        Complete the following steps to be able to manage participants.
      </Typography>

      {Object.keys(completed).length === steps.length && (
        <Typography variant="body2" className="mb-1">
          Success! You have finished the initial setup.
          <Link href="/#/settings" className="ml-2">Hide initial setup</Link>
        </Typography>
      )}

      <Stepper className="stepper" activeStep={activeStep} nonLinear orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel completed={completed[index]}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default StepperWrapper
