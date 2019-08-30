export default (left, equals, right) => {
  const operands = ["<", ">", "<=", ">=", "!=", "=="]
  if (!operands.includes(equals)) {
    return false
  }

  try {
    // eslint-disable-next-line
    return Function(`"use strict";return "${left}" ${equals} "${right}"`)()
  } catch {
    return false
  }
}
