import prepareUpload from "./prepare-upload"

it("returns values paired with basic (string) headers", () => {
  // prettier-ignore
  const lines = [
    "lorem,ipsum",
    "dolor,sin",
    "amet,exsult",
  ]
  // prettier-ignore
  const headers = [
    { datatype: "string", key: "name" },
    { datatype: "string", key: "year" },
    { datatype: "string", key: "club" },
  ]
  const result = prepareUpload(lines, headers)
  const expected = [
    { name: "lorem", year: "ipsum" },
    { name: "dolor", year: "sin" },
    { name: "amet", year: "exsult" },
  ]
  expect(result).toStrictEqual(expected)
})

it("returns values paired with single string header", () => {
  // prettier-ignore
  const lines = [
    "lorem,ipsum",
    "dolor,sin",
    "amet,exsult",
  ]
  // prettier-ignore
  const headers = [
    { datatype: "string", key: "name" },
  ]
  const result = prepareUpload(lines, headers)
  // prettier-ignore
  const expected = [
    { name: "lorem" },
    { name: "dolor" },
    { name: "amet" },
  ]
  expect(result).toStrictEqual(expected)
})

it("returns values paired with string and array headers", () => {
  // prettier-ignore
  const lines = [
    "lorem,ipsum",
    "dolor,sin",
    "amet,exsult",
  ]
  // prettier-ignore
  const headers = [
    { datatype: "string", key: "name" },
    { datatype: "array", key: "tournaments" },
  ]
  const result = prepareUpload(lines, headers)
  const expected = [
    { name: "lorem", tournaments: ["ipsum"] },
    { name: "dolor", tournaments: ["sin"] },
    { name: "amet", tournaments: ["exsult"] },
  ]
  expect(result).toStrictEqual(expected)
})

it("returns values paired with string and array headers with internal split by semicolon", () => {
  // prettier-ignore
  const lines = [
    "Tour1",
    "Tour2",
    "Tour3;Tour4",
  ]
  // prettier-ignore
  const headers = [
    { datatype: "array", key: "tournaments" },
  ]
  const result = prepareUpload(lines, headers)
  const expected = [
    { tournaments: ["Tour1"] },
    { tournaments: ["Tour2"] },
    { tournaments: ["Tour3", "Tour4"] },
  ]
  expect(result).toStrictEqual(expected)
})

it("returns values paired with string and array headers with internal split by comma", () => {
  // prettier-ignore
  const lines = [
    "Tour1",
    "Tour2",
    '"Tour3,Tour4"',
  ]
  // prettier-ignore
  const headers = [
    { datatype: "array", key: "tournaments" },
  ]
  const result = prepareUpload(lines, headers)
  const expected = [
    { tournaments: ["Tour1"] },
    { tournaments: ["Tour2"] },
    { tournaments: ["Tour3", "Tour4"] },
  ]
  expect(result).toStrictEqual(expected)
})

it("returns values paired with datetime headers", () => {
  // prettier-ignore
  const lines = [
    "2019-01-02",
    "2019-01-03",
    "2019-01-04",
  ]
  // prettier-ignore
  const headers = [
    { datatype: "datetime", key: "createdAt" },
  ]
  const result = prepareUpload(lines, headers)
  const expected = [
    { createdAt: 1546387200000 },
    { createdAt: 1546473600000 },
    { createdAt: 1546560000000 },
  ]
  expect(result).toStrictEqual(expected)
})
