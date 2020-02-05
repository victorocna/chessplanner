import React from "react"
import { Chip } from "@material-ui/core"
import { i18n } from "../../../locale"

export default [
  {
    title: i18n("Hotel"),
    field: "name",
    type: "string",
  },
  {
    title: i18n("Description"),
    field: "description",
    type: "string",
    hidden: true,
  },
  {
    title: i18n("Rooms"),
    field: "roomTypes",
    render: ({ roomTypes = [] }) => {
      return roomTypes.map(({ name }, i) => <Chip key={i} label={name} className="mr-2 mb-1" />)
    },
  },
]
