const { extractJwt, isJson } = require("../utils")
const putLogEvents = require("../aws/putLogEvents")

module.exports = (req, res, next) => {
  const original = res.send

  res.send = function(message) {
    // base64 encode unparsed JSON string
    if (isJson(message)) {
      message = Buffer.from(message).toString("base64")
    }
    if (req.originalUrl.match(/(create|update|delete)/)) {
      const { username, key } = extractJwt(req.headers)

      // GET /.netlify/functions/app/foo 404 "Not Found" hello@example.com fdss531caz
      putLogEvents(req.method, req.originalUrl, res.statusCode, message, username, key)
    }
    original.apply(res, arguments)
  }
  next()
}
