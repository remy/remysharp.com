# How to write a Github integration

I've been using [Github](https://github.com/remy) for many years now and similarly tools like [Travis](https://travis-ci.org/). The commit status integrations always intrigued me. I kept seeing little things that I'd love to add a little Github integration. Recently I took a run at how they work, and it's actually quite simple, but I hadn't seen it written down. So this is a guide to making your own Github integration.

<!--more-->

## What is a Github integration?

In this particular example, I'm talking about the services that (tend to) check your commits and show a visual cue on pull requests as to whether the repo owner should merge or not. This particular type of integration is a call a "commit status".

![When a commit is pushed to Github, it's checked against a number of services, and this can indicate whether the commit is good or bad.](/images/semantic-release-gh-integration.jpg)

## How a commit status integration works

There's two main parts to creating these integrations:

1. Listening for events from Github, via a webhook
2. Calling Github's API with a commit status message

Then, in-between step 1 and 2, you can run whatever code you want to decide *what* message is sent back to Github.

Other tasks include:

1. Creating a personal access token
2. Releasing the code to a server (I'm going to use Heroku for a quick example)
3. Configuring a Github repo to send webhooks to our service.

I'll start by explaining the code required, then show you how to get the service up and running.

## Setting up the webhook

I'm writing this using JavaScript and node. You can use whatever flavour language you like, the process is pretty much the same (I would assume!).

There's two node libraries I'm relying on here: [githubhook@1.6.1](https://www.npmjs.com/package/githubhook) and [github@0.2.4](https://www.npmjs.com/package/github).

For these personal projects, I'm using a [personal token](https://github.com/settings/tokens). I'll come on to how to run and deploy in a moment.

```js
const githubhook = require('githubhook');
const hook = githubhook({
  port: process.env.PORT || 8000,
  path: '/',
  secret: process.env.SECRET,
});

hook.on('pull_request', handlePR);
hook.listen();

function handlePR(repo, ref, data) {
  // this is where we'll post the git commit status message
  console.log('got webhook on %s', repo);
}
```

The `process.env.PORT` is typically set in the live environments like Heroku (which I'll use to try this service out). The `process.env.SECRET` will need to match the secret value we give the Github webhook later on in this guide.

```js
// configure the github API
const github = new GitHubApi({
  version: '3.0.0', // latest api
  debug: false, // set to true to see requests
  protocol: 'https',
  host: 'api.github.com',
  timeout: 5000,
  headers: {
    'user-agent': '<your sweet integration>', // required
  },
});

// now authenticate
github.authenticate({
  type: 'oauth',
  // I'm using a personal access token
  token: process.env.TOKEN,
});
```
