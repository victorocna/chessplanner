const Yup = require("yup")

const schema = Yup.object().shape({
  name: Yup.string().required("Your name is required"),
  type: Yup.string()
    .oneOf(["player", "companion", "coach", "other"])
    .required("Your role in the tournament is required"),
  email: Yup.string()
    .email()
    .required("Your email is required"),
})

module.exports = (participant) => {
  return schema.validateSync(participant)
}
