# Twitter Apps

If you follow my blog, [follow me on Twitter](http://twitter.com/rem) or have been to [Twitter Developer Nest](http://twitterdevelopernest.com), you'll know I have a habit of hacking together Twitter tools and experiments pretty quickly, but usually they're all over the web. So this page is a dedicated list of all the Twitter related hacks I've put out there.

## Twitterlib: A Twitter JavaScript Library

* Project url: [http://github.com/remy/twitterlib](http://github.com/remy/twitterlib)
* Released: 26-November 2009

Twitterlib.js is the result of constant Twitter JS based hacking. Fed up of constantly rewriting code, I built Twitterlib.js that normalises all the data back from Twitter and makes a lot of the common tasks very easy, including: rendering, differences in API calls, search filtering and paging.

## Snap Bird: A Better Twitter Search

* Project url: [http://snapbird.org](http://snapbird.org)
* Released: 16-September 2009
* Github: [http://github.com/remy/twitter-search-js](http://github.com/remy/twitter-search-js)
* Blog post: [A Better Twitter Search](http://remysharp.com/2009/09/16/a-better-twitter-search/)

I've written a very simple, purely JavaScript based search limited to an individual's history or their favourites, this works around the existing 7 day limitation in the Twitter search and allows you to go back at least 3200 tweets (though usually you don't need to go that far back!).  The search library is also an open source project on github and can be used in any JavaScript project.

## Reply Chains

* Project url: [http://remysharp.com/demo/reply.html?id=8212341382](http://remysharp.com/demo/reply.html?id=8212341382) (id is a required parameter)
* Released: 25-January 2010

A fast hack using Twitterlib to show the reply chain for a particular tweet, in a similar way that Tweetie, the desktop app, does.

## Twivatar

* Project url: [http://twivatar.org](http://twivatar.org)
* Released: 2-June 2009
* Github: [http://github.com/remy/twivatar/](http://github.com/remy/twivatar/)
* Blog post: [Twivatar, a Twitter avatar API](http://remysharp.com/2009/06/02/twivatar-a-twitter-avatar-api/)

Twivatar is a RESTful API to a Twitter user's avatar built out of frustration of external Twitter apps breaking when the avatar url is stored, and then changed by that user later on Twitter - the result is a broken image on that app unless they constantly check for profile changes.

## Twitter.js

* Project url: [http://code.google.com/p/twitterjs/downloads/list](http://code.google.com/p/twitterjs/downloads/list)
* Released: 18-May 2007
* Google SVN: [http://code.google.com/p/twitterjs/source/browse/](http://code.google.com/p/twitterjs/source/browse/)
* Blog post: [Add Twitter to your blog (step-by-step)](http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/)

Twitter.js is a JavaScript library to add your Twitter status to your blog, that doesn't cause your blog to hang if Twitter goes down. In addition, the library offers a lot more customisation options than that offered by Twitter's official badge.

## Tweed

* Project url: [http://github.com/remy/tweed/](http://github.com/remy/tweed/)
* Released: 10-April 2009
* Example: [Driving Weird Habit](http://weirdhabit.com/)
* Example: [Twitter announcements for Full Frontal](http://2009.full-frontal.org)

Tweed is an open source server side search library that runs a very simple plugin architecture.  Tweed reads from a Twitter search url and pushes each individual tweet through the plugins that have been specified in the config file, finally cascading down to the database store plugin.

## Tweetersation (with sauce)

* Project url: [http://remysharp.com/demo/tweetersation/](http://remysharp.com/demo/tweetersation/)
* Released: 13-July 2009

Tweetersation was originally a [Natimon](http://natimon.com/) project by [Simon Willison](http://simonwillison.net) and [Natalie Downe](http://natbat.net/) that I then modified to allow me to track two or more *way* conversations, so I could watch the back and forth from Twitter.

## Twitter Replies

* Project url: [http://remysharp.com/demo/twitter_replies/](http://remysharp.com/demo/twitter_replies/)
* Released: 26-April 2009

I had been following up on an issue in the Twitter API where we can't track all the replies to a specific tweet (though we can go back the other way), but they've just recently decided to move the <code>in\_reply\_to\_status\_id</code> query to the next version of the API - hence this hack - which only works for your own tweets.

## Where's my Friend?

* Project url: [http://remysharp.com/demo/wheres-my-friend.html](http://remysharp.com/demo/wheres-my-friend.html)
* Released: 22-June 2009

In response to [Danny Hope's request](http://twitter.com/yandle/status/2276903049) I hacked together a mashup that would place all your friends on a Google map, combining the Twitter API, Yahoo Places API and Google Map API.  It's entirely client side and is a great way to quickly visualise your friend's location in the world.

## Autocomplete Twitter Keys

* Project url: [http://userscripts.org/scripts/show/34004](http://userscripts.org/scripts/show/34004)
* Released: 22-September 2008
* Blog post: [Autocomplete & Even Better Twitter Keys](http://remysharp.com/2008/09/22/autocomplete-even-better-twitter-keys/)

A greasemonkey script that plugs in to Twitter and autocompletes certain keys, such as "RT" in to symbols to save on precious space in the 140 character limit. It also "upgrades" Twitter to swap iPhone lat+lon to a real place and link to a map and linkifies hashtags.

<small>Note: the project is quite old now that Twitter have upgraded their site a number of times, and some/most functionality has been implemented by Twitter (such as linked hashtags) - so I've included this project to learn from.</small>

## Twitpic JSON API

* Project url: [http://twitpicapi.appspot.com/](http://twitpicapi.appspot.com/)
* Released: 20-July 2009
* Github: [http://github.com/remy/twitpic-json](http://github.com/remy/twitpic-json)
* Blog post: [Twitpic API for getting pictures out](http://remysharp.com/2009/07/20/twitpic-api-for-getting-pictures-out/)

I've been using Twitpic either via TwitterFon on my iPhone or Tweetie from my desktop for Twitter, but one thing struck me last night: Twitpic doesn't allow me to get my content back out.  This project solves that problem providing an API to retrieve images back out of Twitpic.

