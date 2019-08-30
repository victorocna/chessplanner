import fetch from "node-fetch"
import { randomKey } from "./utils/helpers"

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

  return fetch(`${identity.url}/admin/users`, {
    method: "POST",
    headers: { Authorization: `Bearer ${identity.token}` },
    body: JSON.stringify({
      email,
      password,
      confirm: true,
      user_metadata: {
        roles: ["auth0", "extended"],
        key: randomKey(12),
      },
    }),
  })
}
