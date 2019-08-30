import React from "react"

const useValidation = () => {
  const [validationErrors, setValidationErrors] = React.useState({})

  const validateEmpty = (event) => {
    event.persist()

    const isEmpty = !event.target.value
    setValidationErrors((prevState) => ({
      ...prevState,
      [event.target.name]: isEmpty,
    }))
  }

  const validatePriority = (min, max) => (event) => {
    event.persist()

    const outOfBounds = +event.target.value < min || +event.target.value > max
    setValidationErrors((prevState) => ({
      ...prevState,
      [event.target.name]: outOfBounds,
    }))
  }

  return {
    validationErrors,
    setValidationErrors,
    validateEmpty,
    validatePriority,
  }
}

export default useValidation
