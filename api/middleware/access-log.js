const ip = require("ip")

module.exports = (req, res, next) => {
  /* eslint-disable-next-line */
  console.log(`${ip.address()} ${req.method} ${req.originalUrl}`) // :remote-addr :method :url
  next()
}
