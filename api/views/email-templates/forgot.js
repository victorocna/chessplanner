module.exports = (origin, hash) => {
  return `<p><b>You have requested a password reset for your account.</b></p>
  <p>Please complete this process by clicking on the link below.</p>
  <p><a href="${origin}/#/reset/${hash}" target="_blank" rel="noopener noreferrer"
  >${origin}/#/reset/${hash}</a></p>
  <p>Have a wonderful day</p>
  `
}
