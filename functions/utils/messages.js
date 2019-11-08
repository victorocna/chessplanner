const prettyErrors = require("./pretty-errors")

const successUpdate = (props) => {
  const { instance, id, user, response } = props
  const backup = Buffer.from(JSON.stringify(response)).toString("base64")

  return `Success! Updated ${instance} instance with id ${id}. Backup: ${backup}; User: ${user.email}`
}

const errorUpdate = (props) => {
  const { instance, id, user, error } = props
  const errMessage = prettyErrors(error)

  return `Error! Cannot update ${instance} with id ${id}. ErrMessage: ${errMessage}; User: ${user.email}`
}

const successCreate = (props) => {
  const { instance, user, response } = props
  const backup = Buffer.from(JSON.stringify(response)).toString("base64")

  return `Success! Created a new ${instance} instance. Backup: ${backup}; User: ${user.email}`
}

const errorCreate = (props) => {
  const { instance, user, error } = props
  const errMessage = prettyErrors(error)

  return `Error! Cannot create a new ${instance} instance. ErrMessage: ${errMessage}; User: ${user.email}`
}

const successDelete = (props) => {
  const { instance, id, user, response } = props
  const backup = Buffer.from(JSON.stringify(response)).toString("base64")

  return `Success! Deleted ${instance} instance with id ${id}. Backup: ${backup}; User: ${user.email}`
}

const errorDelete = (props) => {
  const { instance, id, user, error } = props
  const errMessage = prettyErrors(error)

  return `Error! Cannot delete ${instance} with id ${id}. ErrMessage: ${errMessage}; User: ${user.email}`
}

const errorRead = (props) => {
  const { instance, id, user, error } = props
  const errMessage = prettyErrors(error)

  return `Error! Cannot read ${instance} with id ${id}. ErrMessage: ${errMessage}; User: ${user.email}`
}

const errorReadAll = (props) => {
  const { index, user, error } = props
  const errMessage = prettyErrors(error)

  return `Error! Cannot read ${index}. ErrMessage: ${errMessage}; User: ${user.email}`
}

module.exports = {
  successUpdate,
  errorUpdate,
  successCreate,
  errorCreate,
  successDelete,
  errorDelete,
  errorRead,
  errorReadAll,
}
