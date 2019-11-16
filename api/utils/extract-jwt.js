const jwt = require("jsonwebtoken")

module.exports = (headers) => {
  const { authorization } = headers
  if (!authorization) {
    return {
      username: "anonymous",
      key: "undefined",
    }
  }
  const token = authorization.split(" ").reverse()[0]
  const { username, key } = jwt.decode(token)

  return { username, key }
}
