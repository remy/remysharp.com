# A better Twitter search

If you've not noticed already the search in Twitter has been downgraded to 7 days history.  In fact, that changed some time ago.  I've had the good fortune to be able to ask Twitter employees directly about the history via attending [Devnest](http://twitterdevelopernest.com/) and I've been assured the history is being kept.

That doesn't solve the problem of how am I supposed to find that tweet such and such posted a while ago.

So I've written two things: 1) a simple history search for user timelines and 2) a micro library for search filtering.

<!--more-->

## Searching Further Back

I've written a very simple, purely JavaScript based search limited to an individual's history or their favourites.

Currently you can't search your "friend" timeline, but it's a feature I'd be willing to add if people thought it would add a lot of value.  If I did add it though, it would have to use Twitter's oAuth and I'd host it on a Google App Engine (or similar), firstly because friend timelines require authentication (although historically they didn't...annoyingly) and secondly, because I probably don't need to host another app myself!

There's also limits within the API calls I'm making, in particular:

1. User timeline searches are limited to 200 tweets per hit
2. Favourite searches are limited to 20 tweets (yeah, only 20!)

Check it out, bookmark it, make use of it:

[http://snapbird.org/](http://snapbird.org/)

## Giving Back to Developers: Twitter Search Library

I figured search filtering is a pretty basic requirement, and it's one that I'd add to a lot of my own apps/hacks and one I'd like to see in apps being built.

I've put the search filter library up on Github for people to pinch, share, upgrade and do as you will.

[http://github.com/remy/twitter-search-js](http://github.com/remy/twitter-search-js)

The library supports the following search commands (from the existing [Twitter search](http://search.twitter.com)):

* All these words. Example: <em>cheese wine</em>
* This exact phrase. Example: <em>"good weather"</em>
* Any of these words. Example: <em>cheese OR @brucel</em>
* None of these words. Example: <em>cheese -wine</em>
* From this person. Example: <em>from:brucel</em>
* To this person. Example: <em>to:brucel</em>

This can be combined as per the current search in to more complicated search strings: <em>font OR cheese -wife</em>.

### Usage

Include the library and you can pass the raw tweet objects to the filter - that's the <em>raw</em> tweet and not the *string* (because it needs the tweet to assert the <em>from this person</em>).

<pre><code>if (twitterSearch.filter(tweet, searchString)) {
  // tweet passed search criteria
}</code></pre>

I'd love to see this library plugged in to widgets to allow live search filtering, or HTML based Twitter apps to apply dynamic search filters to any given result of tweets.