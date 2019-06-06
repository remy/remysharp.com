---
title: Firebase + Lambda + Zeit now
date: 2019-06-05
tags:
  - code
---

# Firebase, Lambdas & Zeit now

Super niché I know. I've been playing with Zeit's v2 now platform, and in particular I wanted to access a low cost (read: free) database with as little technical overhead as possible.

Somehow I thought that Firebase's Firestore would be a good match, but if you try this at home you'll run into some roadblocks pretty early on. So I thought I'd share those issues.

<!--more-->

## TL;DR

- AWS lambda with Now uses node@8.10 - ensure your modules support that version (firebase-admin@8 does not).
- Lambdas have a size limit of 5mb (which you _can_ increase): only include a node module if you absolutely have to. In my case, I switched to the REST API over the module.

I'd also recommend looking and reading the [Architect design philosophy](https://arc.codes/intro/philosophy) too.

## Offline testing

Although Zeit are offering [`now dev`](https://zeit.co/blog/now-dev) for local development (released a little over a month ago), but it's still very fresh out the oven and I've run into _a lot_ of issues (some I've been able to feed back).

That aside, there are still patterns you can use to speed up the local workflow (like using [micro with a bespoke dev server](https://github.com/zeit/next.js/blob/3245a5737014e74501859dc710b96fd439217c45/examples/with-cookie-auth/api/index.js)).

Using [Zeit's integrations](https://zeit.co/blog/zeit-now-integrations-platform), Google Cloud can be connected and you get a `GCLOUD_CREDENTIALS` environment value. This contains a base64 encoded string of your JSON authentication details (that would be shared with Zeit).

To replicate this offline, I took the contents of the `app-xxxx.json` and encode and add to a local `.env` file.

```bash
$ cat app-xxxx.json | base64 >> .env
```

The `now dev` picks up the `.env` values or I'll use my own environment tool: [@remy/envy](https://github.com/remy/envy#envy).

## Reading the auth details

It's not terribly obvious (in the related documentation) that you need to do this, but you'll want to include the following line:

```js
// Load the service account key JSON file.
const serviceAccount = JSON.parse(
  Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64')
);
```

This code will decode the environment value, then turned from text to a JavaScript object, which the `serviceAccount` expects to be.

## Not using firebase-admin

My first attempt to deploy was to include the [firebase-admin](https://github.com/firebase/firebase-admin-node) and herein began the issues.

Firstly with `node dev`, when I tried to use `set` on a reference, it would result in:

```
Unhandled rejection: TypeError: Path must be a string. Received 5603
    at assertPath (path.js:28:11)
    at Object.dirname (path.js:1349:5)
    at Object.8775 (/…/zeit-fun-67681d92fb318/routes/auth.js:260078:36)
```

Super useful eh? Notice in particular the error is coming from a compiled file on line 260078. Zeit's (new) Now platform, for want of a better explanation, will rollup all the used dependencies into a single file. So the stacktrace is fairly useless.

Running the same code without `now dev` gave a similar error, but also included a notice about firebase-admin supporting node@8.13.0 upwards.

Zeit's now uses node 8.10 which explains the total failure.

I've no idea why Google would drop support for node 8.10 - but I'm guessing it was for a feature in node 8.13 that suddenly appeared (and at least they made it a breaking version change).

Downgrading to firebase-admin@7.x gets the local server working, but upon deploy, Zeit's build fails when the single route that uses Firebase is 10.7mb.

The initial limit is 5mb and it can be increased, but in doing so, it's likely that the endpoint itself is going to take longer to boot, consume more resources and these aren't good things.

So let's switch to using REST calls.

## 0 deps > 1 dep

Removing the firebase-admin dependency means moving to REST calls. The [online REST documentation](https://firebase.google.com/docs/database/rest/start) explains how to authenticate your requests, then how to make the requests.

The main gotcha I hit was that the URLs to the firebase endpoints _must_ include `.json` (without it causes a `401` response).

I then provided a [shim for the requests](https://gist.github.com/remy/25e892cbc0c951a4614324708acbf656), ensuring that the auth token is requested on every invocation of the lambda route.

Without the dependency, the lambda doesn't need more memory, so it's all good.

## Final thoughts

It worked…but…even though the Lambda was based in Brussels and the Google Cloud firebase was in "europe-west" a database transaction (token auth, get and put) is consistently costing me 1 second. Which is too much.

![Lambda and db](/images/lambda-db-1.png)

I'm capturing these custom timings by setting the [`Server-Timing`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing#Syntax) header, which can be very useful in these situations.

Brian LeRoux [tells me](https://mobile.twitter.com/brianleroux/status/1134855207039320064) using DynamoDB I should (be able to) see 9ms response times, so that's what I'll move to next.
