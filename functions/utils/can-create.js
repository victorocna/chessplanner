import limits from "./limits"
import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})
const size = +process.env.REACT_APP_FAUNADB_QUERY_LIMIT

/**
 * Using the user object, checks if the user limits have been reached
 */
export default async (user, instance) => {
  if (typeof limits[instance] === "undefined") {
    return true
  }

  const userLimit = limits[instance]
  return client
    .query(q.Paginate(q.Match(q.Ref(`indexes/all_${instance}_by_key`), user.key), { size }))
    .then((response) => {
      let length = response.data.length
      return length < userLimit
    })
    .catch(async (error) => {
      throw new Error(error)
    })
}
