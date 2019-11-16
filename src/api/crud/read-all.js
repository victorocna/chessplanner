import withToken from "../with-token"
import checkStatus from "../check-status"

export default async (index, headers = withToken()) => {
  return await fetch(`/.netlify/functions/app/read-all/${index}`, {
    headers: headers,
    method: "GET",
  })
    .then(checkStatus)
    .then((response) => response.json())
    .catch((err) => {
      if (err.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/#/account/expired"
      }
    })
}
