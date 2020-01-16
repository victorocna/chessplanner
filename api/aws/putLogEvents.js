const aws4 = require("aws4")
const fetch = require("node-fetch").default
const getSequenceToken = require("./getSequenceToken")

module.exports = async (...messages) => {
  const now = new Date()
  const sequenceToken = await getSequenceToken()

  const body = {
    logEvents: [{ message: messages.join(" "), timestamp: +now }],
    logGroupName: process.env.REACT_APP_AWS_LOG_GROUP_NAME,
    logStreamName: process.env.REACT_APP_AWS_LOG_STREAM_NAME,
    sequenceToken: sequenceToken,
  }

  const awsSigned = aws4.sign(
    {
      service: "logs",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": "Logs_20140328.PutLogEvents",
      },
    },
    {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    }
  )

  return await fetch("https://logs.us-east-1.amazonaws.com", {
    method: "POST",
    body: Buffer.from(JSON.stringify(body)).toString("base64"),
    headers: awsSigned.headers,
  })
}
