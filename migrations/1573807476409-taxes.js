require("dotenv").config()
const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

exports.name = "taxes"
exports.up = async () => {
  return await client
    .query(
      q.CreateCollection({
        name: "taxes",
        history_days: null,
      })
    )
    .then(() => {
      return client.query(
        q.Do(
          q.CreateIndex({
            name: "all_taxes",
            source: q.Collection("taxes"),
          }),
          q.CreateIndex({
            name: "all_taxes_by_key",
            source: q.Collection("taxes"),
            terms: [{ field: ["data", "key"] }],
          })
        )
      )
    })
    .then(() => {
      console.log(`Migration "${exports.name}" finished successfully`)
    })
    .catch((err) => {
      console.error(`Error while migrating "${exports.name}". Error: ${err.message}`)
    })
}

exports.down = async () => {
  return await client
    .query(
      q.Do(
        q.Delete(q.Index("all_taxes")),
        q.Delete(q.Index("all_taxes_by_key")),
        q.Delete(q.Collection("taxes"))
      )
    )
    .then(() => {
      console.log(`Migration "${exports.name}" removed successfully`)
    })
    .catch((err) => {
      console.error(`Error while migrating "${exports.name}". Error: ${err.message}`)
    })
}
