require("dotenv").config()
const faunadb = require("faunadb")
const faker = require("faker")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

exports.name = "settings"
exports.run = async () => {
  // select random columns
  const columns = all_columns.filter(() => faker.random.boolean())

  // set a randomness seed for consistent results for "key"
  // @see https://www.npmjs.com/package/faker#setting-a-randomness-seed
  faker.seed(123)

  return await client
    .query(
      q.Do(
        q.Create(q.Collection("settings"), {
          data: {
            key: faker.random.uuid(),
            arrival: +faker.date.recent(),
            departure: +faker.date.future(),
            columns,
            currency: faker.random.arrayElement(["RON", "USD", "EUR"]),
            language: faker.random.arrayElement(["ro", "en"]),
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

const all_columns = [
  "club",
  "federation",
  "yob",
  "payment.discount",
  "payment.prepayment",
  "payment.method",
]
