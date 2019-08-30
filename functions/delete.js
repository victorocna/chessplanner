import faunadb from "faunadb"
import putLogEvents from "./aws/putLogEvents"
import getId from "./utils/getId"
import validate from "./utils/validate"
import { getUser, prettyErrors } from "./utils/helpers"

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
    httpMethod: "DELETE",
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
    .query(q.Delete(q.Ref(`collections/${instance}/${id}`)))
    .then(async (response) => {
      const backup = Buffer.from(JSON.stringify(response)).toString("base64")
      const message = `
        Success! Deleted ${instance} instance with id ${id}.
        Backup: ${backup}; User: ${user.email}`

      await putLogEvents(message)
      return { statusCode: 200, body: JSON.stringify(response) }
    })
    .catch(async (error) => {
      const errMessage = prettyErrors(error)
      const errDetails = `
        Error! Cannot delete ${instance} with id ${id}.
        ErrMessage: ${errMessage}; User: ${user.email}`

      await putLogEvents(errDetails)
      return { statusCode: 400, body: errMessage }
    })
}