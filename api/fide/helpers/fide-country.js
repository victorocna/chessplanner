const xpath = require("xpath")

const fideCountry = (node, i) => {
  const td = xpath.select("//td[contains(@class, 'flag-wrapper')]", node)
  if (!td || !td.length) {
    return ""
  }

  // expected result: 'ROU\r\n'
  return td[i].lastChild.data.split("\r")[0]
}

module.exports = fideCountry
