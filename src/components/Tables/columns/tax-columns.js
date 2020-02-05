import React from "react"
import { Chip } from "@material-ui/core"
import { i18n } from "../../../locale"

export default [
  {
    title: i18n("Tax"),
    field: "name",
    type: "string",
  },
  {
    title: i18n("Tournament"),
    field: "tournament",
    type: "string",
    render: ({ tournament }) => {
      if (tournament && tournament === "*") {
        return "Every tournament"
      }
      return tournament
    },
  },
  {
    title: i18n("Value"),
    field: "value",
    render: ({ value, currency = "" }) => {
      if (typeof value === "undefined") {
        return "N/A"
      }
      return value + " " + currency
    },
  },
  {
    title: i18n("Priority"),
    field: "priority",
    type: "numeric",
    hidden: true,
  },
  {
    title: i18n("Rules"),
    field: "rules",
    render: ({ rules = [] }) => {
      return rules.map(({ name }, i) => <Chip key={i} label={name} className="mr-2 mb-1" />)
    },
  },
]
