require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (headers) => {
  const token = headers.split(" ")[1] || ""

  return jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err) => {
    if (err) {
      return false
    }
    return true
  })
}
