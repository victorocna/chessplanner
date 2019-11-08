require("dotenv").config()
const faunadb = require("faunadb")
const bcrypt = require("bcryptjs")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

module.exports = async (event) => {
  const { password, hash } = JSON.parse(event.body)
  if (!password || !hash) {
    return {
      statusCode: 400,
      body: "Bad Request! Missing required fields",
    }
  }

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_hashes_by_hash"), hash)),
        q.Lambda("hash", q.Get(q.Var("hash")))
      )
    )
    .then(async (response) => {
      if (!response.data || !response.data[0] || !response.data[0].data) {
        return {
          statusCode: 404,
          body: "Not Found",
        }
      }
      if (!response.data[0].data.ref) {
        return {
          statusCode: 404,
          body: "Not Found",
        }
      }

      const hashId = response["data"][0]["ref"]
      const userId = response["data"][0]["data"]["ref"]

      // delete hash from db && update password
      client.query(q.Delete(hashId))
      client.query(
        q.Update(userId, {
          data: {
            password: await bcrypt.hash(password, 10),
            updatedAt: +Date.now(),
          },
        })
      )

      return {
        statusCode: 200,
        body: "Ok",
      }
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: "Error! " + error.name || "",
      }
    })
}
