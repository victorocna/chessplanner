import React from "react"
import { TableRow, TableCell, Input } from "@material-ui/core"
import { Field } from "formik"
import { i18n } from "../../../../locale"
import InputCurrency from "./InputCurrency"
import { hasError } from "../../../../utils/validation"

function PaymentDiscount() {
  const handleClick = () => {
    document.getElementById("input-discount").focus()
  }

  return (
    <TableRow>
      <TableCell align="right" onClick={handleClick}>
        <strong className="cursor-pointer">{i18n("Discount")}</strong>
      </TableCell>
      <TableCell className="max-width-105" align="right">
        <Field
          name="payment.discount"
          render={({ field, form }) => (
            <Input
              {...field} // "name", "value", "onChange", "onBlur"
              type="number"
              align="right"
              className="font-bold"
              id="input-discount"
              error={hasError(form, field.name)}
              endAdornment={<InputCurrency />}
            />
          )}
        />
      </TableCell>
    </TableRow>
  )
}

export default PaymentDiscount
