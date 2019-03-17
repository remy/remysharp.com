---
title: Twitpic API for getting pictures out
date: '2009-07-20 16:55:52'
published: true
tags:
  - api
  - javascript
  - json
  - project
  - twitter
  - web
modified: '2014-09-03 16:15:12'
---
# Twitpic API for getting pictures out

I've been using [Twitpic](http://twitpic.com/photos/rem) either via [TwitterFon](http://twitterfon.net/ "TwitterFon - Simple, Clean, and Fast Twitter Client for iPhone and iPod Touch") on my iPhone or [Tweetie](http://www.atebits.com/tweetie-mac/) from my desktop for [Twitter](http://twitter.com/rem), but one thing struck me last night: [Twitpic doesn't allow me to get my content back out](http://twitter.com/rem/status/2725763132).

So here's my fix: [http://twitpicapi.appspot.com/](http://twitpicapi.appspot.com/)

<!--more-->
## Twitpic JSON API

I've created an API that scrapes the data straight off the Twitpic site to get your images back out.

I've not gone so far as creating integration to Flickr (which actually where I want to put my images), mostly because [that exists already](http://twitpickr.wijndaele.com/).

The JSON API is easy to use, but I've had to limit it to one page at a time (because the backend processing takes too long).

[http://twitpicapi.appspot.com/](http://twitpicapi.appspot.com/)

Usage and examples are explained, but it's pretty self explanitary (and it supports JSONP too):

<pre><code>http://twitpicapi.appspot.com/rem?callback=mypics</code></pre>

The service will resolve to the *original* url of your image too, but annoyingly, the title/description isn't always present, since it depends on your client sending it along at the same time (TwitterFon does this, but Tweetie doesn't).

## Open Source

With any hacking I play around with, I've made the project open source, and all the code is available on GitHub here: [http://github.com/remy/twitpic-json](http://github.com/remy/twitpic-json)

Feel free to log issues, fork it and make it better.

## Experiment

In addition to GitHub lovelyness, this is my first Google App Engine project written in Python (which I've not written before).

I was a 2 hour hack project, the initial source of which came from [Simon Willison](http://simonwillison.net)'s [JSON-time](http://github.com/simonw/json-time/) project on GitHub, and then I hacked from there, occasionally checking out the manual :-)

It wasn't too painful, though I definitely thought Python was more OO that my experience (though it's likely I screwed up!).

I'd like to move Twivatar across to App Engine at some point to reduce the load on my database, and I needed an excuse to play with Python, so this was an attempt to scratch an itch.
