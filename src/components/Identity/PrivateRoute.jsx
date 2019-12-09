import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { identity } from "../../identity"
import jwt from "jsonwebtoken"
import { notify } from "../Toast"

function PrivateRoute({ component: Component, ...rest }) {
  const decoded = jwt.decode(identity.token)
  if (decoded && decoded.exp < Date.now() / 1000) {
    notify.warn("Your session has expired. Please login again")
    localStorage.removeItem("token")
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        identity.token ? <Component {...props} /> : <Redirect to={{ pathname: "/account" }} />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Function),
}

export default PrivateRoute
