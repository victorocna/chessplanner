import checkStatus from "../check-status"

export default async (action, data) => {
  return await fetch(`/.netlify/functions/app/${action}`, {
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(checkStatus)
    .then((response) => response.text())
}
