const { q, client } = require("../connect")
const { sendEmail, randomHash } = require("../utils")
const { forgot } = require("../views/email-templates")

module.exports = async (req, res) => {
  const { username, origin } = req.body
  if (!username) {
    return res.status(400).send("Bad Request! Missing required fields")
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
        return res.status(400).send("Error! Cannot generate a reset password token")
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

      return res.status(200).send("Ok")
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}
