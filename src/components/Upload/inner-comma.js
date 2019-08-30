const innerComma = {
  regex: /"[^"]+,[^"]+"/gi,
  has: (string) => {
    return innerComma.regex.test(string)
  },
  replaceWith: (string, delimiter = ";") => {
    let m
    while ((m = /"[^"]+,[^"]+"/gi.exec(string)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === innerComma.regex.lastIndex) {
        innerComma.regex.lastIndex++
      }

      // eslint-disable-next-line
      m.forEach((match) => {
        const formatted = match.replace(/"/gi, "").replace(",", delimiter)
        string = string.replace(match, formatted)
      })
    }
    return string
  },
}

export default innerComma
