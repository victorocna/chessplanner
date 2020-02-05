import { i18n } from "../../../locale"

export default [
  {
    title: i18n("Tournament"),
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
    title: i18n("Type"),
    field: "type",
    type: "string",
  },
]
