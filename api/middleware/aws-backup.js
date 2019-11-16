const extractJwt = require("../utils/extract-jwt")
const putLogEvents = require("../aws/putLogEvents")

module.exports = (req, res, next) => {
  const original = res.send

  res.send = function(message) {
    if (req.originalUrl.match(/(create|update|delete|foo)/)) {
      const { username, key } = extractJwt(req.headers)

      // GET /.netlify/functions/app/foo 404 "Not Found" hello@example.com fdss531caz
      putLogEvents(req.method, req.originalUrl, res.statusCode, message, username, key)
    }
    original.apply(res, arguments)
  }
  next()
}
