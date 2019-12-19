const fetch = require("node-fetch").default
const { fideCountry, fideName, fideProfile, fideTitle, fideXpath, fideYob } = require("./helpers")

module.exports = async (req, res) => {
  const baseUrl = "https://ratings.fide.com/incl_search_l.php"

  const { name } = req.query
  if (!name || name.length < 3) {
    return res.send(404)
  }

  return await fetch(`${baseUrl}?search=${name}&search_bday_start=all&search_bday_end=all&simple=0`)
    .then((response) => response.text())
    .then((response) => {
      const players = []
      const xpath = fideXpath(response)

      // loop over every tr element
      let node = xpath.iterateNext()
      let i = 0
      while (node) {
        try {
          players.push({
            name: fideName(node, i),
            profile: fideProfile(node, i),
            federation: fideCountry(node, i),
            title: fideTitle(node, i),
            yob: fideYob(node, i),
          })
        } catch (err) {
          // console.log(err)
        }

        // next element
        i++
        node = xpath.iterateNext()
      }

      return res.send(players)
    })
}

const config = {
  locator: {},
  errorHandler: {
    warning: function() {},
    error: function() {},
    fatalError: function() {},
  },
}
