---
title: buddy.works
date: 2019-11-15
draft: true
tags:
- web
---

# buddy.works

As a software developer I'm using tools day in and day out and depending on time, I'm usually interested in alternatives that help my workflow whilst reducing the amount of input required from me.

I have been asked (and sponsored) to look at [Buddy](https://buddy.works?ref=remysharp.com) a deployment platform. I'd already read [Chris Coyier's review and endorsement](https://css-tricks.com/buddy-on-css-tricks/) so I knew it had already passed through an initial quality filter.

<!--more-->

## What is it?

On the tin it's continuous deployment services, but scratching a little it's pretty clear that its way, way more than _just_ deployment. Pipelines is more appropriate and you can chain together multiple actions - more like IFTTT, but for ops.

In fact, if you remember the days of [Yahoo Pipes](https://en.m.wikipedia.org/wiki/Yahoo!_Pipes), then you can imagine Buddy is like an ops version of that.

## Hands on for me

In giving the tool a test I tried a few different projects including nodemon, jsbin and my own blog - all of which are based on different systems and require various details to get the deploys working.

A few highlights for me were:

- Environment variable control is extremely fine tuned: you can have env values for the single pipeline action or available to broader parts of the pipeline going all the way to the full workspace - this is useful to me because I always forget to set `NODE_ENV=production`
- When I was designing the pipeline, if one action failed during a test, I could fix that action and _resume_ from that action rather than having to restart the entire pipeline again
- There are literally hundreds of potential actions
- Along with manual and push based triggers to start the pipeline, Buddy also offers a webhook URL which lets me hook up IoT devices in my office to trigger deploys (which is just neat)
- The heavily visual UI is surprisingly easy to grasp (see pic below)

![Buddy working!](/images/buddy.png)

In a few minutes of thinking I was able to create a deployment process for my blog that runs all the build process and sends to Netlify - the difference to a Netlify based deploy is that only the changes are being used which makes the process of deploying faster (for me).

The only minor bug bear I had was that I was asked to allow push notifications when I landed on the sign up page - without context. I blocked the request since there was no context, and now having more experience of the site, I can imagine this would be for pipeline status - which _would_ be useful. I'm hoping they change this minor detail.

Otherwise, very useful.

I'm also really interested in webhook pipes, which I'm pretty sure this product would let me do too: connecting some incoming webhook to trigger a series of actions that then go on to call a later action… hmm, food for thought!

Check it out: [buddy.works](https://buddy.works?ref=remysharp.com)