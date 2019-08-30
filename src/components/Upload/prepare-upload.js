import innerComma from "./inner-comma"

/**
 * Prepare upload by merging given headers with lines from a CSV file
 */
export default (lines, headers) => {
  return lines.filter(notEmpty).map((line) => {
    const item = {}

    if (innerComma.has(line)) {
      line = innerComma.replaceWith(line)
    }

    const values = line.replace("\r", "").split(",")
    const length = Math.min(values.length, headers.length)

    for (let i = 0; i < length; i++) {
      item[headers[i].key] = basedOnDatatype(headers[i].datatype, values[i])
    }
    return item
  })
}

/**
 * Check if param is not empty
 * @param {*} item
 */
const notEmpty = (item) => !!item

/**
 * Returns value after type coercion with provided datatype
 * @param {string} datatype
 * @param {*} value
 */
const basedOnDatatype = (datatype, value) => {
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
