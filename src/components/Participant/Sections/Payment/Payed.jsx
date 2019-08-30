import React from "react"
import { TableRow, TableCell, Input } from "@material-ui/core"
import { Field } from "formik"
import { i18n } from "../../../../locale"
import InputCurrency from "./InputCurrency"

function Payed() {
  const handleClick = () => {
    document.getElementById("input-payed").focus()
  }

  return (
    <TableRow>
      <TableCell align="right" onClick={handleClick}>
        <strong className="cursor-pointer">{i18n("TOTAL payed")}</strong>
      </TableCell>
      <TableCell className="max-width-105" align="right">
        <Field
          name="payment.payed"
          render={({ field }) => (
            <Input
              {...field} // "name", "value", "onChange", "onBlur"
              type="number"
              align="right"
              className="font-bold"
              id="input-payed"
              endAdornment={<InputCurrency />}
            />
          )}
        />
      </TableCell>
    </TableRow>
  )
}

export default Payed
