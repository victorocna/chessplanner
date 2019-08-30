import React from "react"
import PropTypes from "prop-types"
import { TableRow, TableCell, Input } from "@material-ui/core"
import InputCurrency from "./InputCurrency"

function TaxRow({ name, value }) {
  // Hide if incomplete info
  if (!name || !value) {
    return null
  }

  return (
    <TableRow>
      <TableCell align="right">{name}</TableCell>
      <TableCell className="max-width-105" align="right">
        <Input disabled value={value} align="right" endAdornment={<InputCurrency />} />
      </TableCell>
    </TableRow>
  )
}

TaxRow.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
}

TaxRow.defaultProps = {
  name: "",
  value: "",
}

export default TaxRow
