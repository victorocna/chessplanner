const { q, client } = require("../connect")

module.exports = (req, res, next) => {
  const { hash } = req.body
  if (!hash) {
    return res.status(400).send("Hash does not exist")
  }

  return client
    .query(q.Count(q.Match(q.Index("all_hashes_by_hash"), hash)))
    .then((count) => {
      if (count !== 1) {
        return res.status(400).send("Hash does not exist")
      }
      next()
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
