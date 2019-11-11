import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { identity } from "../../identity"

function PrivateRoute({ component: Component, ...rest }) {
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
