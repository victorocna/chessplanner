require("dotenv").config()
const faunadb = require("faunadb")
const faker = require("faker")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.name = "hotels"
exports.run = async () => {
  // set a randomness seed for consistent results for "key"
  // @see https://www.npmjs.com/package/faker#setting-a-randomness-seed
  faker.seed(123)

  return await client
    .query(
      q.Do(
        q.Create(q.Collection("hotels"), {
          data: {
            key: faker.random.uuid(),
            name: faker.company.companyName(),
            description: faker.company.catchPhrase(),
            roomTypes: [
              {
                name: faker.lorem.word(),
                capacity: faker.random.arrayElement([1, 2, 3, 5]),
                price: faker.random.arrayElement([100, 150, 200, 260]),
                currency: faker.random.arrayElement(["RON", "USD", "EUR"]),
              },
            ],
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
