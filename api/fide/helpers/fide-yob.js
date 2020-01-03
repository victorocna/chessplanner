const xpath = require("xpath")

const fideYob = (node, i) => {
  const td = xpath.select("//td[@data-label='B-Year']", node)
  if (!td || !td.length) {
    return ""
  }

  return td[i].firstChild.data
}

module.exports = fideYob
