import React from "react"
import PropTypes from "prop-types"

function Debug({ subject }) {
  if (!window.location.href || window.location.href.indexOf("debug") === -1) {
    return null
  }

  return (
    <div>
      <pre>{JSON.stringify(subject, null, 2)}</pre>
    </div>
  )
}

Debug.propTypes = {
  subject: PropTypes.object,
}

Debug.defaultProps = {
  subject: {},
}

export default Debug
