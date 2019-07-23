---
title: 'User agent tunnel vision'
date: 2019-07-25 12:00:00
tags:
- web
---

# User agent tunnel vision

Yesterday I published a post that I'd been writing for a while as I considered and compared three web analytics "platforms".

Upon posting to twitter I had a few suggestions on alternatives (all of which I had reviewed myself long before), but in particular [Fathom](https://usefathom.com/) came up - one I had dismissed before because it didn't include user agent analytics.

<!--more-->

## Why are user agents important (to me)

So first off, a "user agent" is a (typically) unique string that represents a certain browser flavour (usually the make, version and the operating system it runs on). It's entirely possible for visitors to fake their user agent and there's a [very, very, very long tail](https://web.archive.org/web/20190321011349/http://useragentstring.com/pages/useragentstring.php) of user agent strings.

When I'm [asked to work](/work) on a development project that involves the browser, I always ask my client what browsers their users are using. 9 times out of 10 the client doesn't know (though props to my very latest client for knowing 👍).

Analytics aren't in place to capture this information. Why do I ask? So that I know what the primary capabilities of the browsers are. Though really I'm trying to determine whether we're working with "latest browsers" or "legacy browsers". For me it really falls into those two camps.

For a legacy browser, we're talking IE9 (and probably Safari), it means potentially leaning on polyfills for websockets, being careful about animation performance and more.

For latest browsers, we can push the envelope a little more, but still respect those lower powered devices.

So when I reviewed [Fathom](https://usefathom.com/), from the [live demo](https://stats.usefathom.com/#!p=1w&g=day) I could see there were no user agents.

My intended usage for the analytics was my own blog, so I wanted to know whether I could expect certain CSS features to work, or whether using "fat arrow" functions in JavaScript would cause my code to blow up (because JavaScript is rather toddler-ish like that).

Because, obviously, without user agent logging, I couldn't best serve my users. Right?

Wrong.

## Tunnel vision

As soon as I replied on Twitter that Fathom didn't meet my requirements, I hit send and my brain kicked in with:

![Progressive Enhancement](/images/pe.jpg)

It's not really a stretch and if I look at the code I've written for my blog so far, it's exactly what I'm doing already. I've always cared about the lowest entry device browsing my sites (and I've failed them on occasion too).

There's many debated about what [progressive enhancement](/progressive-enhancement) means. I've even been part of a panel discussing it. It definitely doesn't mean "works without JavaScript" IMHO.

The important bit is that if I'm considering my users, by looking at them all, I'm going to miss the requirements of the users I cannot see.

So I'll take my blinkers off, and stop asking the question, I'll stop making it a requirement, and remind myself: **enhance first.**
