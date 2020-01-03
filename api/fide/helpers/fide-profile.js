const xpath = require("xpath")

const fideProfile = (node, i) => {
  const td = xpath.select("//td[@data-label='Name']", node)
  if (!td || !td.length) {
    return ""
  }

  // expected result: '<a href=/profile/1213202>Ocnarescu, Victor'
  const name = td[i].firstChild.data
  const regex = /\/profile\/([0-9]+)>/gi
  const profile = []

  let m
  while ((m = regex.exec(name)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      if (groupIndex > 0) {
        profile.push(match)
      }
    })

    return profile.join(" ")
  }
}

module.exports = fideProfile
