const path = require("path")
const fs = require("fs")

// @see https://stackoverflow.com/a/5365577
const migrations = []
fs.readdirSync(path.join(__dirname, "../migrations")).forEach(function(file) {
  migrations.push(require(path.join(__dirname, "../migrations", file)))
})

// reverse the migrations before destroying the tables
;(async function() {
  for (let migration of migrations.sort().reverse()) {
    try {
      await migration.down()
    } catch (err) {
      console.error(`Seeding "${migration.name}" did not finish successfully. Error: ${err}`)
    }
  }
})()
