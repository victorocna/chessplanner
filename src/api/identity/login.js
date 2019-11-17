import checkStatus from "../check-status"

export default async (data) => {
  const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:9000"
  return await fetch(`${baseUrl}/.netlify/functions/app/login`, {
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
