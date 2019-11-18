import store from "store"

const defaultFor = (what, settings = "settings") => {
  const all_settings = store.get(settings)
  if (all_settings && all_settings[0] && all_settings[0]["data"]) {
    if (all_settings[0]["data"][what]) {
      return all_settings[0]["data"][what]
    }
  }
  return ""
}

const arrival = defaultFor("arrival")
const departure = defaultFor("departure")
const language = defaultFor("language")
const currency = defaultFor("currency")

export { arrival, departure, language, currency }
