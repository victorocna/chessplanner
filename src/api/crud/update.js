import checkStatus from "../check-status"
import dispatch from "../dispatch"
import config from "../config"
import baseUrl from "../base-url"

export default async (instance, id, data) => {
  return await fetch(`${baseUrl}/.netlify/functions/app/update/${instance}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch.updateInStore(config.getIndexFrom(instance), json, id)
      return json
    })
    .catch((err) => {
      if (err.status === 401) {
        localStorage.removeItem("token")
      }
    })
}
