import store from "store"

export default () => {
  if (typeof store.get("token") === "undefined") {
    return {}
  }

  return {
    Authorization: `Bearer ${store.get("token")}`,
  }
}
