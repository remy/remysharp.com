---
title: Tweet offline & better locations
date: '2008-09-17 16:42:26'
published: true
tags:
  - greasemonkey
  - twitter
  - web
modified: '2014-09-03 16:15:12'
---
# Tweet offline & better locations

If you [follow me on Twitter](http://twitter.com/rem) you'll have seen that I've been [moaning](http://twitter.com/rem/statuses/906601822) a <del>bit</del> lot about using Twitter as an alternative to email or <abbr title="Instance messenger">IM</abbr>.

Rather than bitch and moan the whole time, I've made myself a solution: I can now pull a tweet in to an email and thus continue/create the conversation offline.

In *addition*, since I'm writing code that will parse the Twitter DOM, I might as well fix the latitude and longitude data that appears on Twitter (since I can't do geo mapping in my head).


<!--more-->

I've done this as a [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/748) script:

[Tweet offline & Locations](http://remysharp.com/downloads/tweet_upgrade.user.js)

## Offline Replies

It simply adds a reply icon to each tweet, which plugs the contents of the tweet in to the subject of an email allowing you to continue a conversation offline.

![Tweet Offline](http://remysharp.com/wp-content/uploads/2008/09/tweet-offline.png)

It doesn't plug in the person's email address since Twitter's API doesn't (rightly) open that information up - but it's a quick convenient plug in.  I'm considering taking a look at [Ubiquity](http://labs.mozilla.com/2008/08/introducing-ubiquity/) to see if I can extend this to a plugin that you can continue the last conversation offline for X user.

## Locations

With the iPhone having GPS or using the 'locate me' functionality, there are more Twitter profiles that show 'iPhone: lat,long' which doesn't mean anything to the regular user that can't map latitudes and longitudes in their head.  So, inside the twitter greasemonkey script, it will use Google to work out the actual location of the lat/long coordinates.

### Few examples

Load up the Twitter greasemonkey script and take a look at a few people that have the lat/long on their Twitter profiles:

* [rem](http://twitter.com/rem)
* [shapeshed](http://twitter.com/shapeshed)
* [simonw](http://twitter.com/simonw)

### How's the techie stuff done?

It's actually two calls to Google's API - but since it's done through your browser, there's no worry about hitting limits.  

The first call goes off an requests the directions from the lat/long combo *to* the same lat/long position.  This results in the road name being given.  This is used to zoom out a little bit more to give a reasonable description of the location.

The second call is to Google's *typical* geo mapping API, giving the street name from the first call and the original lat/long to help locate the street.  

The result is the full location in a string.

In some ways I wonder if this information is a little too much, knowing exactly which street the tweet was made, but then on the other hand, the lat/long is there in the first place, which is actually giving me this detail (I just can't work it out in my head!).

Aside from that, there's some nifty little iframe magic going on in the script to get around the sandboxing that greasemonkey does, so that I can hook JSONP callbacks in (the Google map requests).
