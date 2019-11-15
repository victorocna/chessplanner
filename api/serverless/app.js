const express = require("express")
const serverless = require("serverless-http")
const app = require("../app")

// bind the routes to the express app
const router = express.Router()
require("../router")(router)
app.use("/.netlify/functions/app", router) // path must route to lambda

module.exports = app
module.exports.handler = serverless(app)
