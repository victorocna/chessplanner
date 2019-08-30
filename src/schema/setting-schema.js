import * as Yup from "yup"

const settingSchema = Yup.object().shape({
  currency: Yup.string().required("Currency setting is required"),
  language: Yup.string().required("Language setting is required"),
})

export default settingSchema
