const { q, client } = require("../connect")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
  const { collection } = req.params
  if (!collection) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  // all available indexes mapped to a "collection" key
  const indexes = {
    hotels: "all_hotels_by_key",
    participants: "all_participants_by_key",
    settings: "all_settings_by_key",
    taxes: "all_taxes_by_key",
    tournaments: "all_tournaments_by_key",
  }
  const index = indexes[collection]
  if (!index) {
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

  // construct the fauna query
  return client
    .query(
      q.Paginate(q.Match(q.Ref(`indexes/${index}`), key), {
        size: +process.env.REACT_APP_FAUNADB_QUERY_LIMIT,
      })
    )
    .then((response) => {
      const refs = response.data

      // create new query out of refs. http://bit.ly/2LG3MLg
      const getEverything = refs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getEverything).then((result) => {
        return res.status(200).json(result)
      })
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
