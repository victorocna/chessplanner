import checkStatus from "../check-status"
import baseUrl from "../base-url"

export default async (index) => {
  return await fetch(`${baseUrl}/.netlify/functions/app/read-all/${index}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(checkStatus)
    .then((response) => response.json())
    .catch((err) => {
      if (err.status === 401) {
        localStorage.removeItem("token")
      }
    })
}
