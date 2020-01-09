import jwt from "jsonwebtoken"

const identity = {
  get token() {
    return localStorage.getItem("token")
  },
  get demo() {
    const token = localStorage.getItem("token")
    if (token) {
      const { demo } = jwt.decode(token)
      return demo
    }
    return false
  },
}

export { identity }
