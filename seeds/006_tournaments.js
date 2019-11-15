require("dotenv").config()
const faunadb = require("faunadb")
const faker = require("faker")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.name = "tournaments"
exports.run = async () => {
  // set a randomness seed for consistent results for "key"
  // @see https://www.npmjs.com/package/faker#setting-a-randomness-seed
  faker.seed(123)

  return await client
    .query(
      q.Do(
        q.Create(q.Collection("tournaments"), {
          data: {
            key: faker.random.uuid(),
            name: "Chess Coders Championship",
            description: faker.lorem.words(),
            type: "main",
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
