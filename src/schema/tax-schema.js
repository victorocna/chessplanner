import * as Yup from "yup"

const taxSchema = Yup.object().shape({
  name: Yup.string().required("Tax name is required"),
  value: Yup.number()
    .min(0, "Must not be negative")
    .typeError("Must be a number")
    .required("Tax value is required"),
  tournament: Yup.string().required("Select a tournament for which the tax will be applied"),
  priority: Yup.number()
    .min(1)
    .max(50)
    .typeError("Must be a number")
    .required("Required"),
  rules: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      key: Yup.string().required("Required"),
      eq: Yup.string().required("Required"),
      val: Yup.string().required("Required"),
    })
  ),
})

export default taxSchema
