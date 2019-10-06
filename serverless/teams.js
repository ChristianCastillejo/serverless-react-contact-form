"use strict";

const postToTeams = body => {
  return {
    themeColor: "ffffff",
    summary: "Click to see datails.",
    title: `New contact form`,
    sections: [
      {
        facts: [
          {
            name: "",
            value: body.Message.Body.Text.Data
          }
        ]
      }
    ],
    potentialAction: [
      {
        "@type": "OpenUri",
        name: "AWS spending report",
        targets: [{ os: "default", uri: "asdsa" }]
      }
    ]
  };
};

module.exports = postToTeams;
