const { q, client } = require("../connect")
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send("Unauthorized")
  }

  const { ref } = jwt.decode(authorization.split(" ").reverse()[0])
  return client
    .query(q.Get(q.Ref(`collections/users/${ref}`)))
    .then((response) => {
      if (response.data.demo) {
        return res.status(200).send("Demo account")
      }
      next()
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
