import React, { useEffect, useState } from "react"
import { Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"
import { tournamentColumns as columns } from "./columns"
import { changeActiveColumns, persistActiveColumns } from "./column-utils"

const editItem = (event, rowData) => {
  window.location.href = `/#/edit-tournament/${rowData.id}`
}

const actions = [{ icon: "edit", onClick: editItem }]
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
    options,
    columns,
    actions,
  })

  useEffect(() => {
    async function fetchData() {
      const all_tournaments = await fromStore("tournaments")
      const tournaments = all_tournaments.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setState((state) => ({ ...state, tournaments }))
    }
    fetchData()
  }, [])

  const changeColumns = () => {
    return changeActiveColumns(state.columns, "columns[tournaments]")
  }

  React.useEffect(() => {
    const activeColumns = persistActiveColumns(columns, "columns[tournaments]")
    setState((state) => ({ ...state, columns: activeColumns }))
  }, [])

  return (
    <div className="MaterialTable">
      <MaterialTable
        className="shadow-none"
        title={i18n("Tournaments")}
        columns={state.columns}
        data={state.tournaments}
        options={state.options}
        localization={i18n("_table")}
        actions={state.actions}
        onRowClick={editItem}
        onChangeColumnHidden={changeColumns}
      />
      <Fab color="secondary" aria-label="Add" href="#/new-tournament" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Tournaments
