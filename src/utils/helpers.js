const truncate = (text, length = 50, ending = "...") => {
  if (typeof text !== "string" || text.length <= length) {
    return text
  }
  return text.substring(0, length) + ending
}

export { truncate }
