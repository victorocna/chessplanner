import checkStatus from "../check-status"

export default async (data) => {
  return await fetch(`/.netlify/functions/app/confirm`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(checkStatus)
    .then((response) => response.text())
}
