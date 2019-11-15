require("dotenv").config()
const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

exports.name = "hashes"
exports.up = async () => {
  return await client
    .query(
      q.CreateCollection({
        name: "hashes",
        history_days: null,
      })
    )
    .then(() => {
      return client.query(
        q.Do(
          q.CreateIndex({
            name: "all_hashes",
            source: q.Collection("hashes"),
          }),
          q.CreateIndex({
            name: "all_hashes_by_hash",
            source: q.Collection("hashes"),
            terms: [{ field: ["data", "hash"] }],
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
        q.Delete(q.Index("all_hashes")),
        q.Delete(q.Index("all_hashes_by_hash")),
        q.Delete(q.Collection("hashes"))
      )
    )
    .then(() => {
      console.log(`Migration "${exports.name}" removed successfully`)
    })
    .catch((err) => {
      console.error(`Error while migrating "${exports.name}". Error: ${err.message}`)
    })
}
