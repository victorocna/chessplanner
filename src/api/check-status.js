export default (response) => {
  if (!response.ok) {
    // res.status >= 200 && res.status < 300
    throw Error(response.statusText)
  }

  return response
}
