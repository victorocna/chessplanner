const path = require("path")
const fs = require("fs")

// @see https://stackoverflow.com/a/5365577
const migrations = []
fs.readdirSync(path.join(__dirname, "../migrations")).forEach(function(file) {
  migrations.push(require(path.join(__dirname, "../migrations", file)))
})

// sort the migrations before running them
;(async function() {
  for (let migration of migrations.sort()) {
    try {
      await migration.up()
    } catch (err) {
      console.error(`Seeding "${migration.name}" did not finish successfully. Error: ${err}`)
    }
  }
})()
