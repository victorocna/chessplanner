import checkStatus from "../check-status"
import dispatch from "../dispatch"
import config from "../config"
import baseUrl from "../base-url"

export default async (instance, id) => {
  return await fetch(`${baseUrl}/.netlify/functions/app/remove/${instance}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch.deleteFromStore(config.getIndexFrom(instance), id)
      return json
    })
    .catch((err) => {
      if (err.status === 401) {
        localStorage.removeItem("token")
      }
    })
}
