import store from "store"
import api from "../api"

/**
 * Given a key, it returns data from local storage
 * When nothing is found, it makes a call to the API and sets data in local storage.
 * Finally, it return the data
 */
const fromStore = async (storeKey, dbKey = storeKey) => {
  const items = store.get(storeKey)
  if (items) {
    return items
  }

  return await api
    .readAll(dbKey)
    .then((items) => {
      store.set(storeKey, items)
      return items || []
    })
    .catch(() => {
      return []
    })
}

export default fromStore
