const httpMethod = (event, next) => {
  // check if event.httpMethod is POST
  next()
}

module.exports = httpMethod
