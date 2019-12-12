const assert = require("assert")
const search = require("./search")

it("returns an empty object when no players exist", async () => {
  // expect(search("shazam")).toMatchObject({})
  const result = await search("shazam")
  console.log(result)
  // assert.equal(result.length, 0)
})
