import React from "react"
import PropTypes from "prop-types"
import { TableRow, TableCell, Input } from "@material-ui/core"
import { i18n } from "../../../../locale"
import InputCurrency from "./InputCurrency"

function ToPay({ value }) {
  return (
    <TableRow>
      <TableCell align="right">
        <strong>{i18n("TOTAL to pay")}</strong>
      </TableCell>
      <TableCell className="max-width-105" align="right">
        <Input
          disabled
          value={value}
          align="right"
          error={!(+value >= 0)}
          endAdornment={<InputCurrency />}
        />
      </TableCell>
    </TableRow>
  )
}

ToPay.propTypes = {
  value: PropTypes.number,
}

ToPay.defaultProps = {
  value: 0,
}

export default ToPay
