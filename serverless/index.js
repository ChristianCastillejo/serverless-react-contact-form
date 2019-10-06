const aws = require("aws-sdk");
const ses = new aws.SES();
const https = require("https");
const request = require("request");
const postToTrello = require("./trello");
const emailFunctions = require("./email");
const postToTeams = require("./teams");

module.exports.send = async (event, context, callback) => {
  try {
    let emailParams;
    // change in secrets.json: "prod" to deploy, "dev" to run locally.
    if (process.env.ENV === "dev") {
      emailParams = emailFunctions.generateEmailParams(event);
    } else {
      emailParams = emailFunctions.generateEmailParams(event.body);
    }
    const messagePayload = JSON.stringify({
      text: `${emailParams.Message.Body.Text.Data}`
    });

    //Slack
    const options = {
      hostname: "hooks.slack.com",
      method: "POST",
      path: process.env.SLACK_PATH
    };
    const req = https.request(options, res =>
      res.on("data", () => callback(null, "Contact form sent! :)"))
    );
    req.on("error", error => callback(JSON.stringify(error)));
    req.write(messagePayload);
    req.end();

    //Trello
    postToTrello(emailParams, context);

    // Teams
    let teamsPayload = postToTeams(emailParams);
    let channelWebhookURL = null || process.env.TEAMS_KEY;
    if (channelWebhookURL !== "") {
      if (teamsPayload) {
          request.post(channelWebhookURL, { json: teamsPayload }, function(
          error,
          response,
          body
        ) {
          if (!error && response.statusCode == 200) {
            console.log("Success Teams!: ", body);
          } else {
            console.log(error, body);
          }
        });
      }
    }

    // Email
    const data = await ses.sendEmail(emailParams).promise();

    return emailFunctions.generateResponse(200, emailParams);
  } catch (err) {
    return emailFunctions.generateError(500, err);
  }
};
