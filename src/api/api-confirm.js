import withToken from "./with-token"
import checkStatus from "./check-status"

export default async (data, headers = withToken()) => {
  return await fetch(`/.netlify/functions/confirm`, {
    headers: headers,
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(checkStatus)
    .then((response) => response.text())
}
