const cors = require("cors")
const corsOptions = require("./cors-options")
const { create, update, remove, read, readAll } = require("./crud")
const { confirm, forgot, login, reset, signup } = require("./identity")
const { emailConfirm, emailForgot } = require("./email")
const { canCreate, isHashValid, isLoggedIn, userExists, userNotExist } = require("./middleware")
const { search } = require("./fide")
const { createParticipant, readHotelNames, readTournamentNames } = require("./public")

module.exports = function(app) {
  /**
   * Identity routes
   */
  app.post("/confirm", (req, res) => {
    return confirm(req, res)
  })
  app.post("/forgot", (req, res) => {
    return forgot(req, res)
  })
  app.post("/login", (req, res) => {
    return login(req, res)
  })
  app.post("/reset", isHashValid, (req, res) => {
    return reset(req, res)
  })
  app.post("/signup", userExists, (req, res) => {
    return signup(req, res)
  })

  /**
   * Send email routes to users already registered
   */
  app.post("/email/confirm", userNotExist, (req, res) => {
    return emailConfirm(req, res)
  })
  app.post("/email/forgot", userNotExist, (req, res) => {
    return emailForgot(req, res)
  })

  /**
   * CRUD routes
   */
  app.get("/read/:collection/:id", isLoggedIn, (req, res) => {
    return read(req, res)
  })
  app.get("/read-all/:collection", isLoggedIn, (req, res) => {
    return readAll(req, res)
  })
  app.post("/create/:collection", isLoggedIn, canCreate, (req, res) => {
    return create(req, res)
  })
  app.post("/update/:collection/:id", isLoggedIn, (req, res) => {
    return update(req, res)
  })
  app.delete("/remove/:collection/:id", isLoggedIn, (req, res) => {
    return remove(req, res)
  })

  /**
   * FIDE routes
   */
  app.get("/fide/search", (req, res) => {
    return search(req, res)
  })

  /**
   * Public routes with whitelist CORS
   * @see https://restfulapi.net/resource-naming/
   */
  app.get("/public/hotels/:key", cors(corsOptions), (req, res) => {
    return readHotelNames(req, res)
  })
  app.get("/public/tournaments/:key", cors(corsOptions), (req, res) => {
    return readTournamentNames(req, res)
  })
  app.post("/public/participants/:key", (req, res) => {
    return createParticipant(req, res)
  })
}
