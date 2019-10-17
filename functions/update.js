import faunadb from "faunadb"
import putLogEvents from "./aws/putLogEvents"
import getId from "./utils/getId"
import validate from "./utils/validate"
import { getUser, prettyErrors } from "./utils/helpers"
import { successUpdate, errorUpdate } from "./utils/messages"

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
    httpMethod: "POST",
    required: ["instance", "id"],
  })
  if (validation.statusCode !== 200) {
    return validation
  }

  const user = getUser(event.headers.authorization)
  const id = getId(event.queryStringParameters.id)
  const instance = event.queryStringParameters.instance

  // construct the fauna query
  return client
    .query(
      q.Update(q.Ref(`collections/${instance}/${id}`), {
        data: JSON.parse(event.body),
      })
    )
    .then((response) => {
      putLogEvents(successUpdate({ instance, id, user, response }))

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      putLogEvents(errorUpdate({ instance, id, user, error }))

      return {
        statusCode: 400,
        body: prettyErrors(error),
      }
    })
}
