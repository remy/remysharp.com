---
title: Antisocial spaces on Twitter
date: '2011-08-02 12:00:53'
published: true
tags:
  - twitter
  - web
modified: '2014-09-03 16:15:12'
---
# Antisocial spaces on Twitter

Hopefully this doesn't become a meme instead of what I intend for this blog post. There's a way to consume at @reply timeline in Twitter by just stuffing a shed load of new lines with anything at the end (like a period).

If you're a twitter app developer, please consider removing multiple white space in row. Twitter web client does this already ([apparently so does echofon](https://twitter.com/sturobson/status/97724698900697089) - so I think it's worth support the consistent tweet structure.
<!--more-->
## What I did

Here's a few screenshots to give you an idea of what I did, and how it looked.

### On Twitter for Mac

<img src="/images/space-break-native.png" style="margin: 0 auto; display: block; max-width: 100%" />

### On Tweetbot

<img src="/images/space-break-tweetbot.png" style="margin: 0 auto; display: block; max-width: 100%" />

### On twitter.com

<img src="/images/space-break-twitter-dot-com.png" style="margin: 0 auto; display: block; max-width: 100%" />

## The fixes

twitter.com are simply doing a replace on repeated new lines (in fact they're converted to spaces) and spaces. However, it looks like they're not stripping all types of white space, i.e. em-spaces, and no-breaking spaces still remain.

Although I know this breaks formatting for new lines - which I know full well some people want to retain - I'd really like to see the twitter app developers removing these multiple white spaces, because I'm sure some folk <a href="http://twitter.com/?status=What%27s%20down%20here%3F...%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A...made%20you%20look%20%3A%29">might start exploiting it</a>.

Don't say I didn't warn you!
