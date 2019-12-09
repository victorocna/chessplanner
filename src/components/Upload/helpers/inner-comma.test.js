import innerComma from "./inner-comma"

it("returns false when nothing matches", () => {
  const text = "lorem ipsum"
  const result = innerComma.has(text)
  expect(result).toBeFalsy()
})

it("returns true when something matches", () => {
  const text = '"lorem,ipsum"'
  const result = innerComma.has(text)
  expect(result).toBeTruthy()
})

it("returns the input when nothing matches", () => {
  const text = "lorem ipsum"
  const result = innerComma.replaceWith(text)
  expect(result).toBe("lorem ipsum")
})

it("returns formatted input when something matches", () => {
  const text = '"lorem,ipsum"'
  const result = innerComma.replaceWith(text)
  expect(result).toBe("lorem;ipsum")
})

it("returns formatted input when multiple matches occur", () => {
  const text = 'AAA,"BBB,CCC",DDD,"EEE,FFF"'
  const result = innerComma.replaceWith(text)
  expect(result).toBe("AAA,BBB;CCC,DDD,EEE;FFF")
})
