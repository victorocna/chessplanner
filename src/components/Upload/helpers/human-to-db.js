/**
 * Returns value after type coercion with provided datatype
 *
 * @param {string} datatype
 * @param {*} value
 */
const humanToDb = (datatype, value) => {
  switch (datatype) {
    case "number":
      return +value
    case "array":
      return value.split(";")
    case "date":
      return new Date(value)
    case "datetime":
      return +new Date(value)
    default:
      return value
  }
}

export default humanToDb
