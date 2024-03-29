export default async (response) => {
  console.log("nebunule")
  if (!response.ok) {
    // res.status >= 200 && res.status < 300
    return Promise.reject({
      status: response.status,
      message: await response.text(),
    })
  }

  return response
}
