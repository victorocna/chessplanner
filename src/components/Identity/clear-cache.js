import store from "store"

// prettier-ignore
const instances = [
  "all_hotels_by_key",
  "all_tournaments_by_key",
  "all_participants_by_key",
  "all_taxes_by_key",
  "all_settings_by_key",
]

const clearCache = async () => {
  for (let i = 0; i < instances.length; i++) {
    await store.remove(instances[i])
  }
  return true
}

export default clearCache
