import store from "store"

// prettier-ignore
const instances = [
  "hotels",
  "tournaments",
  "participants",
  "taxes",
  "settings",
]

const clearCache = async () => {
  for (let i = 0; i < instances.length; i++) {
    await store.remove(instances[i])
  }
  return true
}

export default clearCache
