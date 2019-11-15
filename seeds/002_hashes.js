require("dotenv").config()
const faunadb = require("faunadb")
const randomHash = require("../functions/utils/random-hash")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.name = "hashes"
exports.run = async () => {
  return await client
    .query(
      q.Do(
        q.Create(q.Collection("hashes"), {
          data: {
            hash: randomHash(),
            type: "confirm",
            createdAt: +Date.now(),
          },
        }),
        q.Create(q.Collection("hashes"), {
          data: {
            hash: randomHash(),
            type: "reset",
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
