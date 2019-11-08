import create from "./api/crud/create"
import update from "./api/crud/update"
import read from "./api/crud/read"
import readAll from "./api/crud/read-all"
import remove from "./api/crud/remove"
import confirm from "./api/identity/confirm"
import signin from "./api/identity/login"
import signup from "./api/identity/signup"

export default {
  create,
  read,
  readAll,
  update,
  remove,
  signin,
  signup,
  confirm,
}
