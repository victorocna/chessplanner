import equation from "./equation"
import get from "lodash.get"

/**
 * Returns an object with the tax name as key and the tax value as its value
 */
export default (taxes, props) => {
  if (!taxes || !taxes[0]) {
    throw new Error("No taxes found")
  }

  const mandatoryKeys = ["name", "value", "priority"]
  if (!mandatoryKeys.every((key) => Object.keys(taxes[0]).includes(key))) {
    throw new Error("No mandatory keys found")
  }

  const priorities = {}
  const computedTaxes = {}

  for (let i = 0, len = taxes.length; i < len; i++) {
    const currentTax = taxes[i]
    const { name, value, priority, roomShare } = currentTax

    if (
      tournamentsMatch(currentTax, props) &&
      rulesMatch(currentTax, props) &&
      hasPriority(priority, priorities[name])
    ) {
      const contribution = get(props, "hotel.room.contribution")
      const capacity = get(props, "hotel.room.capacity")

      if (roomShare && payedNothing(contribution, capacity)) {
        continue
      }
      if (roomShare && payedInFull(contribution, capacity)) {
        computedTaxes[name] = Math.round(value * capacity)
        priorities[name] = priority
        continue
      }

      computedTaxes[name] = value
      priorities[name] = priority
    }
  }

  return computedTaxes
}

const tournamentsMatch = (currentTax, traits) => {
  if (typeof traits === "undefined" || typeof traits["tournaments"] === "undefined") {
    return true
  }

  const all_tournaments = []
  if (
    traits["tournaments"] &&
    traits["tournaments"]["main"] &&
    traits["tournaments"]["main"].length > 0
  ) {
    all_tournaments.push(traits["tournaments"]["main"])
  }
  if (
    traits["tournaments"] &&
    traits["tournaments"]["side"] &&
    traits["tournaments"]["side"].length > 0
  ) {
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

const hasPriority = (currentPriority, storedPriority) => {
  if (!storedPriority) {
    return true
  }

  return currentPriority >= storedPriority
}

const payedInFull = (contribution, capacity) => {
  return contribution === "full" && capacity > 1
}

const payedNothing = (contribution, capacity) => {
  return contribution === "empty" && capacity > 1
}
