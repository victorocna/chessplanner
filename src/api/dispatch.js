import store from "store"

const createInStore = (instance, json) => {
  const items = store.get(instance)
  items.push(json)
  store.set(instance, items)
}

const updateInStore = (instance, json, id) => {
  const items = store.get(instance)
  for (let i = 0; i < items.length; i++) {
    if (items[i]["ref"]["@ref"]["id"] === id) {
      items[i] = json
    }
  }
  store.set(instance, items)
}

const deleteFromStore = (instance, id) => {
  const items = store.get(instance)
  store.set(instance, items.filter((item) => item["ref"]["@ref"]["id"] !== id))
}

export default {
  createInStore,
  updateInStore,
  deleteFromStore,
}
