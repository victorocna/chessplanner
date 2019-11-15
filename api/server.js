const express = require("express")
const path = require("path")
const app = require("./app")

// @see https://expressjs.com/en/starter/static-files.html
app.use("/", express.static(path.join(__dirname, "../public")))

// start the dev server
app.listen(8888, () => console.log("Local app listening on port 8888!"))
