import { humanToDb, innerComma } from "./"

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
      item[headers[i].key] = humanToDb(headers[i].datatype, values[i])
    }
    return item
  })
}

/**
 * Check if param is not empty
 * @param {*} item
 */
const notEmpty = (item) => !!item
