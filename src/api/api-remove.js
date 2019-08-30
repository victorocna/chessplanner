import withToken from "./with-token"
import checkStatus from "./check-status"
import dispatch from "./dispatch"
import config from "./config"

export default async (instance, id, headers = withToken()) => {
  return await fetch(`/.netlify/functions/delete?instance=${instance}&id=${id}`, {
    headers: headers,
    method: "DELETE",
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch.deleteFromStore(config.getIndexFrom(instance), id)
      return json
    })
}
