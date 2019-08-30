import React, { useEffect, useState } from "react"
import { Chip, Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"

const editItem = (event, rowData) => {
  window.location.href = `/#/edit-hotel/${rowData.id}`
}

const actions = [{ icon: "edit", onClick: editItem }]
const columns = [
  {
    title: i18n("Hotel"),
    field: "name",
    type: "string",
  },
  {
    title: i18n("Description"),
    field: "description",
    type: "string",
  },
  {
    title: i18n("Rooms"),
    field: "roomTypes",
    render: (rowData) => {
      if (typeof rowData.roomTypes !== "undefined") {
        return rowData.roomTypes.map((rule, i) => (
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

const Hotels = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  if (isMobile) {
    hide("description").from(columns)
    hide("rooms").from(columns)
    hideEvery(actions)
  }

  const [state, setState] = useState({
    options: options,
    columns: columns,
    actions: actions,
  })

  useEffect(() => {
    async function fetchData() {
      const all_hotels = await fromStore("all_hotels_by_key")
      const hotels = all_hotels.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setState((state) => ({ ...state, hotels: hotels }))
    }
    fetchData()
  }, [])

  return (
    <div className="MaterialTable">
      <MaterialTable
        title={i18n("Hotels")}
        columns={state.columns}
        data={state.hotels}
        options={state.options}
        localization={i18n("_table")}
        actions={state.actions}
        style={{
          boxShadow: "none",
        }}
        onRowClick={editItem}
      />
      <Fab color="secondary" aria-label="Add" href="#/new-hotel" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Hotels
