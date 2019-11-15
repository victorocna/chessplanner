require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

// log only 4xx and 5xx responses to console
// TODO: aws logging
app.use(
  morgan("dev", {
    skip: function(req, res) {
      return res.statusCode < 400
    },
  })
)

module.exports = app
