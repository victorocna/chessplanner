const deepObject = (obj) => {
  const keys = Object.keys(obj) // ["foo.baz"]
  let objReturn = {}

  for (let i = 0; i < keys.length; i++) {
    let objPointer = objReturn
    const q = keys[i].split(".") // ["foo", "baz"]
    for (let j = 0; j < q.length; j++) {
      const currentKey = q[j]
      if (j === q.length - 1) {
        objPointer[currentKey] = obj[keys[i]]
      }
      if (!objPointer.hasOwnProperty(currentKey)) {
        objPointer[currentKey] = {}
      }
      objPointer = objPointer[currentKey]
    }
  }
  return objReturn
}

export default deepObject
