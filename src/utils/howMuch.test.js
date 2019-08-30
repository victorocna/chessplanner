import howMuch from "./howMuch"

it("throws error when called without any arguments", function() {
  expect(() => {
    howMuch()
  }).toThrow()
})

it("throws error when called without mandatory parameters", function() {
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

it("returns the tax object received when no rules exist", function() {
  const taxes = [
    {
      name: "Tax1",
      value: 50,
      priority: 10,
    },
  ]

  const result = howMuch(taxes)
  expect(result["Tax1"]["value"]).toBe(50)
})

it("returns the highest priority between two taxes with the same name", function() {
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

  const result = howMuch(taxes)
  expect(result["Tax1"]["value"]).toBe(70)
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

  const traits = {
    title: "GM",
  }

  const result = howMuch(taxes, traits)
  expect(result["Tax1"]["value"]).toBe(70)
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

  const result = howMuch(taxes)
  expect(result["Tax1"]["value"]).toBe(70)
})

it("returns the highest priority tax when both taxes match (one with rules, one without)", function() {
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

  const traits = {
    title: "GM",
  }

  const result = howMuch(taxes, traits)
  expect(result["Tax1"]["value"]).toBe(13)
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
