import React from "react"
import PropTypes from "prop-types"
import { Button, Fade } from "@material-ui/core"
import { i18n } from "../locale"

function WhatsNext({ path }) {
  return (
    <Fade in={true} timeout={750} style={{ transitionDelay: 500 }}>
      <div>
        <p>{i18n("Everything was saved successfully. What's next?")}</p>
        <div className="flex mt-4 mb-4">
          <Button
            variant="outlined"
            color="primary"
            className="mr-4"
            onClick={() => {
              window.location.href = path
            }}
          >
            Back to list
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-4"
            onClick={() => {
              window.location.reload()
            }}
          >
            Add one more
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="mr-4"
            onClick={() => {
              window.location.href = "/#/"
            }}
          >
            Back home
          </Button>
        </div>
      </div>
    </Fade>
  )
}

WhatsNext.propTypes = {
  path: PropTypes.string,
}

WhatsNext.defaultProps = {
  path: "/#/",
}

export default WhatsNext
