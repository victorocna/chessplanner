import deepObject from "./deepObject"

it("returns empty when empty object", () => {
  expect(deepObject({})).toMatchObject({})
})

it("returns the object when nothing is deep nested", () => {
  const obj = { foo: "bar" }
  expect(deepObject(obj)).toMatchObject(obj)
})

it("returns nested object when key has dot delimiters", () => {
  const initial = { "foo.baz": "bar" }
  const expected = { foo: { baz: "bar" } }
  expect(deepObject(initial)).toMatchObject(expected)
})
