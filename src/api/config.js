const getIndexFrom = (instance) => {
  if (["hotels", "taxes", "tournaments", "participants", "settings"].includes(instance)) {
    return instance
  }
  return ""
}

export default { getIndexFrom }
