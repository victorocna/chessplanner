const path = require("path")
const fs = require("fs")

// @see https://stackoverflow.com/a/5365577
const seeds = []
fs.readdirSync(path.join(__dirname, "../seeds")).forEach(function(file) {
  seeds.push(require(path.join(__dirname, "../seeds", file)))
})

// sort the seeds before running them
;(async function() {
  for (let seed of seeds.sort()) {
    try {
      await seed.run()
    } catch (err) {
      console.error(`Seeding "${seed.name}" did not finish successfully. Error: ${err}`)
    }
  }
})()
