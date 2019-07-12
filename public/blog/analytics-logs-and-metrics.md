---
title: 'Analytics, logs and metrics'
date: 2019-07-15 13:00:00
draft: true
tags:
- web
---

# Analytics, logs and metrics

Netlify just recently launched a simple analytics offering for $9 per site per month. It's a great addition to an amazing platform and when the analytics are enabled, the last 30 days of traffic will be backfilled. It doesn't intend to replace marketing analytics and is (currently) a rather static view of traffic.

I've been thinking about analytics, logging and metrics for a while now, partly in an attempt to free my site of trackers (such as Google Analytics) so I wanted to break down the pros and cons of what I'm currently trying.

<!--more-->

## What are my aims?

Before I jump into the tools, I really need to ask myself: what are the aims of this kind of analysis?

- Vanity metrics
- Understand what sites are linking to mine
- Bandwidth management / Errors
- Re-targeting

Re-targeting is the only item that would require Google Analytics. Though I have extremely poor success rate with online advertising, I've used re-targeting with [ffconf](https://ffconf.org) ticket adverts and it's worked for a small handful of sales. I'm on the fence as to whether this is enough to justify keeping GA as it's another contributor to the privacy hell we've somehow made for ourselves.

The most critical aim is the bandwidth. I've already had warning emails from Netlify saying that my usage is getting close to the 100Gb of bandwidth that's free. Without understanding where the bandwidth is going, I'm flying blind. Without this insight I'm "hoping" everything will be fine.

The remaining aims are entirely for vanity, I _could_ live without them, but I've had them since the early inception of this blog and it's even helped me make my [popular posts](/popular) page.

## Netlify's Analytics

These are entirely server side generated (in my mind akin to apache common logs). Netlify has an undocumented API that provides the data which means it doesn't take too much to tweak the date ranges or the number of results shown (for instance I was able to extend the sources linking to my site to 200 results in stead of 5).

I really liked that I could just enable the add-on against my site (I had already entered credit card details) and the analytics appeared. What I was particularly interested in was the bandwidth (given I had already had one bandwidth limit warning) and _where_ the traffic was coming from:

![bandwidth analytics](/images/analytics-bandwidth.png)

Direct traffic and google aside, that list of domains are _not_ linking to my site. They're linking to scripts I've written in `script` tags. So this isn't really a visitor to my site (even though Netlify counts this as a "pageview"). When I checked those top sources out I found some linked to existing scripts, but some linked to scripts that were 404ing. For my site, this has **quite an impact**.

### The long cost of 404s

In trying to be clever, I use my 404 page as way to _try_ to [redirect my visitor to the correct page](https://remysharp.com/2019/05/02/search-dynamic-shortcut-links#dynamic-shortcut-links). This works pretty well, but it has a side effect that the 404 page - for every 404 - is 15.4Kb. This isn't huge per se, but in my case, the size adds up…a lot.

My blog has been live since 2006 and over that time I've written a lot of code and posts that help folks. In some of these posts I'd provide example code, such as my [mousehold plugin](https://remysharp.com/2006/12/15/jquery-mousehold-event). Naïvely I allowed hotlinking to the scripts (whereas I should have set a `text/plain` content type on the scripts originally - alas hindsight).

Fast forward nearly thirteen years, linking to the script causes a 404 (remember 15Kb) and there's a significant amount of hotlinking in just the last 30 days.

Just one of these sites links to a bad URL, 53,165 times in the last 30 days, **accounting for 800Mb of bandwidth traffic!!!** Clearly I'm doing something wrong.

### What Netlify analytics really gives me

Netlify's analytics are server logs. This means that every single request that Netlify handles is logged. In some ways this is useful because it'll give a true sense of web requests (again, useful for bandwidth and error monitoring).

The flip side of that is that it's not really representative of "visitors" (or isn't for my long running blog) because it includes requests where a `script` or even `img` tag points to my site.

This is highlighted when comparing the Netlify analytics to Google Analytics show below respectively:

![Netlify visitor figures](/images/analytics-netlify-overview.png)

![Google Analytics visitor figures](/images/analytics-ga-overview.png)

Of course, and importantly, stats like this mean whatever you want them to mean. It's not that one is wrong or not, it's that they have different meanings.

## Google Analytics

I don't have much to say on GA. It's a very well covered topic elsewhere. What is important is that by using GA on my site, I'm contributing to Google knowing more about you for better or worse.

Personally I don't want my site to add to the pool of data that's collected about you and then used, _potentially_ against you without your knowledge.

On the other hand, I _do_ need market ffconf to my visitors which I've done through re-targeting campaigns. This does work whilst also being at conflict with my own moral judgement.

A nice perk of running GA on my site since 2006 is that I'm able to export all those pageviews and generate a "most popular" page. I've got a small(ish) [node script]()
