import React from "react"
import { Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"
import { participantColumns as columns } from "./columns"
import { changeActiveColumns, filterRequiredColumns, persistActiveColumns } from "./column-utils"
import { AppContext } from "../../context"

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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  if (isMobile) {
    hide("tournaments.side").from(columns)
    hideEvery(actions)
  }

  const [state, setState] = React.useState({
    options,
    columns,
    actions,
  })

  const { settings } = React.useContext(AppContext)
  React.useEffect(() => {
    if (settings) {
      const { columns: columnsFromSettings } = settings
      const { columns } = state
      const possibleColumns = filterRequiredColumns(columns, columnsFromSettings)

      const activeColumns = persistActiveColumns(possibleColumns, "columns[participants]")
      setState((state) => ({ ...state, columns: activeColumns }))
    }
    // eslint-disable-next-line
  }, [settings])

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

  const changeColumns = () => {
    return changeActiveColumns(state.columns, "columns[participants]")
  }

  return (
    <div className="MaterialTable">
      <MaterialTable
        className="shadow-none"
        title={i18n("Participants")}
        columns={state.columns}
        data={state.participants}
        options={state.options}
        localization={i18n("_table", {})}
        actions={state.actions}
        onRowClick={viewItem}
        onChangeColumnHidden={changeColumns}
      />
      <Fab color="secondary" aria-label="Add" href="#/new" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Participants
