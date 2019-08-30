import { getIn } from "formik"

const showError = (form, element, helper = "") => {
  if (getIn(form.errors, element) && getIn(form.touched, element)) {
    return getIn(form.errors, element)
  }
  return helper
}
const hasError = (form, element) => {
  return getIn(form.errors, element) && getIn(form.touched, element)
}
const showValid = (form, element) => {
  return getIn(form.touched, element) && !getIn(form.errors, element) && "✔️"
}

export { showError, hasError, showValid }
