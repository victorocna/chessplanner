const faunadb = require("faunadb")
const putLogEvents = require("../aws/putLogEvents")
const { getId, getUser, prettyErrors, validate } = require("../utils")
const { successUpdate, errorUpdate } = require("../utils/messages")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

module.exports = async (event) => {
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
