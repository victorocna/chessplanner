require("dotenv").config()
const faunadb = require("faunadb")
const bcrypt = require("bcryptjs")
const { sendEmail, randomHash, userAlreadyExists } = require("../utils")
const { signup } = require("../views/email-templates")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

module.exports = async (event) => {
  const { username, password, origin } = JSON.parse(event.body)
  if (!username || !password) {
    return {
      statusCode: 400,
      body: "Bad Request! Missing required fields",
    }
  }

  if (!validUsername(username)) {
    return {
      statusCode: 400,
      body: "Error! Invalid email address",
    }
  }

  if (!validPassword(password)) {
    return {
      statusCode: 400,
      body: "Error! Password must be at least 8 characters",
    }
  }

  if (await userAlreadyExists(username)) {
    return {
      statusCode: 400,
      body: "Error! This email address is already registered",
    }
  }

  // create a random hash
  const hash = randomHash()

  // create an inactive user
  return client
    .query(
      q.Create(q.Collection("users"), {
        data: {
          username,
          password: await bcrypt.hash(password, 10),
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

const validUsername = (username) => {
  return new RegExp(/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/).test(username)
}

const validPassword = (password) => {
  return password.length >= 8
}
