const getId = (urlPath) => {
  return urlPath.match(/([^/]*)\/*$/)[0]
}

module.exports = getId
