import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { identity } from "../../identity"
import jwt from "jsonwebtoken"

function PrivateRoute({ component: Component, ...rest }) {
  let hasExpired = false
  const decoded = jwt.decode(identity.token)
  if (decoded && decoded.exp < Date.now() / 1000) {
    hasExpired = true
    localStorage.removeItem("token")
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        identity.token ? <Component {...props} /> : <Redirect to={{
          pathname: "/account" + (hasExpired ? "/expired" : "")
        }} />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Function),
}

export default PrivateRoute
