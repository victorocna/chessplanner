import React, { useEffect, useState } from "react"
import { Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"
import { hotelColumns as columns } from "./columns"
import { changeActiveColumns, persistActiveColumns } from "./column-utils"

const editItem = (event, rowData) => {
  window.location.href = `/#/edit-hotel/${rowData.id}`
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

const Hotels = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  if (isMobile) {
    hide("description").from(columns)
    hide("rooms").from(columns)
    hideEvery(actions)
  }

  const [state, setState] = useState({
    options,
    columns,
    actions,
  })

  useEffect(() => {
    async function fetchData() {
      const all_hotels = await fromStore("hotels")
      const hotels = all_hotels.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setState((state) => ({ ...state, hotels: hotels }))
    }
    fetchData()
  }, [])

  const changeColumns = () => {
    return changeActiveColumns(state.columns, "columns[hotels]")
  }

  React.useEffect(() => {
    const activeColumns = persistActiveColumns(columns, "columns[hotels]")
    setState((state) => ({ ...state, columns: activeColumns }))
  }, [])

  return (
    <div className="MaterialTable">
      <MaterialTable
        className="shadow-none"
        title={i18n("Hotels")}
        columns={state.columns}
        data={state.hotels}
        options={state.options}
        localization={i18n("_table")}
        actions={state.actions}
        onRowClick={editItem}
        onChangeColumnHidden={changeColumns}
      />
      <Fab color="secondary" aria-label="Add" href="#/new-hotel" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Hotels
