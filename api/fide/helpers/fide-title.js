const xpath = require("xpath")

const fideTitle = (node, i) => {
  const td = xpath.select("//td[@data-label='title']", node)
  if (!td || !td.length) {
    return ""
  }

  return td[i].firstChild.data.split(" ")[0]
}

module.exports = fideTitle
