"use strict";

const https = require("https");
const querystring = require("querystring");
const trelloApiKey = process.env.TRELLO_API_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const trelloListId = process.env.TRELLO_LIST_ID;

function postToTrello(emailParams, context) {
  var payloadStr = {
    idList: trelloListId,
    name: `New Contact form`,
    due: null,
    desc: emailParams.Message.Body.Text.Data,
    urlSource: null
  };

  var postData = querystring.stringify(payloadStr);
  var options = {
    hostname: "api.trello.com",
    port: 443,
    path: "/1/cards?key=" + trelloApiKey + "&token=" + trelloToken,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length
    }
  };

  var postReq = https.request(options);
  postReq.write(postData);
  postReq.end();
}

module.exports = postToTrello;
