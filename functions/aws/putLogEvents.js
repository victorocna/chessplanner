import fetch from "node-fetch"
import aws4 from "aws4"
import getSequenceToken from "./getSequenceToken"
import { oneLine } from "../utils/helpers"

export default async function putLogEvents(message, logGroupName = "masterplanner") {
  const now = new Date()
  const sequenceToken = await getSequenceToken()

  const body = {
    logEvents: [{ message: oneLine(message), timestamp: +now }],
    logGroupName: logGroupName,
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
    body: JSON.stringify(body),
    headers: awsSigned.headers,
  })
}