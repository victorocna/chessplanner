require("dotenv").config()
const faunadb = require("faunadb")
const faker = require("faker")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.name = "taxes"
exports.run = async () => {
  // set a randomness seed for consistent results for "key"
  // @see https://www.npmjs.com/package/faker#setting-a-randomness-seed
  faker.seed(123)

  return await client
    .query(
      q.Do(
        q.Create(q.Collection("taxes"), {
          data: {
            key: faker.random.uuid(),
            name: "General Tax",
            value: faker.random.arrayElement([10, 20, 30, 40]),
            currency: faker.random.arrayElement(["RON", "USD", "EUR"]),
            tournament: "Chess Coders Championship",
            priority: faker.random.arrayElement([10, 20, 30, 40]),
            rules: [],
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
