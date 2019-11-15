const { create, update, remove, read, readAll } = require("./crud")
const { confirm, forgot, login, reset, signup } = require("./identity")
const { isHashValid, isLoggedIn, userExists } = require("./middleware")

module.exports = function(app) {
  /**
   * Identity routes
   */
  app.post("/confirm/:hash", (req, res) => {
    return confirm(req, res)
  })
  app.post("/forgot/", (req, res) => {
    return forgot(req, res)
  })
  app.post("/login", (req, res) => {
    return login(req, res)
  })
  app.post("/reset/:hash", isHashValid, (req, res) => {
    return reset(req, res)
  })
  app.post("/signup", userExists, (req, res) => {
    return signup(req, res)
  })

  /**
   * CRUD routes
   */
  app.get("/read/:collection/:id", (req, res) => {
    return read(req, res)
  })
  app.get("/read-all/:collection", isLoggedIn, (req, res) => {
    return readAll(req, res)
  })
  app.post("/create/:collection", isLoggedIn, (req, res) => {
    return create(req, res)
  })
  app.post("/update/:collection/:id", isLoggedIn, (req, res) => {
    return update(req, res)
  })
  app.delete("/delete/:collection/:id", isLoggedIn, (req, res) => {
    return remove(req, res)
  })
}
