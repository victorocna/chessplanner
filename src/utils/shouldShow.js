module.exports = (column) => {
  return new (function() {
    this.basedOn = (settings) => {
      if (settings && settings.columns) {
        return settings.columns.includes(column)
      }
      // do not show anything optional if settings are undefined
      return false
    }
  })()
}
