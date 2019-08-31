import React from "react"
import { Fade } from "@material-ui/core"
import "./Modern.css"

function Loading() {
  return (
    <div className="loading-overlay">
      <Fade in={true} timeout={750} style={{ transitionDelay: 500 }}>
        <div className="cssload-loader">
          <div className="cssload-inner cssload-one"></div>
          <div className="cssload-inner cssload-two"></div>
          <div className="cssload-inner cssload-three"></div>
        </div>
      </Fade>
    </div>
  )
}

export default Loading
