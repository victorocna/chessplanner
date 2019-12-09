/**
 * Returns human readable value after type coercion with provided datatype
 * 
 * @param {string} datatype
 * @param {*} value
 */
const humanReadable = (datatype, value) => {
  switch (datatype) {
    case "number":
      return +value
    case "array":
      return value.split(";")
    case "datetime":
      // TODO: locale based on settings
      return new Date(value).toLocaleDateString("ro-RO")
    default:
      return value
  }
}

export default humanReadable
