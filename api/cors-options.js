const whitelist = require("./whitelist")

/**
 * @see https://expressjs.com/en/resources/middleware/cors.html
 */
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

module.exports = corsOptions
