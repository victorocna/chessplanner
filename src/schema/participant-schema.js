import * as Yup from "yup"

/**
 * Allow empty string to number validation
 * @see https://github.com/jquense/yup/issues/298
 */
function transform(value, initial) {
  if (initial === "" && isNaN(value)) {
    return null
  }
  return value
}

const participantSchema = Yup.object().shape({
  name: Yup.string().required("Participant name is required"),
  type: Yup.string().required("Participant type is required"),
  yob: Yup.number()
    .typeError("Must be a number")
    .nullable(),
  federation: Yup.string()
    .length(3, "Exactly 3 letters")
    .matches(/[a-zA-Z]{3}/, "Exactly 3 letters")
    .nullable(),
  hotel: Yup.object().shape({
    nights: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .nullable()
      .transform((value, original) => transform(value, original)),
  }),
  payment: Yup.object().shape({
    computed: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .nullable()
      .transform((value, original) => transform(value, original)),
    toPay: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .nullable()
      .transform((value, original) => transform(value, original)),
    discount: Yup.number()
      .required(),
      // .nullable()
      // .transform((value, original) => transform(value, original)),
    prepayment: Yup.number()
      .nullable()
      .transform((value, original) => transform(value, original)),
    payed: Yup.number()
      .nullable()
      .transform((value, original) => transform(value, original)),
  }),
})

export default participantSchema
