const { q, client } = require("../connect")
const { isValidParticipant } = require("../utils")

module.exports = async (req, res) => {
  const { key } = req.params
  if (!key) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  // validate the request; returns only the first validation error
  try {
    isValidParticipant(req.body)
  } catch ({ message }) {
    return res.status(400).send(message)
  }

  // construct the fauna query
  return client
    .query(
      q.Create(q.Ref("collections/participants"), {
        // associate every instance created with the user using the "key"
        data: { ...req.body, key, createdAt: +Date.now(), confirmed: false },
      })
    )
    .then(() => {
      return res.status(200).send("Ok")
    })
    .catch(({ name }) => {
      return res.status(500).send(`Error! ${name}`)
    })
}
