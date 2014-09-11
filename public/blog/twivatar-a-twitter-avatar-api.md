# Twivatar, a Twitter avatar API

<div class=update>
  <p><del><strong>Domain dead; native API available</strong> Due to a number of factors, twivatar.org is no longer active (the domain was in fact doomed) - however Twitter stepped up, and now there's an API to get the avatar directly from them: <a href="http://twitter.com/api/users/profile_image/rem">http://twitter.com/api/users/profile_image/rem</a> - so no longer any need for twivatar anyway.</del></p>

  <p><ins>Twitter have deprecated the "direct link" API for avatar images. To get a twitter avatar when one has a twitter username, one now needs to get OAuth tokens (because the Twitter 1.1 API requires them) and use the <a href="https://dev.twitter.com/rest/reference/get/users/show">users/show</a> API endpoint (which is rate-limited *and* requires an auth token). This is terrible by comparison with merely inserting an image pointing to a single url, but there you go, Twitter hates developers.</ins></p>
</div>

I've built a number of different mini-apps for Twitter, and run in to [various](http://groups.google.com/group/twitter-development-talk/browse_thread/thread/9a6f85e8beac68f5) [API](http://groups.google.com/group/twitter-development-talk/browse_thread/thread/3e87ad44d63835d8/a2828dd9758323a9?lnk=gst&q=remy#a2828dd9758323a9) [limitations](http://groups.google.com/group/twitter-development-talk/browse_thread/thread/2f0f10cae3cf6824) [that](http://groups.google.com/group/twitter-development-talk/browse_thread/thread/e1a61d579dca9300/cb65a0ad8f7ddcfe?lnk=gst&q=remy#cb65a0ad8f7ddcfe) I've not been [happy](http://groups.google.com/group/twitter-development-talk/browse_thread/thread/506cda469e9cfe2a/7d673932ee666c1b?lnk=gst&q=remy#7d673932ee666c1b) with (equally, Twitter did add the favourite count and fix the auth issue on favs).

Twitter avatars is one of those annoyances.  If you've built an app that caches a Twitter user's avatar, and that user changes their avatar ([@joshr](http://twitter.com/joshr) is a good example of this), the link breaks, thus breaking your app.

<!--more-->

I've spoken to [Doug Williams](http://twitter.com/dougw) about this (during the [Devnest](http://twitterdevelopernest.com/) in April) and there's a split argument over at Twitter: some say there should be an API, some say to re-poll Twitter to get the latest avatar.

This weekend I decided that I'd had enough, and decided to hack together a fix myself (affectionately known as a toilet project for those who know me).

I give you: [Twivatar](http://twivatar.org) ([twivatar.org](http://twivatar.org))

Twivatar is a [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer "Wikipedia Entry: Representational State Transfer") API that lets you specify a Twitter username and it will return the avatar.

## Usage

Usage
<pre><code>&lt;img src=&quot;http://twivatar.org/[screen_name]&quot;&gt;</code></pre>

Alternatively you can specify the size image you want from:

* mini (24x24)
* normal (48x48 - default)
* bigger (73x73)
* original

<pre><code>&lt;img src=&quot;http://twivatar.org/[screen_name]/[size]&quot;&gt;</code></pre>

I've also got the app [whitelisted](http://apiwiki.twitter.com/Rate-limiting) so there's no worries about it being blocked from Twitter.

All the source code is available on [GitHub](http://github.com/remy/twivatar/) so go ahead and fork 'n hack if you want to.
