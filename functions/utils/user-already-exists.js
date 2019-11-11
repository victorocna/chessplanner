const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

/**
 * Using the user object, checks if the user has a "demo" property
 */
module.exports = async (username) => {
  return client
    .query(q.Count(q.Match(q.Index("all_users_by_username"), username)))
    .then((count) => {
      return count
    })
}
