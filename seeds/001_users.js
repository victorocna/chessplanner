require("dotenv").config()
const faunadb = require("faunadb")
const bcrypt = require("bcryptjs")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

exports.name = "users"
exports.run = async () => {
  return await client
    .query(
      q.Do(
        q.Create(q.Collection("users"), {
          data: {
            username: "user@example.com",
            password: bcrypt.hashSync("supersecret", 10),
            confirmed: false,
            createdAt: +Date.now(),
          },
        }),
        q.Create(q.Collection("users"), {
          data: {
            username: "demo@example.com",
            password: bcrypt.hashSync("supersecret", 10),
            demo: true,
            confirmed: true,
            createdAt: +Date.now(),
          },
        })
      )
    )
    .then(() => {
      console.log(`Seeding "${exports.name}" finished successfully`)
    })
    .catch((err) => {
      console.error(`Error while seeding "${exports.name}". Error: ${err.message}`)
    })
}
