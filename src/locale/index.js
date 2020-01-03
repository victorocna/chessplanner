import ro from "./languages/ro.json"
import { language } from "../defaults"

const getLocale = () => {
  const currentLanguage = language || "en"
  switch (currentLanguage) {
    case "ro":
      return { ...ro }
    default:
      return {}
  }
}

const i18n = (stringToTranslate) => {
  const locale = getLocale()
  // eslint-disable-next-line
  if (locale.hasOwnProperty(stringToTranslate)) {
    return locale[stringToTranslate]
  }

  // material-table localization must return an object
  if (stringToTranslate === "_table") {
    return {}
  }

  return stringToTranslate
}

export { i18n }
