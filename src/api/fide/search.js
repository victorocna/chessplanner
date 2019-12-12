const fetch = require("node-fetch")

module.exports = async (search) => {
  return await fetch(
    `https://ratings.fide.com/incl_search_l.php?search=${search}&search_bday_start=all&search_bday_end=all`
  )
    // .then(checkStatus)
    .then((response) => response.text())
    .then((response) => {
      // TODO: return a json with the players
      return response
    })
}
