const xpath = require("xpath")
const dom = require("xmldom").DOMParser

module.exports = (response) => {
  if (!~response.indexOf("</table>")) {
    response += "</tbody></table>"
  }
  const doc = new dom(config).parseFromString(response)
  return xpath.evaluate("//table/tbody/tr", doc, null, xpath.XPathResult.ANY_TYPE, null)
}

const config = {
  locator: {},
  errorHandler: {
    warning: function() {},
    error: function() {},
    fatalError: function() {},
  },
}
