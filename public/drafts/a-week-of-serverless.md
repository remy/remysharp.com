---
title: A week of serverless
date: '2018-03-22 21:10:39'
modified: '2018-03-23 08:43:22'
complete: false
inprogress: true
tags:
  - web
---
# A week of serverless

No, not the week I disconnected from the internet (goodness no!). For my sins, I've been spending my evenings experimenting on the edge of _serverless_ and it's about time I write up my findings.

<!--more-->

## Outline

- "serverless"
- why
- three options
  - netlify
  - serverless framework
  - arc.codes
- netlify
- serverless (next + latency 1.5 second boot)
- arc.codes - at first tricky to get my head around, unless I saw Brian's @static instance…which caused pain

## air-quotes serverless air-quotes

Yes, I'm a stickler for this word. More so than "the cloud". But, I think I'm a stickler for it because I'd considered _that_ term well over a decade ago when I was writing micro JavaScript applications (not websites) that would run in the browser. They wouldn't need a server to run, thus _server-less_.

For my own clarity of mind - serverless means (to me): not managed and not configured. This is possibly not what is intended for the term, but it makes me think of hosted functions (ala AWS Lambda functions, etc), third party services like Firebase or even hosting the entire codebase on S3 or Netlify. So no additional dynamic work is required.

As much as it pains me, this post will include "serverless", "cloud" and… "cloud functions". Brace yourself ye oldies.

anyway...

## Why?

I have a side project (…another you ask!?), and it was built with a "traditional" stack of Express, mongodb, handlebars and a thin layer of hand crafted JavaScript for interaction.

Except there's an endpoint in the the service that would be potentially hammed by users, and potentially runs unsafe code. So the theoretical idea of running the code in a cloud function.

It's been a bit tricky to pin down in others, but I've tried to understand the benefits, and whether I was on the right lines with my reasoning. Benefits offered:

- Faster (when comparing to shared resource hosting, and saturated file descriptors blocking/slowing requests)
- Faster deployment process
- Cheaper - lambda executions are pay on demand, and something like 20mil for $5 or something bananas
- Cheaper for developer/company due to speed of iteration
- Handles traffic spikes without intervention
- Removal of most infrastructure concerns

This was shared with me through only a few individuals and your own mileage may vary. I could argue on each of these topics, but the point was believe those individuals who have seen these benefits.

So now that I'm convinced it's worth spending my precious evenings, let me share what I tried and what results I saw.

## Unhooking the server

- netlify + api
