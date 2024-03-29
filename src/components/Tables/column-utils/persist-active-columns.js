export default (columns, key) => {
  const userColumns = localStorage.getItem(key)
  if (!userColumns) {
    return columns
  }

  const _userColumns = userColumns.split(',')
  return columns.map((column) => {
    const { field } = column
    if (_userColumns.includes(field)) {
      return { ...column, hidden: false }
    }

    return { ...column, hidden: true }
  })
}
