---
title: How to write a Github integration
date: '2016-05-29 13:03:53'
modified: '2017-12-12 14:16:08'
complete: false
inprogress: true
tags:
  - web
draft: true
---
# How to write a Github integration

I've been using [Github](https://github.com/remy) for many years now and
similarly tools like [Travis](https://travis-ci.org/). The commit status
integrations always intrigued me. I kept seeing little things that I'd love to
add a little Github integration. Recently I took a run at how they work, and
it's actually relatively simple once I understood all the moving parts, but I
hadn't seen it written down. So this is a guide to making your own Github
integration.

<!--more-->

## What is a Github integration?

In this particular example, I'm talking about the services that (tend to) check
your individual commits and show a visual cue on pull requests as to whether the
repo owner should merge or not. This particular type of integration is a call a
"commit status".

![When a commit is pushed to Github, it's checked against a number of services, and this can indicate whether the commit is good or bad.](/images/semantic-release-gh-integration.jpg)

If you look closely you can see that there are green ticks and red cross by the
latest commits in addition to the overall checks that are run against the pull
request.

Here's a few examples of what an integration could do:

1. Make sure the code passes all the tests
1. Check that a maintainer signs off the pull request
1. Ensures that every pull request is code reviewed
1. Checks that individual comments use a
   [commit syntax](https://github.com/marionebl/commitlint) (for tools like
   [semantic-release](/versioning-the-chicken-egg))
1. Ensure that all pull requests include _at least_ one emoji!
1. …and much more 😃

## How a commit status integration works

There are two main parts to creating these integrations:

1. Your server listens for events from Github, via a webhook
1. Calling Github's API with a commit status message and success or failure
   status

Then, in-between step 1 and 2, you can run whatever code you want to decide
_what_ message and status is sent back to Github.

Other tasks include:

1. Creating a personal access token
1. Releasing the code to a server (I'm going to use [Glitch](https://glitch.com)
   to host this example)
1. Configuring a Github repo to send webhooks to our service

## Let's make a Github integration

For this tutorial, I'm going to guide you through how to make an integration
that will only go green when a contributor on the repository comments on a PR
with a message containing <abbr title="looks good to me">LGTM</abbr> or red
(failure) if they comment with 👎.

I'll start by explaining the code required, then show you how to get the service
up and running.

## Start with a server

It makes things easier to start with a live URL that you can start pointing
Github repositories at. There's two ways you can get going on this very quickly
with minimal faff. The first (and what I'll be doing) is use
[glitch.com](https://glitch.com/edit/#!/new-project) (you might want to remove
some of the assets).

Alternatively you could run this code locally and use a tool like
[ngrok](https://ngrok.com/) to create a public URL that points back to your
machine. Of course, you could deploy with something like
[Zeit's now](https://zeit.co), [Heroku](https://heroku.com) and a mass of other
products.

With Glitch, you'll have a URL right away (even if it doesn't do what you want),
so I'll assume you've gotten that far. My URL is
https://festive-peony.glitch.me/

## Configuring a webhook

Assuming you have a Github repository that you want to use this project against
(or make a
[test one like I did](https://github.com/remy/github-integration-testing)), then
head over to Settings - Webhooks and click "Add webhook"
(.../settings/hooks/new). Then enter your URL and (I'd recommend) adding a
secret.

Before we add the webhook, we need to define the events that will trigger the
hook. Select "Let me select individual events" and tick the following (at a
minimum):

* Issue comment
* Pull request

Now you're ready to make the webhook.

![creating a github webhook](/images/create-github-webhook.png)

## Accept the the webhook

As soon as we created the webhook, a test payload was sent. It's possible the
server responded with a `200 OK` (certainly it will if you used Glitch). It's
useful to know that you can go back to the newly created webhook and re-send
payloads using the "Redeliver" button (we'll use this to help debug):

![recent-payloads.png](/images/recent-payloads.png)

Now we're ready to start handling the webhook payloads properly. I'm writing
this using JavaScript and Node.js. You can use whatever flavour language you
like, the logical process is pretty much the same (I would assume!).

There are two node libraries I'm relying on:
[githubhook](https://www.npmjs.com/package/githubhook) (currently at 1.9.3) for
handling and responding to the webhooks from Github, and
[github](https://www.npmjs.com/package/github) (currently at 12.1.0) to post the
commit status messages against the Github API.

```js
// filename: index.js
function handlePullRequest(repo, ref, data) {
  // this is where we'll post the git commit status message
  console.log('got webhook on %s', repo);
}

function listen(port = 8000, secret = 'a secret code') {
  const githubhook = require('githubhook');
  const hook = githubhook({
    port,
    // secret, // we'll uncomment later
    path: '/',
  });

  hook.on('pull_request', handlePullRequest);
  hook.listen();
}

listen(process.env.PORT, process.env.SECRET);
```

The `PORT` and `SECRET` are environment values that we'll need to set upon
deploy. The secret is a value that you add to the webhook so that only your
webhook is able to use this service. Note that for now, our secret is disabled
to allow us to test.

I can now put this minimal code in Glitch (or any other node hosting
environment) and when I hook my repo up against the production URL, I'll see the
following in the logs after the first pull request lands:

```
POST / 127.0.0.1
received 29604 bytes from 127.0.0.1
got pull_request event on github-integration-testing from 127.0.0.1
got webhook on github-integration-testing
```

You can either create a real pull request on your repo, or you can run the
following code in your terminal to test the webhook - remember to change the URL
to your own hosted integration:

```bash
$ curl -X POST https://festive-peony.glitch.me/ \
     -H"$(curl -L https://git.io/vbuH7)" \
     -d$(curl -L https://git.io/vbuH5)
```

<small>_Explanation of the command above:_ I've put the payload and headers
required to test the integration in a
[gist](https://gist.github.com/remy/04217b80d8e99370f3fb6d5f0d76f95f) and then
shortened the URLs. The `curl` above will `POST` to your URL, and use the
_result_ of [vbuH7](https://git.io/vbuH7) as the headers, and the result of
[vbuH5](https://git.io/vbuH5) for the posted body (the payload).</small>

## Updating the commit status

Now that our server is accepting a webhook, next we need to _do something_ with
the webhook. Using the `github` project dependency, we'll create an API call to
update the current commit status to _pending_.

Early on in the `index.js` file, the following code is added to authenticate and
allow the code to call the Github API (I'll include the final version of the
code next):

```js
const github = new GitHubApi({
  version: '3.0.0',
  protocol: 'https',
  host: 'api.github.com',
  timeout: 5000,
  headers: {
    'user-agent': 'my first github integration',
  },
});

github.authenticate({
  type: 'oauth',
  token: process.env.TOKEN, // personal token
});
```

You'll need to create your own
[personal access token](https://github.com/settings/tokens/new) and check the
following options: **repo:status** and **public_repo** (the public_repo is so
that we can make API requests for comments on the pull requests).
