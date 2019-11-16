const { q, client } = require("../connect")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_users_by_username"), username)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then(async (response) => {
      if (!response.data || !response.data[0] || !response.data[0].data) {
        return res.status(400).send("Error! Invalid credentials. Please try again.")
      }

      const dbData = response.data[0].data
      // the JWT public data payload
      const payload = {
        username: dbData.username,
        key: dbData.key,
        ref: response.data[0]["ref"]["id"],
      }
      const check = await bcrypt.compare(password, dbData.password)
      if (dbData.password && dbData.confirmed && check) {
        const token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, {
          expiresIn: process.env.REACT_APP_JWT_SECRET_EXPIRE,
        })

        return res.status(200).send(token)
      }

      return res.status(400).send("Error! Invalid credentials. Please try again.")
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
