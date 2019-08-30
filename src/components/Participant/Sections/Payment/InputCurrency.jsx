import React from "react"
import { InputAdornment } from "@material-ui/core"
import { currency } from "../../../../defaults"

function InputCurrency() {
  return <InputAdornment position="end">{currency}</InputAdornment>
}

export default InputCurrency
