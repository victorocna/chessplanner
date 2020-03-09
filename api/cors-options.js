const whitelist = require("./whitelist")

/**
 * @see https://expressjs.com/en/resources/middleware/cors.html
 */
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      // maybe throw an error
      callback(null, false)
    }
  },
}

module.exports = corsOptions
