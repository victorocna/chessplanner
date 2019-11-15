require("dotenv").config()
const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

exports.name = "users"
exports.up = async () => {
  return await client
    .query(
      q.CreateCollection({
        name: "users",
        history_days: null,
      })
    )
    .then(() => {
      return client.query(
        q.Do(
          q.CreateIndex({
            name: "all_users",
            source: q.Collection("users"),
          }),
          q.CreateIndex({
            name: "all_users_by_username",
            source: q.Collection("users"),
            terms: [{ field: ["data", "username"] }],
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
        q.Delete(q.Index("all_users")),
        q.Delete(q.Index("all_users_by_username")),
        q.Delete(q.Collection("users"))
      )
    )
    .then(() => {
      console.log(`Migration "${exports.name}" removed successfully`)
    })
    .catch((err) => {
      console.error(`Error while migrating "${exports.name}". Error: ${err.message}`)
    })
}
