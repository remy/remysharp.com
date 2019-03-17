---
title: 'Slicehost, Node.js & WebSockets'
date: '2010-02-14 11:06:32'
published: true
tags:
  - html5
  - javascript
  - node
  - slicehost
  - web
  - websockets
modified: '2014-09-18 21:50:29'
---
# Slicehost, Node.js & WebSockets

I've been looking for a small hosting provider that I could run [node.js](http://nodejs.org) on to test out some WebSocket experiments, and this is my account so that you also can have a play.

<!--more-->
I should add before I continue, that it's not difficult by any measure if you know what you're doing (which I was about 80% of the way there myself) as per:

<div class="tweet" style="border: 1px solid #ccc; padding: 10px;">
  <p>@rem since your last tweet (roughly 20 minutes) I bought a slice on Slicehost for 20$ and got the #nodejs example server running on it.</p>
  <div class="source">
    <p style="margin: 0; line-height: 20px;"><img style="padding-right: 10px; vertical-align: top;" src="http://twivatar.org/kriskowal/mini"><a href="http://twitter.com/kriskowal/status/9075436737" style="font-size: 150%;">kriskowal</a></p>
  </div>
</div>

## Slicehost

I did try out Rackspace Cloud at $11/month to start off with, but after the registration was complete they told me that they needed to call me to finalise verification. I wasn't at home so I didn't get the call. Plus, since I've moved my bank account is in a weird flux at the moment. Suffice to say, the account was never completed and I couldn't get access to the server. So I cancelled quickly and looked at registering with Slicehost.

[Slicehost](http://www.slicehost.com/) registration was a breeze - I started with the smallest option. One form to complete and the server was up. Amazingly easy. They had preselected an "Ubuntu 8.04.2 LTS (hardy)" distro for me, which if I was asked to select one of the distros myself, I'd have no idea which would be a decent starting point otherwise: 8, 9, 10? Who knows, I just wanted to get going. Perfect.

Immediately my server was running. I did hit one security block which you're unlikely to also hit because I was registering from the UK, but accessing from Switzerland (since I was still on holiday), but the customer support notified me of the security issue (which blocked my server) and literally had it all sort and resolved within 10 minutes. I whole heartily praise their support for the speed and personal touch they had sorting this out.

So, getting set up. I'd need the following:

1. My own account, rather than root
2. Git (so I could clone the repos)
3. Node.js (and thus also c++ compilers, etc)
4. WebSocket server

## Configuring the Ubuntu server

Slicehost has a superb wiki with instructions here:

[Getting Started With Your New Ubuntu Slice](http://wiki.slicehost.com/doku.php?id=get_started_with_your_new_ubuntu_slice)

I followed the directions up to the "pimping out your prompt" (since I've got my own poison). That was the user config done and now I could sudo and root was blocked.

## Installing Git

Git was simple, although I did go round the houses a little. Just run:

<pre><code>sudo apt-get install git-core</code></pre>

Now git was installed.

## Installing Compilers & Node.js

Getting node was simple as all I needed to do was clone the repo:

<pre><code>git clone git://github.com/ry/node.git</code></pre>

The problem was actually building Node - I hadn't installed the compilers, c++, cc, gcc, etc. Using a combination of hit and miss and shotgun approach, this was also simple:

<pre><code>sudo aptitude install build-essential -y</code></pre>

This gave me all the compilers, so I was then able to build.

I'm now going to fast forward through my experience and rather than take you round the houses, just tell you that you want the *stable* build and not the latest.  The WebSockets don't work properly with the latest 0.1.28 build, and the stable build is on 0.1.26. So you need to switch branches (from the <code>node</code> directory):

<pre><code>git checkout origin/stable</code></pre>

Now you're ready to build. It actually took me a lot of faffing around to work out I wasn't on the stable release, so consider this a favour! :) *Now* we're ready to build:

<pre><code>./configure
make
sudo make install</code></pre>

Next stop, let's get the WebSocket server running

## WebSocket Server

I personally wanted to play with the <a href="http://apiwiki.twitter.com/Streaming-API-Documentation" title="Twitter API Wiki / Streaming API Documentation">streaming Twitter API</a>, conveniently there's a git repo for that!

I created a <code>web</code> directory in my home directory so that I could run my experiments out of, from there I run:

<pre><code>git clone git://github.com/andregoncalves/twitter-nodejs-websocket.git</code></pre>

From there I kicked off the server (by default it listens for "iphone"):

<pre><code>cd twitter-nodejs-websocket
node server.js &lt;username&gt; &lt;password&gt;</code></pre>

Now on my other "normal" server (though the smoothness of slicehost, I'm now thinking of porting across all my sites) hosts a simple web page (from the example in the git repo) that streams the latest tweets found by the server and should be viewed on a WebSocket enabled browser, i.e. Google Chrome (dev channel) or Webkit nightly: [http://rem.io/relay-tweets.html](http://rem.io/relay-tweets.html) (note that I'll be running this demo for a while, but it may well be taken down in the future). Here's a screenshot in case I've shut it down and moved on:

![Screenshot of streaming tweets](http://remysharp.com/images/twitter-stream.png "Screenshot of streaming tweets")

The core code to run the socket is simply this:

<pre><code>ws = new WebSocket("ws://&lt;host&gt;:8080/");

ws.onmessage = function(event) {
  var data = JSON.parse(event.data);
  var $p = $(twitterlib.render(data)); // uses <a href="http://github.com/remy/twitterlib">Twitterlib.js</a>
  if ($('#tweets > li').length > 15) {
    $('#tweets >li:last').slideDown(100, function () {
      $(this).remove();
    });
  }

  $('#tweets').prepend($p);
  $p.slideDown(140);
};

ws.onclose = function() {
  alert("socket closed");
};</code></pre>

No doubt I'll be posting an article on <a href="http://html5doctor.com/" title="HTML5 Doctor, helping you implement HTML5 today">HTML5 Doctor</a> about WebSockets and writing about it in the upcoming [Introducing HTML5](http://www.amazon.com/Introducing-HTML-Voices-That-Matter/dp/0321687299) that I'm writing with <a href="http://www.brucelawson.co.uk/" title="Bruce Lawson&#8217;s  personal site">Bruce Lawson</a>.
