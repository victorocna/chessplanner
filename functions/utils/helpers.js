import jwt from "jsonwebtoken"

const prettyErrors = (error) => {
  if (error.hasOwnProperty("name") && error.hasOwnProperty("message")) {
    return `${error.name} ${error.message}`
  }

  return "unknown error"
}

const getUser = (authHeaders) => {
  const user = { key: null, email: "anonymous" }

  const encodedToken = authHeaders.split(" ")
  if (typeof encodedToken[1] !== "undefined") {
    return jwt.decode(encodedToken[1])
  }

  return user
}

const isTokenValid = (headers) => {
  const token = headers.split(" ")[1] || ""

  return jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err) => {
    if (err) {
      return false
    }
    return true
  })
}

const waitForCoffee = () => {
  return new Promise((resolve) => setTimeout(resolve, 2500))
}

const oneLine = (message) => {
  return message.split("\n").join("")
}

/**
 * Generates a numeric random key with fixed length
 * @param {int} length
 */
const randomKey = (length) => {
  return Math.floor(Math.pow(10, length) + Math.random() * 9 * Math.pow(10, length))
}

export { oneLine, getUser, waitForCoffee, isTokenValid, prettyErrors, randomKey }
