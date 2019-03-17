---
title: AWS lambda & gateway workflow
date: '2016-12-02 08:21:41'
modified: '2016-07-28 17:11:46'
tags:
  - web
published: true
---
# AWS lambda & gateway workflow

In my recent work with [Snyk](https://snyk.io) I've created a service that exists inside an AWS Lambda function and is accessed via the AWS Gateway API. Originally I pushed a single Lambda function and pointed the API to the latest version, but the right workflow is to have a production tagged function and then dev (and possibly staging).

<!--more-->

Prerequisite knowledge for this post: how to create a lambda function and how to navigate the AWS console.

## How it all works together

There will be a single lambda function which will use aliases to tag which function is production and which is dev.

There will be a single gateway API endpoint that will be configured to point to a lambda function but will also include an `alias` variable (there's some messing around with permissions to get this right, so do read on).

Finally, there will be two gateway API stages, one for prod and one for dev, each will use stage variables that will determine which lambda function version will run.

## Configuring the lambda

Once you've pushed your lambda function (mine is called "pr" in this post), if you haven't, you need to create two aliases, one called `prod` and one called `dev`. In the case below, the latest release is currently production (release 35) and the one before was the development build (34).

![Lambda aliases](/images/aws-lambda-alias.png)

In my particular case, I'm using [@smallwins/lambda](https://github.com/smallwins/lambda/) and for development I'm deploying with a `dev` alias. The `prod` alias is only applied from inside of a travis build on master, which will run the following command when `after_success` fires:

```bash
$ npm run deploy lib/pr prod
```

During development, I will manually deploy using:

```bash
$ npm run deploy lib/pr dev
```

Next, I have to create a single Gateway that points to this lambda function.

## Configuring the gateway with variables

Firstly, create a new API, then from the resources actions, create a method. In my case, I'm using a POST. The "integration type" is set to "Lambda" and give the name of the lambda that I'm using. *Tip* I've found that I can't use variables at this point (you might have better luck), so I put the name of my lambda function (`pr`) and hit "save".

Once that's set up, we need to change the "integration type" to make use of the variables (that we'll introduce in the stages). Edit the lambda function name and append `:${stageVariables.alias}`. So in my case, with the function name being `pr`, then lambda function name becomes: `pr:${stageVariables.alias}`. You'll be prompted with something like this:

![AWS gateway permission request](/images/aws-gateway-var-permission.png)

**Here's the important bit:** the command that you're prompted to run, you need to swap *out* the `${stageVariables.alias}` value for the aliases you intend to use. So in my case, I'll run the command twice, once for `prod` and once for `dev`.

The gateway should have a single URL, but next we need to make the stages which will invoke the correct lambda function.

## Creating the stages

From the resource, click the "actions" dropdown button and select to "Deploy API". You'll be able to create a new stage. I've called the first one `prod`.

From the newly created stage, then select the "Stage Variables" tab. Create a new staging variable. This will match up to the `{$stageVariables.alias}` that we defined earlier. I've created a new variable called `alias` and set it to `prod`:

![AWS staging variables](/images/aws-stage.png)

Now that the stage is ready, the API is accessible. When I run a `curl` against the URL in the stage, the endpoint that ends in `/prod` hits my production lambda, and `/dev` will hit my development lambda.
