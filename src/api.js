import create from "./api/crud/create"
import update from "./api/crud/update"
import read from "./api/crud/read"
import readAll from "./api/crud/read-all"
import remove from "./api/crud/remove"
import confirm from "./api/identity/confirm"
import forgot from "./api/identity/forgot"
import reset from "./api/identity/reset"
import login from "./api/identity/login"
import signup from "./api/identity/signup"

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
