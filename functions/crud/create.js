const faunadb = require("faunadb")
const putLogEvents = require("../aws/putLogEvents")
const { isDemo, canCreate, getUser, prettyErrors, validate } = require("../utils")
const { successCreate, errorCreate } = require("../utils/messages")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

module.exports = async (event) => {
  const validation = await validate(event, {
    httpMethod: "POST",
    required: ["instance"],
  })
  if (validation.statusCode !== 200) {
    return validation
  }

  const user = getUser(event.headers.authorization)
  const instance = event.queryStringParameters.instance

  // append key to instance data
  const instanceData = JSON.parse(event.body)
  instanceData.key = user.key

  // Middleware: check limits for demo account
  if ((await isDemo(user)) && !(await canCreate(user, instance))) {
    putLogEvents(`User: ${user.username} reached demo limit for ${instance}.`)

    return {
      statusCode: 403,
      body: `Error! Exceeded demo limit for ${instance}`,
    }
  }

  // construct the fauna query
  return client
    .query(
      q.Create(q.Ref(`collections/${instance}`), {
        data: instanceData,
      })
    )
    .then((response) => {
      putLogEvents(successCreate({ instance, user, response }))

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      putLogEvents(errorCreate({ instance, user, error }))

      return {
        statusCode: 400,
        body: prettyErrors(error),
      }
    })
}
