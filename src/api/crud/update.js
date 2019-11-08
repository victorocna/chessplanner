import withToken from "../with-token"
import checkStatus from "../check-status"
import dispatch from "../dispatch"
import config from "../config"

export default async (instance, id, data, headers = withToken()) => {
  return await fetch(`/.netlify/functions/go?action=update&instance=${instance}&id=${id}`, {
    headers: headers,
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch.updateInStore(config.getIndexFrom(instance), json, id)
      return json
    })
}
