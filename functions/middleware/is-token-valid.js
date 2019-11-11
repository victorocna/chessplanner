require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (event, context, next) => {
  const token = event.headers.split(" ")[1] || ""

  return jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err) => {
    if (err) {
      throw new Error(err)
    }
    next()
  })
}
