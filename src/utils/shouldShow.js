module.exports = (column) => {
  return new (function() {
    this.basedOn = (settings) => {
      if (settings && settings.columns) {
        return settings.columns.includes(column)
      }
      return true
    }
  })()
}
