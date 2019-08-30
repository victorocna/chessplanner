import equation from "./equation"

it("returns true when strings match", () => {
  expect(equation("GM", "==", "GM")).toBeTruthy()
})

it("returns true when numbers match", () => {
  expect(equation(19, "==", 19)).toBeTruthy()
})

it("returns false for unsupported comparison operand", () => {
  expect(equation(19, "===", 19)).toBeFalsy()
})

it("returns true when comparing object property to a number", () => {
  const person = {
    traits: { height: 185 },
  }
  expect(equation(person.traits.height, "==", 185)).toBeTruthy()
})

it("returns true when comparing dates", () => {
  const person = {
    born: +new Date("2019-03-03"),
  }
  expect(equation(person.born, "<=", +new Date("2019-04-04"))).toBeTruthy()
})

it("returns true when comparing booleans", () => {
  const person = {
    isVaccinated: true,
  }
  expect(equation(person.isVaccinated, "==", true)).toBeTruthy()
})
