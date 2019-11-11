export default async (response) => {
  if (!response.ok) {
    // res.status >= 200 && res.status < 300
    return Promise.reject(await response.text())
  }

  return response
}
