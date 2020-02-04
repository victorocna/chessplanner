import React from "react"
import { format } from "date-fns"
import get from "lodash.get"
import { i18n } from "../../locale"

const minWidth = { minWidth: "300px" }
const exactMatch = (term, rowData, field) => {
  // search should exactly match field, not just indexOf tra-la-la
  if (!get(rowData, field)) {
    return false
  }

  // eslint-disable-next-line
  return term == get(rowData, field)
}

const getLeftToPay = (rowData) => {
  return Number(rowData.payment.toPay) - Number(rowData.payment.payed)
}

const renderLeftToPay = (rowData) => {
  const value = getLeftToPay(rowData)
  let color = value === 0 ? "green" : value > 0 ? "red" : "white"
  let backgroundColor = value < 0 ? "red" : "white"
  let style = {
    backgroundColor,
    color,
    padding: "4px",
    borderRadius: "10%",
  }
  return <span style={style}>{value}</span>
}

const renderNotes = (rowData) => <div className="truncate">{rowData.notes}</div>

const columns = [
  {
    title: i18n("Name"),
    field: "name",
    cellStyle: minWidth,
  },
  {
    title: i18n("Type"),
    field: "type",
    hidden: true,
  },
  {
    title: i18n("Year of birth"),
    field: "yob",
    hidden: true,
  },
  {
    title: i18n("Club"),
    field: "club", // eslint-disable-next-line
    render: (rowData) => {
      return <div className="truncate">{rowData.club}</div>
    },
  },
  {
    title: i18n("Federation"),
    field: "federation",
    hidden: true,
  },
  {
    title: i18n("Gender"),
    field: "gender",
    hidden: true,
  },
  {
    title: i18n("Main tournament"),
    field: "tournaments.main",
  },
  {
    title: i18n("Side tournaments"),
    field: "tournaments.side",
    render: (rowData) => {
      if (rowData.tournaments && rowData.tournaments.side) {
        return rowData.tournaments.side.join(" ")
      }
      return "N/A"
    },
  },
  {
    title: i18n("Hotel"),
    field: "hotel.name",
    cellStyle: minWidth,
    hidden: true,
  },
  {
    title: i18n("Room type"),
    field: "hotel.room.type",
    hidden: true,
  },
  {
    title: i18n("Room number"),
    field: "hotel.room.number",
    hidden: true,
    customFilterAndSearch: (term, rowData) => exactMatch(term, rowData, "hotel.room.number"),
  },
  {
    title: i18n("Arrival"),
    field: "hotel.arrival",
    hidden: true,
    render: (rowData) => {
      if (rowData.hotel.arrival) {
        return format(rowData.hotel.arrival, "yyyy/MM/dd")
      }
      return "N/A"
    },
  },
  {
    title: i18n("Departure"),
    field: "hotel.departure",
    hidden: true,
    render: (rowData) => {
      if (rowData.hotel.departure) {
        return format(rowData.hotel.departure, "yyyy/MM/dd")
      }
      return "N/A"
    },
  },
  {
    title: i18n("Total nights"),
    field: "hotel.nights",
    hidden: true,
    customFilterAndSearch: (term, rowData) => exactMatch(term, rowData, "hotel.nights"),
  },
  {
    title: i18n("Room share"),
    field: "hotel.room.contribution",
    hidden: true,
    filtering: false,
  },
  {
    title: i18n("Notes"),
    field: "notes",
    hidden: true,
    filtering: false,
    render: (rowData) => renderNotes(rowData),
  },
  {
    title: i18n("TOTAL to pay"),
    field: "payment.toPay",
    hidden: true,
    filtering: false,
  },
  {
    title: i18n("TOTAL payed"),
    field: "payment.payed",
    hidden: true,
    filtering: false,
  },
  {
    title: i18n("Prepayment"),
    field: "payment.prepayment",
    hidden: true,
    filtering: false,
  },
  {
    title: i18n("Amount due"),
    cellStyle: { width: "200px" },
    render: (rowData) => renderLeftToPay(rowData),
    customSort: (a, b) => getLeftToPay(a) - getLeftToPay(b),
  },
]

export default columns
