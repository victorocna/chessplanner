const xpath = require("xpath")

const fideName = (node, i) => {
  const td = xpath.select("//td[@data-label='Name']", node)
  if (!td || !td.length) {
    return ""
  }

  // expected result: '<a href=/profile/1213202>Ocnarescu, Victor'
  const name = td[i].firstChild.data
  const regex = />([a-zA-Z-]+), ([a-zA-Z-]+)/gi
  const fideName = []

  let m
  while ((m = regex.exec(name)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      if (groupIndex > 0) {
        fideName.push(match)
      }
    })

    return fideName.join(" ")
  }
}

module.exports = fideName
