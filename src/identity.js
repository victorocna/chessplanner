const identity = {
  get token() {
    return localStorage.getItem("token")
  },
}

export { identity }
