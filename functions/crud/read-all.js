const faunadb = require("faunadb")
const putLogEvents = require("../aws/putLogEvents")
const { getUser, prettyErrors, validate } = require("../utils")
const { errorReadAll } = require("../utils/messages")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

module.exports = async (event) => {
  const validation = await validate(event, {
    httpMethod: "GET",
    required: ["index"],
  })
  if (validation.statusCode !== 200) {
    return validation
  }

  const user = getUser(event.headers.authorization)
  const index = event.queryStringParameters.index
  const size = +process.env.REACT_APP_FAUNADB_QUERY_LIMIT

  // construct the fauna query
  return client
    .query(q.Paginate(q.Match(q.Ref(`indexes/${index}`), user.key), { size }))
    .then((response) => {
      const refs = response.data

      // create new query out of refs. http://bit.ly/2LG3MLg
      const getEverything = refs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getEverything).then((result) => {
        return { statusCode: 200, body: JSON.stringify(result) }
      })
    })
    .catch((error) => {
      putLogEvents(errorReadAll({ index, user, error }))

      return {
        statusCode: 400,
        body: prettyErrors(error),
      }
    })
}
