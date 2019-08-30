import withToken from "./with-token"
import checkStatus from "./check-status"

export default async (index, param, headers = withToken()) => {
  return await fetch(`/.netlify/functions/where?index=${index}&param=${param}`, {
    headers: headers,
    method: "GET",
  })
    .then(checkStatus)
    .then((response) => response.json())
}
