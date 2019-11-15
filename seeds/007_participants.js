require("dotenv").config()
const faunadb = require("faunadb")
const faker = require("faker")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.name = "participants"
exports.run = async () => {
  // set a randomness seed for consistent results for "key"
  // @see https://www.npmjs.com/package/faker#setting-a-randomness-seed
  faker.seed(123)

  return await client
    .query(
      q.Do(
        q.Create(q.Collection("participants"), {
          data: {
            key: faker.random.uuid(),
            name: faker.name.firstName() + " " + faker.name.lastName(),
            club: faker.company.companyName(),
            type: "player",
            gender: "M",
            yob: "1990",
            federation: "ROU",
            traits: [],
            taxes: [
              {
                name: "General Tax",
                value: 70,
              },
            ],
            notes: "Auto generated fake data",
            tournaments: {
              main: "Chess Coders Championship",
              side: [],
            },
            hotel: {
              name: "",
              room: {
                type: "",
                number: "",
                price: "",
                capacity: "",
                contribution: "",
              },
              arrival: "",
              departure: "",
              nights: "",
            },
            payment: {
              computed: 70,
              discount: "",
              prepayment: 0,
              payed: 50,
              toPay: 70,
              method: "",
            },
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
