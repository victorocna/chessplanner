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
        <Input
          disabled
          value={value}
          align="right"
          error={!(+value > 0)}
          endAdornment={<InputCurrency />}
        />
      </TableCell>
    </TableRow>
  )
}

Computed.propTypes = {
  value: PropTypes.number,
}

Computed.defaultProps = {
  value: 0,
}

export default Computed
