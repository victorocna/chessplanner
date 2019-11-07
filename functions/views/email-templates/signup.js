module.exports = (req, hash) => {
  return `<p><b>Thank you for registering!</b></p>
  <p>Please confirm your email email address by clicking on the link below.</p>
  <p><a href="${req.protocol || "http"}://${req.headers.host}/confirm/${hash}" target="_blank" rel="noopener noreferrer"
  >${req.protocol || "http"}://${req.headers.host}/confirm/${hash}</a></p>
  <p>Have a wonderful day</p>
  `
}
