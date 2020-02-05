export default (columns, key) => {
  const activeColumns = columns
    .filter((column) => {
      const { hidden } = column
      return !hidden
    })
    .map((column) => {
      const { field } = column
      return field
    })

  localStorage.setItem(key, activeColumns)
}
