module.exports = (error) => {
  if (error.hasOwnProperty("name") && error.hasOwnProperty("message")) {
    return `${error.name} ${error.message}`
  }

  return "unknown error"
}
