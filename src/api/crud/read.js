import withToken from "../with-token"
import checkStatus from "../check-status"

export default async (instance, id, headers = withToken()) => {
  return await fetch(`/.netlify/functions/app/read/${instance}/${id}`, {
    headers: headers,
    method: "GET",
  })
    .then(checkStatus)
    .then((response) => response.json())
}
