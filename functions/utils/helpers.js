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
    const token = jwt.decode(encodedToken[1])

    if (token.hasOwnProperty("email")) {
      user.email = token.email
    }
    if (
      token.hasOwnProperty("user_metadata") &&
      token.user_metadata.hasOwnProperty("key")
    ) {
      user.key = token.user_metadata.key.toString()
    }
  }

  return user
}

const isTokenValid = (authHeaders, secret = process.env.REACT_APP_JWT_NETLIFY_SECRET) => {
  const encodedToken = authHeaders.split(" ")
  if (typeof encodedToken[1] === "undefined") {
    return false
  }
  const token = jwt.decode(encodedToken[1])

  return (
    token &&
    token.hasOwnProperty("user_metadata") &&
    token.user_metadata.hasOwnProperty("key") &&
    token.user_metadata.hasOwnProperty("roles") &&
    Object.values(token.user_metadata.roles).includes(secret)
  )
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
