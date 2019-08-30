import store from "store"

export default () => {
  if (typeof store.get("gotrue.user") === "undefined") {
    return {}
  }

  return {
    Authorization: `Bearer ${store.get("gotrue.user").token.access_token}`,
  }
}
