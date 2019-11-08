require("dotenv").config()
const faunadb = require("faunadb")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

module.exports = async (event) => {
  const { username, password } = JSON.parse(event.body)
  if (!username || !password) {
    return {
      statusCode: 400,
      body: "Bad Request! Missing required fields",
    }
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
        return {
          statusCode: 400,
          body: "Bad Request! Not Found",
        }
      }

      const dbData = response.data[0].data
      // the JWT public data payload
      const payload = {
        username: dbData.email,
        key: dbData.key,
        ref: response.data[0]["ref"]["id"],
      }
      const check = await bcrypt.compare(password, dbData.password)
      if (dbData.password && dbData.confirmed && check) {
        const token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, {
          expiresIn: process.env.REACT_APP_JWT_SECRET_EXPIRE,
        })

        return {
          statusCode: 200,
          body: token,
        }
      }

      return {
        statusCode: 400,
        body: "Bad Request! Not Found",
      }
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: "Error! " + error.name || "",
      }
    })
}
