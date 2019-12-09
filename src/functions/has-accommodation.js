import { i18n } from "../locale"

export default (name) => {
  return name && name !== i18n("No accommodation")
}
