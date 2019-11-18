require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

// log responses from the API to console
app.use(morgan("dev"))

// intercept 4xx and 5xx status codes and write to AWS logger
app.use(require("./middleware/aws-log-errors"))

// intercept important routes and write backup to AWS logger
app.use(require("./middleware/aws-backup"))

// allow CORS from localhost
app.use(cors({ origin: "http://localhost:3000" }))

module.exports = app
