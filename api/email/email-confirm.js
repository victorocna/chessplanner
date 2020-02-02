const { sendEmail } = require("../utils")
const { signup } = require("../views/email-templates")

module.exports = async (req, res) => {
  const { username, hash, origin } = req.body
  if (!username || !hash) {
    return res.status(400).send("Bad Request! Missing required fields")
  }

  try {
    await sendEmail({
      from: "support@chesscoders.com",
      to: username,
      subject: "Confirm your email address",
      html: signup(origin, hash),
    })

    return res.status(200).send("Ok")
  } catch (error) {
    return res.status(500).send("Error! " + error.name || "")
  }
}
