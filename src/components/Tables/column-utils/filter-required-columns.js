export default (columns, columnsFromSettings) => {
  return columns.filter((column) => {
    const { field, required } = column
    if (required || columnsFromSettings.includes(field)) {
      return true
    }
    return false
  })
}
