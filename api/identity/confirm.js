const { q, client } = require("../connect")

module.exports = async (req, res) => {
  const { hash } = req.body
  if (!hash) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_hashes_by_hash"), hash)),
        q.Lambda("hash", q.Get(q.Var("hash")))
      )
    )
    .then((response) => {
      if (!response.data || !response.data[0] || !response.data[0].data) {
        return res.status(404).send("Not Found")
      }
      if (!response.data[0].data.ref) {
        return res.status(404).send("Not Found")
      }

      const hashId = response["data"][0]["ref"]
      const userId = response["data"][0]["data"]["ref"]

      // delete hash from db && activate user
      client.query(q.Delete(hashId))
      client.query(
        q.Update(userId, {
          data: {
            confirmed: true,
            confirmedAt: +Date.now(),
          },
        })
      )

      return res.status(200).send("Ok")
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
