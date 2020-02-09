import React from "react"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core/"
import { Prepay, Payed, Discount, ToPay, Computed, TaxRow } from "../Payment"
import { AppContext, ParticipantContext } from "../../../../context"
import { i18n } from "../../../../locale"
import fromStore from "../../../../utils/fromStore"
import howMuch from "../../../../utils/howMuch"
import { roomName, roomPrice } from "../../../../utils/room"
import shouldShow from "../../../../utils/shouldShow"

function Payment() {
  const { values, setFieldValue } = React.useContext(ParticipantContext)
  const { settings } = React.useContext(AppContext)

  const [taxes, setTaxes] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const all_taxes = await fromStore("taxes")
      const taxes = all_taxes.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setTaxes(taxes)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    if (taxes && taxes.length) {
      try {
        const computedTaxes = howMuch(taxes, values)
        // const taxRows = Object.values(howMuchObject)

        // accommodation
        if (values.hotel.name && values.hotel.nights && values.hotel.room.price) {
          const name = roomName(values.hotel)
          const value = roomPrice(values.hotel)
          if (!isNaN(value)) {
            // taxRows.push({ name, value })
            computedTaxes[name] = Number(value)
          }
        }

        let i = 0
        setFieldValue("taxes", []) // reset taxes
        for (const name in computedTaxes) {
          setFieldValue(`taxes[${i}]`, {
            name,
            value: Number(computedTaxes[name])
          })
          i++
        }

        const initial = 0
        const computed = Object.values(computedTaxes).reduce((accumulator, value) => {
          return accumulator + Number(value)
        }, initial)
        setFieldValue("payment.computed", computed)

        let toPay = computed
        if (values.payment.discount) {
          toPay -= values.payment.discount
        }
        if (values.payment.prepayment) {
          toPay -= values.payment.prepayment
        }
        setFieldValue("payment.toPay", toPay)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
      }
    }
    // eslint-disable-next-line
  }, [taxes, values.payment])

  return (
    <Table className="max-width-420">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align="right">{i18n("Value")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {values.taxes &&
          values.taxes.length > 0 &&
          values.taxes.map((item, index) => (
            <TaxRow key={index} name={item.name} value={item.value} />
          ))}

        <Computed value={values.payment.computed} />
        {shouldShow("payment.discount").basedOn(settings) && <Discount />}
        {shouldShow("payment.prepayment").basedOn(settings) && <Prepay />}
        <ToPay value={values.payment.toPay} />
        <Payed />
      </TableBody>
    </Table>
  )
}

export default Payment
