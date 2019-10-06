"use strict";

const myEmail = process.env.EMAIL;

function generateResponse(code, payload) {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(payload)
  };
}

function generateError(code, err) {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(err.message)
  };
}

function generateEmailParams(report) {
  // change in secrets.json: "prod" to deploy, "dev" to run locally.
  let body;
  if (process.env.ENV === "dev") {
    body = report;
  } else {
    body = JSON.parse(report);
  }
  return {
    Source: "AWS",
    Source: myEmail,
    Destination: { ToAddresses: [body.email] },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `
          Contact form
          
            Name: ${body.name}

            Email: ${body.email}

            Message: ${body.message}
            `
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `New contact form`
      }
    }
  };
}

module.exports = {
  generateEmailParams,
  generateError,
  generateResponse
};
