const { q, client } = require("../connect")
const bcrypt = require("bcryptjs")
const { sendEmail, randomHash } = require("../utils")
const { signup } = require("../views/email-templates")

module.exports = async (req, res) => {
  const { username, password, origin } = req.body
  if (!username || !password) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  if (!validUsername(username)) {
    return res.status(400).send("Error! Invalid email address")
  }

  if (!validPassword(password)) {
    return res.status(400).send("Error! Password must be at least 8 characters")
  }

  // create a random hash
  const hash = randomHash()

  // create an inactive user with a demo account
  return client
    .query(
      q.Create(q.Collection("users"), {
        data: {
          username,
          password: bcrypt.hashSync(password, 10),
          key: hash,
          createdAt: +Date.now(),
          confirmed: false,
          demo: true,
        },
      })
    )
    .then(async (response) => {
      // email confirmation to the new user
      try {
        await sendEmail({
          from: "support@chesscoders.com",
          to: username,
          subject: "Confirm your email address",
          html: signup(origin, hash),
        })
      } catch (err) {
        // console.log(err)
      }

      // save the hash in the db with a reference to this user
      return client.query(
        q.Create(q.Collection("hashes"), {
          data: {
            hash,
            type: "confirm",
            ref: response.ref,
          },
        })
      )
    })
    .then(() => {
      return res.status(200).send("Ok")
    })
    .catch((error) => {
      return res.status(500).send("Error! " + error.name || "")
    })
}

const validUsername = (username) => {
  return new RegExp(/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/).test(username)
}

const validPassword = (password) => {
  return password.length >= 8
}
