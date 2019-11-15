import checkStatus from "../check-status"

export default async (data) => {
  return await fetch(`/.netlify/functions/go?action=login`, {
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(checkStatus)
    .then((response) => response.text())
}