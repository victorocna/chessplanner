const aws4 = require("aws4")
const fetch = require("node-fetch").default

module.exports = async () => {
  const body = { logGroupName: process.env.AWS_LOG_GROUP_NAME }

  const awsSigned = aws4.sign(
    {
      service: "logs",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": "Logs_20140328.DescribeLogStreams",
      },
    },
    {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  )

  return await fetch("https://logs.us-east-1.amazonaws.com", {
    method: "POST",
    body: JSON.stringify(body),
    headers: awsSigned.headers,
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      const logStream = json.logStreams.filter((item) => {
        return item.logStreamName === process.env.AWS_LOG_STREAM_NAME
      })
      return logStream[0]["uploadSequenceToken"]
    })
}

const checkStatus = (response) => {
  if (!response.ok) {
    // res.status >= 200 && res.status < 300
    throw Error(response.statusText)
  }
  return response
}
