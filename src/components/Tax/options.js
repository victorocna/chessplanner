import { i18n } from "../../locale"

const possibleKeys = [
  { key: "type", text: i18n("Type") },
  { key: "federation", text: i18n("Federation") },
  { key: "gender", text: i18n("Gender") },
  { key: "yob", text: i18n("Year of birth") },
]
const possibleOperands = ["<", ">", "<=", ">=", "!=", "=="]

export { possibleKeys, possibleOperands }
