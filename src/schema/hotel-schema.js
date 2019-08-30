import * as Yup from "yup"

const hotelSchema = Yup.object().shape({
  name: Yup.string().required("Hotel name is required"),
  roomTypes: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      capacity: Yup.number()
        .typeError("Must be a number")
        .min(1)
        .required("Required"),
      price: Yup.number()
        .typeError("Must be a number")
        .min(1)
        .required("Required"),
      currency: Yup.string().required("Required"),
    })
  ),
})

export default hotelSchema
