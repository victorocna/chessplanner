import React, { useEffect, useState } from "react"
import { Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"

const editItem = (event, rowData) => {
  window.location.href = `/#/edit-tournament/${rowData.id}`
}

const actions = [{ icon: "edit", onClick: editItem }]
const columns = [
  {
    title: i18n("Tournament"),
    field: "name",
    type: "string",
  },
  {
    title: i18n("Description"),
    field: "description",
    type: "string",
  },
  {
    title: i18n("Type"),
    field: "type",
    type: "string",
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

const Tournaments = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  if (isMobile) {
    hide("description").from(columns)
    hideEvery(actions)
  }

  const [state, setState] = useState({
    options: options,
    columns: columns,
    actions: actions,
  })

  useEffect(() => {
    async function fetchData() {
      const all_tournaments = await fromStore("all_tournaments_by_key")
      const tournaments = all_tournaments.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setState((state) => ({ ...state, tournaments: tournaments }))
    }
    fetchData()
  }, [])

  return (
    <div className="MaterialTable">
      <MaterialTable
        title={i18n("Tournaments")}
        columns={state.columns}
        data={state.tournaments}
        options={state.options}
        localization={i18n("_table")}
        actions={state.actions}
        style={{
          boxShadow: "none",
        }}
        onRowClick={editItem}
      />
      <Fab color="secondary" aria-label="Add" href="#/new-tournament" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Tournaments
