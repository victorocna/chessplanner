import ro from "./languages/ro.json"
import en from "./languages/en.json"
import { language } from "../defaults"

const getLocale = () => {
  const currentLanguage = language || "en"
  switch (currentLanguage) {
    case "ro":
      return { ...ro }
    default:
      return { ...en }
  }
}

const i18n = (key) => {
  const locale = getLocale()
  if (locale.hasOwnProperty(key)) {
    return locale[key]
  }

  return ""
}

export { i18n }
