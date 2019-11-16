import withToken from "../with-token"
import checkStatus from "../check-status"
import dispatch from "../dispatch"
import config from "../config"

export default async (instance, data, headers = withToken()) => {
  return await fetch(`/.netlify/functions/app/create/${instance}`, {
    headers: headers,
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch.createInStore(config.getIndexFrom(instance), json)
      return json
    })
}
