---
title: 'Unrot (that) link'
date: '2023-12-04'
nosubscribe: true
tags:
  - web
---

# Unrot (that) link

I present to you, a gift, a gift of a service that will "unrot" your links, cleverly named… [unrot.link](https://unrot.link).

The service promises to prevent and undo link rot on long lived web sites, via a service based implementation of my [No More 404](/2023/09/26/no-more-404) method, free for all.

<!--more-->

I've published as much documentation that I could think would be useful on the unrot.link web site, including an [interactive walkthrough](https://unrot.link/docs/how/) of how the server side process works (for the nerds and those who want to port to their own language).

When I originally wrote the post on No More 404, one concern was the 2 second timeout - both for myself but also raised by [Chris Coyier](https://chriscoyier.net/2023/10/11/remys-dead-link-solution/). This new version tries its best to do away with using multiple methods (a DNS resolution check and `HEAD` requests to attempt to reducing the latency). This mostly does work, and on [the test page](https://unrot.link/try/) I rarely see 2 seconds, and in some cases where there's a redirect, it can happen in under a second.

Also, importantly, the client script (that does the progressive enhancement) has built in redundancy to [protect against](https://unrot.link/docs/down/) the unrot service going down: a "ping" is used and _only_ if it succeeds does the script progressively enhance.

Finally, the service has an [allow list](https://unrot.link/access/). This means I have some way of contacting users of the service if there's any need. The process is relatively straightforward via a request on GitHub (as documented). If the access isn't in place, the unrot service will ignore the redirect check and forward you to the original requested URL (effectively a no-op).

Other than that, do check it out, and give me any feedback/PRs if you see room for improvement: **https://unrot.link**
