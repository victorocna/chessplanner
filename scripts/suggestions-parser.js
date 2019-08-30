const fs = require("fs")
const path = require("path")

const filepath = path.resolve(__dirname, "../public/suggestions.json")
const file = fs.readFile(filepath, "utf8", (err, contents) => {
  const suggestions = JSON.parse(contents)

  for (let i in suggestions) {
    for (let j = 0; j < suggestions[i].length; j++) {
      suggestions[i][j]["name"] = suggestions[i][j]["name"].replace(",", "")
    }
  }

  const newfile = path.resolve(__dirname, `../public/suggestions-${+new Date()}.json`)
  fs.writeFile(newfile, JSON.stringify(suggestions), (err, contents) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    console.log("success")
  })
})