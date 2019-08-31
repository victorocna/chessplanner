import faunadb from "faunadb"
import fetch from "node-fetch"
import { randomKey } from "./utils/helpers"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET,
})

exports.handler = (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  // send account information along with the POST
  const { email, password } = JSON.parse(event.body)

  // identity.token is a short lived admin token which
  // is provided to all Netlify Functions to interact
  // with the Identity API
  const { identity } = context.clientContext
  if (!identity) {
    return { statusCode: 401, body: "Unauthorized" }
  }
  const key = randomKey(12)

  return fetch(`${identity.url}/admin/users`, {
    method: "POST",
    headers: { Authorization: `Bearer ${identity.token}` },
    body: JSON.stringify({
      email,
      password,
      confirm: true,
      user_metadata: {
        roles: ["auth0", "extended"],
        key,
      },
    }),
  }).then(() => {
    // construct the fauna query
    return client.query(
      q.Create(q.Ref(`collections/users`), {
        data: {
          email,
          password,
          key,
        },
      })
    )
  })
}
