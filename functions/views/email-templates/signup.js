module.exports = (origin, hash) => {
  return `<p><b>Thank you for registering!</b></p>
  <p>Please confirm your email email address by clicking on the link below.</p>
  <p><a href="${origin}/#/confirm/${hash}" target="_blank" rel="noopener noreferrer"
  >${origin}/confirm/${hash}</a></p>
  <p>Have a wonderful day</p>
  `
}
