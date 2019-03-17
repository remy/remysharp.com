---
title: When my SSL is suddenly not secure
date: '2016-12-04 09:11:41'
tags:
  - code
modified: '2015-06-04 11:51:26'
published: true
---
# When my SSL is suddenly not secure

This has caught me out a couple of times, so it's about time I write it up on my blog so I can *google myself*!

Here's the situation: I had a working SSL certificate in place (actually for local development against a *fake* domain) and all of a sudden when visiting the https URL Chrome is telling me that my SSL certificate is no longer secure.

<!--more-->

![SSL failure](/images/ssl-fail.png)

The thing that I've noticed when this happens (to me) is there's usually some change in my network. This last happened to me when I was using an airport's wifi, and even though this particular domain resolves locally, it still seemed to do a DNS lookup through the airport's network first (*I think*).

There was definitely a caching issue at play, because the certificate was fine earlier in the day, but now not working. I thought I should be able to disable my wifi connection and clear the cached SSL cert, but it doesn't *quite* work like that.

## HSTS settings

Quite a few people (via twitter) suggested clearing content settings, cache, etc, but actually the problem came down to HSTS settings.

This [excellent post on HSTS settings](http://classically.me/blogs/how-clear-hsts-settings-major-browsers) explains how to clear the domain on Firefox, Chrome and Safari.

For my own record, here's how to do it in Chrome:

1. Visit chrome://net-internals/#hsts <small>(no, you can't link to internal chrome:// links!)</small>
2. Delete your domain (section 2)
3. Optionally, query your domain, and it should say "NOT FOUND"

Now the domain will be clear of the SSL cached nonsense and will re-request your certificate (assuming that it should have been fine in the first place).
