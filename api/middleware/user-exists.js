const { q, client } = require("../connect")

module.exports = (req, res, next) => {
  const { username } = req.body

  return client
    .query(q.Count(q.Match(q.Index("all_users_by_username"), username)))
    .then((count) => {
      if (count > 0) {
        return res.status(200).send("User already exists")
      }
      next()
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
