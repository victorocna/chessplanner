import equation from "./equation"

/**
 * Compute how much do i owe based on some tax rules & a person's traits
 * Trait = a distinguishing quality or characteristic, typically one belonging to a person.
 */
export default (taxes, traits) => {
  if (!taxes || !taxes[0]) {
    throw new Error("No taxes found")
  }

  const mandatoryKeys = ["name", "value", "priority"]
  if (!mandatoryKeys.every((key) => Object.keys(taxes[0]).includes(key))) {
    throw new Error("No mandatory keys found")
  }

  let priority = 0
  let grouped = {}

  for (let i = 0, len = taxes.length; i < len; i++) {
    let currentTax = taxes[i]
    let name = currentTax.name

    if (
      tournamentsMatch(currentTax, traits) &&
      rulesMatch(currentTax, traits) &&
      currentTax["priority"] >= priority
    ) {
      grouped[name] = currentTax
      priority = currentTax["priority"]
    }
  }

  return grouped
}

const tournamentsMatch = (currentTax, traits) => {
  if (typeof traits === "undefined" || typeof traits["tournaments"] === "undefined") {
    return true
  }

  const all_tournaments = []
  if (traits["tournaments"] && traits["tournaments"]["main"].length > 0) {
    all_tournaments.push(traits["tournaments"]["main"])
  }
  if (traits["tournaments"] && traits["tournaments"]["side"].length > 0) {
    all_tournaments.push(...traits["tournaments"]["side"])
  }

  if (all_tournaments.length > 0 && currentTax["tournament"] === "*") {
    return true // * = Tax for every tournament
  }

  return all_tournaments.includes(currentTax["tournament"])
}

const rulesMatch = (currentTax, traits) => {
  if (typeof traits === "undefined" || typeof currentTax["rules"] === "undefined") {
    return true
  }
  let passedRules = currentTax["rules"].filter((rule) => {
    if (rule["key"] === "undefined" || rule["eq"] === "undefined" || rule["val"] === "undefined") {
      return false
    }
    if (typeof traits[rule["key"]] === "undefined") {
      return false
    }
    return equation(traits[rule["key"]], rule["eq"], rule["val"])
  })
  return passedRules.length === currentTax["rules"].length
}
