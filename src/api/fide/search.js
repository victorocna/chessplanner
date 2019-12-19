import checkStatus from "../check-status"

export default async (name) => {
  const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:9000"

  return await fetch(`${baseUrl}/.netlify/functions/app/fide/search?name=${name}`)
    .then(checkStatus)
    .then((response) => response.json())
}
