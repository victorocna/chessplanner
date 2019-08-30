import React, { useEffect, useState } from "react"
import { Chip, Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"

const editItem = (event, rowData) => {
  window.location.href = `/#/edit-tax/${rowData.id}`
}

const actions = [{ icon: "edit", onClick: editItem }]
const columns = [
  {
    title: i18n("Tax"),
    field: "name",
    type: "string",
  },
  {
    title: i18n("Tournament"),
    field: "tournament",
    type: "string",
    render: (rowData) => {
      if (rowData.tournament && rowData.tournament === "*") {
        return "Every tournament"
      }
      return rowData.tournament
    },
  },
  {
    title: i18n("Value"),
    field: "value",
    render: (rowData) => {
      if (typeof rowData.value === "undefined") {
        return "N/A"
      }
      return rowData.value + " " + (rowData.currency || "")
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
    render: (rowData) => {
      if (typeof rowData.rules !== "undefined") {
        return rowData.rules.map((rule, i) => (
          <Chip key={i} label={rule.name} style={{ marginRight: "5px" }} />
        ))
      }
    },
  },
]
const options = {
  pageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  emptyRowsWhenPaging: false,
  search: false,
  selection: false,
  exportButton: true,
  exportAllData: true,
  columnsButton: true,
  actionsColumnIndex: -1,
}

const Taxes = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  if (isMobile) {
    hide("tournament").from(columns)
    hide("rules").from(columns)
    hideEvery(actions)
  }

  const [state, setState] = useState({
    options: options,
    columns: columns,
    actions: actions,
  })

  useEffect(() => {
    async function fetchData() {
      const all_taxes = await fromStore("all_taxes_by_key")
      const taxes = all_taxes.map((tax) => ({
        ...tax.data,
        id: tax["ref"]["@ref"]["id"],
      }))

      setState((state) => ({ ...state, taxes: taxes }))
    }
    fetchData()
  }, [])

  return (
    <div className="MaterialTable">
      <MaterialTable
        title={i18n("Taxes")}
        columns={state.columns}
        data={state.taxes}
        options={state.options}
        localization={i18n("_table")}
        actions={state.actions}
        style={{
          boxShadow: "none",
        }}
        onRowClick={editItem}
      />
      <Fab color="secondary" aria-label="Add" href="#/new-tax" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Taxes
