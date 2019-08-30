const fakeApiCall = (values, id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(values, id)
    }, 2000)
  })
}

export { fakeApiCall }
