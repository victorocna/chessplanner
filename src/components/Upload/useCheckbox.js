import React, { useState } from "react"
import { Checkbox } from "@material-ui/core"

const useCheckbox = () => {
  const [checkbox, setCheckbox] = useState({ skipFirst: true, howMuch: false })
  const handleChange = (name) => (event) => {
    setCheckbox({ ...checkbox, [name]: event.target.checked })
  }

  const showSkipFirst = () => (
    <Checkbox value="skipFirst" checked={checkbox.skipFirst} onChange={handleChange("skipFirst")} />
  )
  const showHowMuch = () => (
    <Checkbox value="howMuch" checked={checkbox.howMuch} onChange={handleChange("howMuch")} />
  )

  return {
    checkbox,
    showSkipFirst,
    showHowMuch,
  }
}

export default useCheckbox
