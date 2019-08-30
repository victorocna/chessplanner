import React from "react"
import { TableRow, TableCell, Input } from "@material-ui/core"
import { Field } from "formik"
import { i18n } from "../../../../locale"
import InputCurrency from "./InputCurrency"

function Prepay() {
  const handleClick = () => {
    document.getElementById("input-prepay").focus()
  }

  return (
    <TableRow className="border-bottom-solid">
      <TableCell align="right" onClick={handleClick}>
        <strong className="cursor-pointer">{i18n("Prepayment")}</strong>
      </TableCell>
      <TableCell className="max-width-105" align="right">
        <Field
          name="payment.prepayment"
          render={({ field }) => (
            <Input
              {...field} // "name", "value", "onChange", "onBlur"
              type="number"
              align="right"
              className="font-bold"
              id="input-prepay"
              endAdornment={<InputCurrency />}
            />
          )}
        />
      </TableCell>
    </TableRow>
  )
}

export default Prepay
