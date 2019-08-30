const hide = (subject) => {
  return new Hide(subject)
}

function Hide(subject) {
  this.from = (columns) => {
    for (let i = 0; i < columns.length; i++) {
      if (typeof columns[i] === "object" && columns[i].field !== "undefined") {
        if (columns[i].field === subject) {
          columns[i].hidden = true
        }
      }
    }
    return columns
  }
  return this
}

const hideEvery = (actions) => {
  for (let i = 0; i < actions.length; i++) {
    actions.pop()
  }
}

export { hide, hideEvery }
