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

  const { key, ref } = jwt.decode(authorization.split(" ").reverse()[0])
  if (!key || !ref) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  const demoAccount = await client.query(q.Get(q.Ref(`collections/users/${ref}`)))
  .then((response) => {
    return response.data.demo
  })

  if (!demoAccount) {
    return next() // non-demo account do not have restrictions
  }

  return client
    .query(q.Count(q.Match(q.Index(`all_${collection}_by_key`), key)))
    .then((count) => {
      if (demoAccount && count >= demoLimits[collection]) {
        return res.status(400).send("You have reached the demo limits for this account")
      }

      next()
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
