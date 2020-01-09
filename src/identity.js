import jwt from "jsonwebtoken"

const identity = {
  get token() {
    return localStorage.getItem("token")
  },
  get demo() {
    const token = localStorage.getItem("token")
    const { demo } = jwt.decode(token)
    return demo
  },
}

export { identity }
