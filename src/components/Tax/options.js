import { i18n } from "../../locale"

const possibleKeys = [
  { key: "type", text: i18n("Type of participant"), required: true },
  { key: "title", text: i18n("Title") },
  { key: "federation", text: i18n("Federation") },
  { key: "gender", text: i18n("Gender") },
  { key: "yob", text: i18n("Year of birth") },
]
// TODO: convert to key value object
const possibleOperands = ["<", ">", "<=", ">=", "!=", "=="]

export { possibleKeys, possibleOperands }
