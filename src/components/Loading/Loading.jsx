import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import "./Loading.css"

function Loading() {
  return (
    <div className="loading-overlay">
      <CircularProgress />
    </div>
  )
}

export default Loading
