import putLogEvents from "../aws/putLogEvents"
import { isTokenValid } from "../utils/helpers"

/**
 * @param {Object} event
 * @param {Object} data
 */
export default async (event, data) => {
  if (event.httpMethod !== data.httpMethod) {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  for (let i = 0; i < data.required.length; i++) {
    if (typeof event.queryStringParameters[data.required[i]] === "undefined") {
      return { statusCode: 404, body: "Not Found" }
    }
  }

  if (!event.headers["authorization"]) {
    await putLogEvents(`Auth error! No authorization header detected`)
    return { statusCode: 401, body: "Unauthorized" }
  }

  if (!isTokenValid(event.headers.authorization)) {
    await putLogEvents(`Auth error! Invalid JWT secret`)
    return { statusCode: 401, body: "Unauthorized" }
  }

  return { statusCode: 200 }
}
