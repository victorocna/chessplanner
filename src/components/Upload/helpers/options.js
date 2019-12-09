import { i18n } from "../../../locale"

export default [
  { key: "name", datatype: "string", text: i18n("Name"), required: true },
  { key: "type", datatype: "string", text: i18n("Type"), required: true },
  { key: "club", datatype: "string", text: i18n("Club") },
  { key: "group", datatype: "string", text: i18n("Group") },
  { key: "federation", datatype: "string", text: i18n("Federation") },
  { key: "yob", datatype: "string", text: i18n("Year of birth") },
  { key: "gender", datatype: "string", text: i18n("Gender") },
  { key: "hotel.name", datatype: "string", text: i18n("Hotel") },
  { key: "hotel.room.type", datatype: "string", text: i18n("Room type") },
  { key: "hotel.room.number", datatype: "string", text: i18n("Room number") },
  { key: "tournaments.main", datatype: "string", text: i18n("Main tournament") },
  { key: "hotel.arrival", datatype: "datetime", text: i18n("Arrival") },
  { key: "hotel.departure", datatype: "datetime", text: i18n("Departure") },
  { key: "payment.discount", datatype: "number", text: i18n("Discount") },
  { key: "payment.prepayment", datatype: "number", text: i18n("Prepayment") },
  { key: "payment.method", datatype: "string", text: i18n("Payment method") },
  { key: "notes", datatype: "string", text: i18n("Notes") },
]
