# Readme

## Intro
This repo belongs to [this Medium.com post](https://medium.com/@ChristianCastillejo/how-to-build-a-serverless-react-contact-form-integrating-email-slack-ms-teams-and-creating-7fc8b0223f4b)
to build a Serverless-React contact form integrating email, Slack, MS Teams and creating Trello tickets.

You can follow the post to make you oun contact form. :)

## Technologies we are using:

* AWS Lambda (a compute service that lets users run code without provisioning or managing servers).
* Serverless (a tool that allows users to build & deploy functions using cloud providers such as AWS).
* Amazon Simple Email Service(a cloud-based email sending service by Amazon).
* Trello API
* Teams API
* Slack API

## Secrets

You need to rename `secrets.sample.json` to `secrets.json`
You can find the needed keys by following the posts in the previous section.

## Locally testing and debugging

1. In `secrets.json` edit `"ENV":"dev"`.
2. Go to `/serverless/` folder.
3. Run `yarn`.
4. Run `serverless invoke local --function send --data '{"name": "Sarah", "email": "hey@sarah.com", "message: "I like your websites and I would love you to build mine! :)" }'` .
## Deploying to AWS

1. Run `serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx` with your AWS credentials.
2. In `secrets.json` edit `"ENV":"prod"`.
3. Go to `/serverless/` folder.
3. Run `yarn`.
4. Run `serverless deploy`
5. In line 27 in `/client/App.js` replace the URL with the new generated endpoint.