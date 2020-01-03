const assert = require("assert")
const search = require("./search")

it("returns an empty object when no players exist", async () => {
  const response = await search("shazam")
  assert.equal(response.length, 0)
}).timeout(5000)

it("returns one result when one players exists", async () => {
  const response = await search("ocnarescu")
  assert.equal(response.length, 1)
}).timeout(5000)

it("returns more than one result when more players exist", async () => {
  const response = await search("straarup")
  assert.equal(response.length, 2)
}).timeout(5000)

it("returns the correct FIDE profile key", async () => {
  const response = await search("ocnarescu")
  const { profile } = response[0]

  assert.equal(profile, "1213202")
}).timeout(5000)
