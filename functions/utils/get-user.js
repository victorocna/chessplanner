const jwt = require("jsonwebtoken")

module.exports = (authHeaders) => {
  const user = { key: null, email: "anonymous" }

  const encodedToken = authHeaders.split(" ")
  if (typeof encodedToken[1] !== "undefined") {
    return jwt.decode(encodedToken[1])
  }

  return user
}
