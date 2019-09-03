import faunadb from "faunadb"
import putLogEvents from "./aws/putLogEvents"
import validate from "./utils/validate"
import { getUser, prettyErrors } from "./utils/helpers"

import isDemo from './utils/isDemo';
import canCreate from './utils/canCreate';

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
  if (isDemo() && await !canCreate(event, instance)) {
    let message = `User: ${user.email} reached demo limit for ${instance}.`
    await putLogEvents(message)

    return {
      statusCode: 403,
      body: 'Exceeded demo limit.'
    }
  }

  // construct the fauna query
  return client
    .query(
      q.Create(q.Ref(`collections/${instance}`), {
        data: instanceData,
      })
    )
    .then(async (response) => {
      const backup = Buffer.from(JSON.stringify(response)).toString("base64")
      const message = `
        Success! Created a new ${instance} instance.
        Backup: ${backup}; User: ${user.email}`

      await putLogEvents(message)
      return { statusCode: 200, body: JSON.stringify(response) }
    })
    .catch(async (error) => {
      const errMessage = prettyErrors(error)
      const errDetails = `
        Error! Cannot create a new ${instance} instance.
        ErrMessage: ${errMessage}; User: ${user.email}`

      await putLogEvents(errDetails)
      return { statusCode: 400, body: errMessage }
    })
}
