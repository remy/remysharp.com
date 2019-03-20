---
title: Native Retweets
date: '2009-11-19 01:40:49'
published: true
tags:
  - api
  - twitter
  - web
modified: '2014-09-03 16:15:12'
---
# Native Retweets

Users of Twitter created the idiom "RT @suchnsuch said sumfink", and as with @ replies, RT's have been rolled in to Twitter's architecture.  Now we have, what I think should be called, the native retweet.

It was turned on for early users and more of the "twittersphere" is getting the feature now.  Certainly the first thing I wanted to see was what a native RT of 140 characters would look like. Well...truncated...but not really.

<!--more-->

I [posted this](http://twitter.com/rem/status/5841873578) when I noticed native retweets were turned on:

> I'm wondering: using the new retweet feature, what retweeting messages of 140 characters looks like to users that are not in the beta group.

So kindly, [RellyAB](http://twitter.com/rellyab) (amongst others) retweeted for me.

Here's what it looks like with native retweets enabled:

![Native](/images/native.png)

...and here it is with out native retweets enabled:

![Old School](/images/oldschool.png)

Notice the ellipsis. No huge surprise there.

What's interesting is that the actual tweet is modified in the Twitter's view of the timeline, i.e. it's mashing together Relly's tweets and her retweets in to one view.

This can be seen in the new API method: [home\_timeline](http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-statuses-home_timeline)

Retweeting looks to be pitched as a thumbs up for a tweet, or "like" feature, but I personally agree with [Cennydd](http://twitter.com/cennydd) when [he said](http://twitter.com/Cennydd/status/5841743636):

> There's already a "like": Favourite. I think using that intelligently would have been wiser than the over-engineered RT.

But the upshot of this architecture change is that potentially the noise goes down.  Since the retweets have their own API, the friends timeline can stay free (for now<sup>&dagger;</sup>) of the extra noise.  For example, in Tweetie, even though Relly had retweeted my experiment, it *doesn't* appear in her timeline:

![Tweetie RT](/images/tweetie.png)

Moreover, this is because the API call to user timeline is free of native retweets - so apps relying on it won't contain the retweet (for better or for worse - you may be using [Snap Bird](http://snapbird.org) to find the tweet that was retweeted by Relly and [fail to find it](http://snapbird.org/rellyab/140)).

In fact, *all* of the native retweet APIs require authentication, so apps that rely on working without auth (such as [Snap Bird](http://snapbird.org)) won't contain retweets at all in the future!

I'm not 100% sure whether this is good or bad, but it certainly mixes things up for the [developers working with the API](http://twitter.com/nuxnix/uk-twitterati).

I think, if anything, it shows that Twitter are treating [twitter.com](http://twitter.com) as a client to the API, and (rightly) they're aggressively keeping up to date with API changes, and I think that [other twitter apps](http://www.atebits.com/tweetie-mac/) are going to have to do the same.

### Update

I've also spotted this (obvious now) functionality in Twitter - the ability to ignore retweets from particular users (via the green RT button on the right):

![Aral](/images/aral.png)

This is perfect for those people you follow and value their retweets, something you could have missed, and where you can choose to ignore others. Ignoring the developer implications for a moment, the user experience is definitely better, and this will pass down the chain to the third-party apps like Tweetie (once they update).

<em>Obviously you'll still be able to bork the retweet feature by just adding it yourself, just like I can break the @mentions feature by adding a character (usually a period) in front of the @!</em>
