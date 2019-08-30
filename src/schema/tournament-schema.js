import * as Yup from "yup"

const tournamentSchema = Yup.object().shape({
  name: Yup.string().required("Tournament name is required"),
  type: Yup.mixed()
    .oneOf(["main", "side"])
    .required("Tournament type is required"),
})

export default tournamentSchema
