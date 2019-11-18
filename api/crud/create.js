const { q, client } = require("../connect")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
  const { collection } = req.params
  if (!collection) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send("Unauthorized")
  }

  const { key, username } = jwt.decode(authorization.split(" ").reverse()[0])
  if (!key || !username) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  // construct the fauna query
  return client
    .query(
      q.Create(q.Ref(`collections/${collection}`), {
        data: { ...req.body, createdBy: username, key },
      })
    )
    .then((response) => {
      return res.status(200).json(response)
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
