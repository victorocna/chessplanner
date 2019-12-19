const fetch = require("node-fetch").default
const { fideCountry, fideName, fideProfile, fideTitle, fideXpath, fideYob } = require("./helpers")

module.exports = async (req, res) => {
  const baseUrl = "https://ratings.fide.com/incl_search_l.php"

  const { name } = req.query
  if (!name || name.length < 3) {
    return res.send(404)
  }

  const lastname = name.toLowerCase().split(" ")[0]
  const firstname = name.toLowerCase().split(" ")[1]

  return await fetch(
    `${baseUrl}?search=${lastname}&search_bday_start=all&search_bday_end=all&search_rating=all&search_title=all`
  )
    .then((response) => response.text())
    .then((response) => {
      const players = []
      const xpath = fideXpath(response)

      // loop over every tr element
      let node = xpath.iterateNext()
      let i = 0
      while (node) {
        try {
          const name = fideName(node, i)
          const _firstname = name.toLowerCase().split(" ")[1]

          // if firstname was provided and it starts with the node's firstname
          if (firstname && !_firstname.startsWith(firstname)) {
            i++
            node = xpath.iterateNext()
            continue
          }

          players.push({
            name,
            profile: fideProfile(node, i),
            federation: fideCountry(node, i),
            title: fideTitle(node, i),
            yob: fideYob(node, i),
          })
        } catch (err) {
          // eslint-disable-next-line
          console.log(err)
        }

        // next element
        i++
        node = xpath.iterateNext()
      }

      return res.send(players)
    })
}
