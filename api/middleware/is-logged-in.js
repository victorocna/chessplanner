require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send("Unauthorized")
  }

  const token = authorization.split(" ").reverse()[0]
  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).send(`Unauthorized ${err.name}`)
    }
    next()
  })
}
