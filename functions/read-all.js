import faunadb from "faunadb"
import putLogEvents from "./aws/putLogEvents"
import validate from "./utils/validate"
import { getUser, prettyErrors } from "./utils/helpers"
import { errorReadAll } from "./utils/messages"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

// export our lambda function as named "handler" export
exports.handler = async (event) => {
  try {
    return await lambda(event)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err) // output to netlify function log
    return { statusCode: 500, body: JSON.stringify(err) }
  }
}

const lambda = async (event) => {
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
