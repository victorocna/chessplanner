require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

// log requests from the API to console
app.use(require("./middleware/access-log"))

// allow CORS from localhost
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:3000" }))
}

module.exports = app
