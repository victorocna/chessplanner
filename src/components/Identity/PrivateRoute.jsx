import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import IdentityContext from "../../context/identity-context"

function PrivateRoute({ component: Component, ...rest }) {
  const identity = React.useContext(IdentityContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        identity.user ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Function),
}

export default PrivateRoute
