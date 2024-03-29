import React from "react"
import { Fab, useMediaQuery, useTheme } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MaterialTable from "material-table"
import fromStore from "../../utils/fromStore"
import { hide, hideEvery } from "../../utils/hide"
import { i18n } from "../../locale"
import { taxColumns as columns } from "./columns"
import { changeActiveColumns, persistActiveColumns } from "./column-utils"

const editItem = (event, rowData) => {
  window.location.href = `/#/edit-tax/${rowData.id}`
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

const Taxes = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  if (isMobile) {
    hide("tournament").from(columns)
    hide("rules").from(columns)
    hideEvery(actions)
  }

  const [state, setState] = React.useState({
    options,
    columns,
    actions,
  })

  React.useEffect(() => {
    async function fetchData() {
      const all_taxes = await fromStore("taxes")
      const taxes = all_taxes.map((tax) => ({
        ...tax.data,
        id: tax["ref"]["@ref"]["id"],
      }))

      setState((state) => ({ ...state, taxes }))
    }
    fetchData()
  }, [])

  const changeColumns = () => {
    return changeActiveColumns(state.columns, "columns[taxes]")
  }

  React.useEffect(() => {
    const activeColumns = persistActiveColumns(columns, "columns[taxes]")
    setState((state) => ({ ...state, columns: activeColumns }))
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
        onChangeColumnHidden={changeColumns}
      />
      <Fab color="secondary" aria-label="Add" href="#/new-tax" className="fab">
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Taxes
