const { create, remove, read, readAll, update } = require("./crud")
const { confirm, forgot, login, reset, signup } = require("./identity")

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

// this pattern redirects every function to it's correct destination
// it also optimizes build time
const lambda = async (event) => {
  const { action } = event.queryStringParameters

  switch (action) {
    case "create":
      return create(event)
    case "remove":
      return remove(event)
    case "read":
      return read(event)
    case "read-all":
      return readAll(event)
    case "update":
      return update(event)

    case "confirm":
      return confirm(event)
    case "forgot":
      return forgot(event)
    case "login":
      return login(event)
    case "reset":
      return reset(event)
    case "signup":
      return signup(event)

    default:
      throw new Error("Unknown action")
  }
}
