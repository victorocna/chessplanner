require("dotenv").config()
const faunadb = require("faunadb")
const { sendEmail, randomHash } = require("../utils")
const { forgot } = require("../views/email-templates")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

module.exports = async (event) => {
  const { username, origin } = JSON.parse(event.body)
  if (!username) {
    return {
      statusCode: 400,
      body: "Bad Request! Missing required fields",
    }
  }

  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_users_by_username"), username)),
        q.Lambda("username", q.Get(q.Var("username")))
      )
    )
    .then(async (response) => {
      if (response.data && response.data.length !== 1) {
        // return an unclear error message when the username does not exist
        return {
          statusCode: 400,
          body: "Bad Request! Missing required fields",
        }
      }

      // when the user exists, create a reset token
      const hash = randomHash()
      await client.query(
        q.Create(q.Collection("hashes"), {
          data: {
            hash,
            type: "forgot",
            ref: response.data[0].ref,
          },
        })
      )

      // email password reset link to the user
      try {
        await sendEmail({
          from: "support@chesscoders.com",
          to: username,
          subject: "Reset your password",
          html: forgot(origin, hash),
        })
      } catch (err) {
        // console.log(err)
      }

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
