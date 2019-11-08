const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

/**
 * Using the user object, checks if the user has a "demo" property
 */
export default async (user) => {
  const { ref } = user

  return client
    .query(q.Get(q.Ref(`collections/users/${ref}`)))
    .then((response) => {
      return response.data.demo || false
    })
    .catch(async (error) => {
      throw new Error(error)
    })
}
