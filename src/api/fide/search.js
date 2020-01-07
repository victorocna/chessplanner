import checkStatus from "../check-status"
import baseUrl from "../base-url"

export default async (name) => {
  return await fetch(`${baseUrl}/.netlify/functions/app/fide/search?name=${name}`)
    .then(checkStatus)
    .then((response) => response.json())
}
