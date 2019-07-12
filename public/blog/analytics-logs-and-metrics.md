---
title: 'Analytics, logs and metrics'
date: 2019-07-15 13:00:00
tags:
- web
---

# Analytics, logs and metrics

Netlify just recently launched a simple analytics offering for $9 per site per month. It's a great addition to an amazing platform and when the analytics are enabled, the last 30 days of traffic will be backfilled. It doesn't intend to replace marketing analytics and is (currently) a rather static view of traffic.

## The long cost of 404s

In trying to be clever, I use my 404 page as way to _try_ to [redirect my visitor to the correct page](https://remysharp.com/2019/05/02/search-dynamic-shortcut-links#dynamic-shortcut-links). This works pretty well, but it has a side effect that the 404 page - for every 404 - is 15.4Kb. This isn't huge per se, but in my case, the size adds up…a lot.

My blog has been live since 2006 and over that time I've written a lot of code and posts that help folks. In some of these posts I'd provide example code, such as my [mousehold plugin](https://remysharp.com/2006/12/15/jquery-mousehold-event). Naïvely I allowed hotlinking to the scripts (whereas I should have set a `text/plain` content type on the scripts).

Fast forward twelve or so years, linking to the script causes a 404 (remember 15Kb) and there's a significant amount of hotlinking in just the last 30 days.

Just one of these sites links to a bad URL, 53,165 times in the last 30 days, accounting for 800Mb of bandwidth traffic!!! Clearly I'm doing something wrong.
