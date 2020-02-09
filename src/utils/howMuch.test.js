import howMuch from "./howMuch"

it("throws an error when called without any arguments", function() {
  expect(() => {
    howMuch()
  }).toThrow()
})

it("throws an error when called without mandatory parameters", function() {
  const taxes = [
    {
      name: "Tax1",
      priority: 10,
    },
  ]

  expect(() => {
    howMuch(taxes)
  }).toThrow()
})

it("returns the tax received when no rules exist", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 50,
      priority: 10,
    },
  ]

  const computedTaxes = howMuch(taxes)
  const name = getTaxByName(computedTaxes, "Tax1")
  expect(computedTaxes[name]).toBe(50)
})

it("returns the the tax with highest priority from two taxes with the same name", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 70,
      priority: 40,
    },
    {
      name: "Tax1",
      value: 60,
      priority: 20,
    },
  ]

  const computedTaxes = howMuch(taxes)
  const name = getTaxByName(computedTaxes, "Tax1")
  expect(computedTaxes[name]).toBe(70)
})

it("returns an empty object for taxes that do not match tournaments", function() {
  const taxes = [
    {
      name: "Tax1",
      tournament: "A",
      value: 70,
      priority: 40,
    },
    {
      name: "Tax1",
      tournament: "B",
      value: 60,
      priority: 20,
    },
  ]

  const traits = {
    tournaments: ["C"],
  }

  const result = howMuch(taxes, traits)
  expect(result["Tax1"]).toBeUndefined()
})

it("returns the tax when rules match (GM == GM)", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 70,
      priority: 40,
      rules: [
        {
          key: "title",
          eq: "==",
          val: "GM",
        },
      ],
    },
  ]

  const props = {
    title: "GM",
  }

  const computedTaxes = howMuch(taxes, props)
  const name = getTaxByName(computedTaxes, "Tax1")
  expect(computedTaxes[name]).toBe(70)
})

it("returns an empty object when rules do not match (GM != IM)", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 70,
      priority: 40,
      rules: [
        {
          key: "title",
          eq: "==",
          val: "GM",
        },
      ],
    },
  ]

  const traits = {
    title: "IM",
  }

  const result = howMuch(taxes, traits)
  expect(result["Tax1"]).toBeUndefined()
})

it("returns the tax when no traits are provided", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 70,
      priority: 40,
      rules: [
        {
          key: "title",
          eq: "==",
          val: "GM",
        },
      ],
    },
  ]

  const computedTaxes = howMuch(taxes)
  const name = getTaxByName(computedTaxes, "Tax1")
  expect(computedTaxes[name]).toBe(70)
})

it("returns the highest priority tax when both taxes match (prio1 > prio2)", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 13,
      priority: 40,
      rules: [
        {
          key: "title",
          eq: "==",
          val: "GM",
        },
      ],
    },
    {
      name: "Tax1",
      value: 12,
      priority: 20,
    },
  ]

  const props = {
    title: "GM",
  }

  const computedTaxes = howMuch(taxes, props)
  const name = getTaxByName(computedTaxes, "Tax1")
  expect(computedTaxes[name]).toBe(13)
})

it("returns the highest priority tax when both taxes match (prio2 > prio1)", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 13,
      priority: 20,
      rules: [
        {
          key: "title",
          eq: "==",
          val: "GM",
        },
      ],
    },
    {
      name: "Tax1",
      value: 12,
      priority: 40,
    },
  ]

  const props = {
    title: "GM",
  }

  const computedTaxes = howMuch(taxes, props)
  const name = getTaxByName(computedTaxes, "Tax1")
  expect(computedTaxes[name]).toBe(12)
})

it("returns an empty object when rules match, but tournaments don't", () => {
  const taxes = [
    {
      name: "Tax1",
      tournament: "D",
      value: 50,
      priority: 50,
      rules: [
        {
          key: "age",
          eq: "<=",
          val: 20,
        },
      ],
    },
  ]

  const traits = {
    name: "Nae Catavencu Piticot",
    age: 18,
    tournaments: ["A", "E"],
  }

  const result = howMuch(taxes, traits)
  expect(result["Tax1"]).toBeUndefined()
})

it("returns tax multiplied with capacity when the participant pays the room in full", function() {
  const taxes = [
    {
      name: "Tax1",
      tournament: "*",
      value: 70,
      priority: 10,
      roomShare: true,
    },
  ]

  const props = {
    hotel: {
      room: {
        capacity: 2,
        contribution: "full",
      },
    },
  }

  const computedTaxes = howMuch(taxes, props)
  const name = getTaxByName(computedTaxes, "Tax1")
  expect(computedTaxes[name]).toBe(140)
})

const getTaxByName = (taxes, name) => {
  return taxes && Object.keys(taxes).filter((tax) => tax === name)[0]
}
