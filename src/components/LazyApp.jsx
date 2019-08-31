import React from "react"
import { Loading } from "./Loading"
const App = React.lazy(() => import("./App"))

function LazyApp(props) {
  return (
    <React.Suspense fallback={<Loading />}>
      <App {...props} />
    </React.Suspense>
  )
}

export default LazyApp
