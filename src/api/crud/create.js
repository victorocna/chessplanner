import checkStatus from "../check-status"
import dispatch from "../dispatch"
import config from "../config"
import baseUrl from "../base-url"

export default async (instance, data) => {
  return await fetch(`${baseUrl}/.netlify/functions/app/create/${instance}`, {
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
      dispatch.createInStore(config.getIndexFrom(instance), json)
      return json
    })
    .catch((err) => {
      // remove token if http status 401
      if (err.status === 401) {
        localStorage.removeItem("token")
      }
      // rethrow the error so that it can be catched later
      throw err
    })
}
