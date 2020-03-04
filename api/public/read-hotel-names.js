const { q, client } = require("../connect")

module.exports = async (req, res) => {
  const { key } = req.params
  if (!key) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  // construct the fauna query
  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_hotels_by_key"), key)),
        q.Lambda("X", q.Select(["data", "name"], q.Get(q.Var("X"))))
      )
    )
    .then(({ data }) => {
      return res.status(200).json(data)
    })
    .catch(({ name }) => {
      return res.status(500).send(`Error! ${name}`)
    })
}
