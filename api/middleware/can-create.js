const { q, client } = require("../connect")
const jwt = require("jsonwebtoken")
const { demoLimits } = require("../utils")

module.exports = async (req, res, next) => {
  const { collection } = req.params
  if (!collection) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send("Unauthorized")
  }

  const { key } = jwt.decode(authorization.split(" ").reverse()[0])
  if (!key) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  return client
    .query(q.Count(q.Match(q.Index(`all_${collection}_by_key`), key)))
    .then((count) => {
      if (count < demoLimits[collection]) {
        next()
      }

      return res.status(400).send("You have reached the demo limits for this account")
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
