import create from "./api/crud/create"
import update from "./api/crud/update"
import read from "./api/crud/read"
import readAll from "./api/crud/read-all"
import remove from "./api/crud/remove"
import identity from "./api/identity"

const confirm = (data) => identity("confirm", data)
const forgot = (data) => identity("forgot", data)
const login = (data) => identity("login", data)
const reset = (data) => identity("reset", data)
const signup = (data) => identity("signup", data)

export default {
  create,
  read,
  readAll,
  update,
  remove,
  login,
  signup,
  confirm,
  forgot,
  reset,
}
