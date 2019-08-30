import React, { useState } from "react"
import { CircularProgress } from "@material-ui/core"

const useLoading = () => {
  const [isLoading, setLoading] = useState(false)

  const LoadingIcon = () => {
    if (isLoading) {
      return <CircularProgress className="flex-loading" />
    }
    return false
  }

  return {
    isLoading,
    setLoading,
    LoadingIcon,
  }
}

export default useLoading
