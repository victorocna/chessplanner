import withToken from "./with-token"
import checkStatus from "./check-status"

export default async (instance, id, headers = withToken()) => {
  return await fetch(`/.netlify/functions/read?instance=${instance}&id=${id}`, {
    headers: headers,
    method: "GET",
  })
    .then(checkStatus)
    .then((response) => response.json())
}
