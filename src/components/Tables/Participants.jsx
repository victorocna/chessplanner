import React from "react"
import { Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"
import columns from "./participant-columns"
import { AppContext } from "../../context"
import optionalColumns from "../Settings/possible-columns"

const viewItem = (event, rowData) => {
  window.location.href = `/#/view/${rowData.id}`
}

const actions = []
const options = {
  doubleHorizontalScroll: true,
  emptyRowsWhenPaging: false,
  exportAllData: true, // Not just rendered data,
  filtering: true,
  pageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  search: false,
  detailPanelType: "single",
  exportButton: true,
  columnsButton: true,
}

const Participants = () => {
  /**
   * Filter columns based on settings
   * @see https://stackoverflow.com/a/33034768
   */
  const { settings } = React.useContext(AppContext)
  React.useEffect(() => {
    let filtered_columns = []
    if (settings && settings.columns) {
      const optional_columns = Object.keys(optionalColumns)
      const all_columns = columns.map((item) => item.field)

      const mandatory_columns = all_columns.filter((item) => !optional_columns.includes(item))
      const user_columns = all_columns.filter((item) => settings.columns.includes(item))
      filtered_columns = mandatory_columns.concat(user_columns)

      setState((state) => ({
        ...state,
        columns: columns.filter((item) => filtered_columns.includes(item.field)),
      }))
    }
  }, [settings])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  if (isMobile) {
    hide("tournaments.side").from(columns)
    hideEvery(actions)
  }

  const [state, setState] = React.useState({
    options: options,
    columns: columns,
    actions: actions,
  })

  React.useEffect(() => {
    async function fetchData() {
      const all_participants = await fromStore("participants")
      const participants = all_participants.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setState((state) => ({ ...state, participants }))
    }
    fetchData()
  }, [])

  return (
    <div className="MaterialTable">
      <MaterialTable
        title={i18n("Participants")}
        columns={state.columns}
        data={state.participants}
        options={state.options}
        localization={i18n("_table")}
        actions={state.actions}
        style={{
          boxShadow: "none",
        }}
        onRowClick={viewItem}
      />
      <Fab color="secondary" aria-label="Add" href="#/new" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Participants
