import React from "react"
const Upload = React.lazy(() => import("./Upload"))

function LazyUpload(props) {
  return (
    <React.Suspense fallback={<></>}>
      <Upload {...props} />
    </React.Suspense>
  )
}


export default LazyUpload
