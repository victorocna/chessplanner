import React from "react"
import PropTypes from "prop-types"
import { TableRow, TableCell, Input } from "@material-ui/core"
import { i18n } from "../../../../locale"
import InputCurrency from "./InputCurrency"

function Computed({ value }) {
  return (
    <TableRow>
      <TableCell align="right">
        <strong>{i18n("Computed total")}</strong>
      </TableCell>
      <TableCell className="max-width-105" align="right">
        <Input disabled value={value} align="right" endAdornment={<InputCurrency />} />
      </TableCell>
    </TableRow>
  )
}

Computed.propTypes = {
  value: PropTypes.any,
}

Computed.defaultProps = {
  value: "",
}

export default Computed
