import store from "store"
import api from "../../api"

// prettier-ignore
const instances = [
  "hotels",
  "tournaments",
  "participants",
  "taxes",
  "settings",
]

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const cacheData = async () => {
  // wait 2 seconds to make sure everything is saved on local storage
  if (!store.get("token")) {
    await timeout(2000)
  }

  for (let i = 0; i < instances.length; i++) {
    if (!store.get(instances[i])) {
      api
        .readAll(instances[i])
        .then((data) => {
          store.set(instances[i], data)
        })
        .catch(() => {
          // TODO: unauthorized error
        })
    }
  }

  return true
}

export default cacheData
