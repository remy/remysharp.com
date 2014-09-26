# Muddling my way through real time

If your business deals with data on the web, then that data must be handled in real time, otherwise you're doing your user a disservice.

---

Real time demand is a core part of our internet experience, let alone expectation.

Twitter is probably the crowning application of real time I can think of. Hitting the mass audience and industries across the board.

Today we have real time journalism, data, feedback, communication between our teams, from our code and tests. Heck, we can create a brand new virtual machine in under 60 seconds ready to deploy a new site. *Back in my day*&trade; that process would take 2 weeks!

I recently returned from jsconf.eu 2014, and sitting in the office, only days later I kept catching myself thinking "I'll just watch the video from jsconf" – but what video? They filmed their events, but somehow I was expecting the event to have already fully edited, titled, uploaded and release *all* their videos! I know some events that do do this ([lxjs](http://lxjs.org) for one) – but these aren't the norm. At what point did I have this (I think) unreasonable expectation on information on the web?

*On demand* and *real time* is a normal part of the world we live in today. And if you can't handle the pressure, your visitor will likely head off elsewhere.

<!--more-->

![Muddling your way in real time](/images/muddling-in-real-time-cover.gif)

---

## Contents

1. [What is real time to you](#what-is-real-time-to-you)
2. [My first introduction to real time on the web](#my-first-introduction-to-real-time-on-the-web)
3. [The origins of Comet](#the-origins-of-comet)
4. [Node is introduced](#node-is-introduced)
  * [The event loop](#the-event-loop)
  * [helloworld.js of streaming servers](#helloworldjs-of-streaming-servers)
5. [Codifying into standards](#codifying-into-standards)
6. [So, what's next?](#so-whats-next)
7. [Core npm modules](#core-npm-modules)
  * [Socket abstraction](#socket-abstraction)
8. [Primus](#primus)
9. [Scaling](#scaling)
  * [Client side](#client-side)
  * [Server side](#server-side)
10. [Long-latency real time feedback](#long-latency-real-time-feedback)



## What is real time to you?

I think it's important to define what *I think* "real time" means. [Guillermo Rauch](http://www.devthought.com/) (creator of Socket.IO) has a [few](https://www.youtube.com/watch?v=Ar9R-CX217o) [excellent](https://www.youtube.com/watch?v=_8CykecwKhw) talks on the topic, and he describes real time as:

- Fast
- Self-updating

I'd go further to say (for me) it needs to be:

- *Instant*
- Self-updating

I think it's also important to distinguish between what's technically real time and what a user perceives as real time. The later being important and the former being arbitrary.

Some applications have been know to respond *so* quickly that they had to introduce a fake delay to meet their users expectations Specifically: when the program responded so instantly, the user thought something was wrong. With a small delay and a touch of UI feedback (along the lines of "we've processing your request"), the user *felt* the a application was more responsive.

Inversely you might get a push notification to your phone that someone's mentioned you in a tweet, but when you go to twitter, it can't connect to update itself. Or *you* post a tweet and it doesn't appear in your timeline for ages if you're on a slow connection. In this case, we want a "self-updating", and one that can handle errors.


This is my own story of how I discovered the web in real time, what I've done over the years and how I use node.js to simplify what used to be very technical problem.

## My first introduction to real time on the web

My first experience with a real time web was around 2002. I worked for many years on a finance research web site, and stock prices were an important aspect of data.

If you wanted live prices on your site at the time, there would be expensive licences with the London Stock Exchange and some form of Java Applet on your site. We settled for a recurring job that grabbed a 15 minute delayed price CSV file from Yahoo.

<img style="width: 40%; display: block; margin: 0 auto;" src="/images/hahabusiness.jpg" title="What it's like to work for the finance sector">

The meant that our prices would be "15 minute delayed" (which was a normal expectation of prices shown on free web sites) but for the subsequent 15 minutes the prices would go stale.

What does that look like?

```js
function updatePrices() {
  $.get('/prices?stock=MSFT', function (data) {
    renderPrices(data);
    setTimeout(updatePrices, 60 * 1000);
  });
}
```

Notice that we're polling using an ajax GET request every minute, in an attempt to get the fresh price when it arrives. The timing looks like this:

```nohighlight
09:14 MSFT=$46.68
09:15 ...no change
09:16 ...no change
09:17 ...
09:18 ...
...
09:23 ...
09:24 MSFT=$46.68
09:25 ...no change
```

It's also important to realise that all those "no change" requests were wasteful, both because the client is constantly making XHR requests, but the server is also having to deal with requests when the data hasn't changed at all.

The server is the "ultimate source of truth" and what we want is the *server* to *push* the prices to the client.

---


It was one afternoon that one of the data collection team asked me to take a look at one of the finance research sites that they were looking at: Hemscott (I should add the original pages have long since left the web).

The page had a [heatmap](http://en.wikipedia.org/wiki/Heat_map) of the FTSE100 prices. What made this particular page interesting is that the prices were changing in real time, and the red/green/sneutral were also changing, so there was a clear visual feedback system to show me this data was live.

What made this page magical though, was I ran the usual "select text test". i.e. if I can select the text, then it's "of the web". If I can't, it's Flash or Java Applets (and right clicking would discover which). But this *was* web. There was a DOM.

![Hemscott from 2002](/images/hemscott.gif)

<small>(Appologies for the poor picture above: the internet really *doesn't* remember!)</small>

I spent quite a lot of time poking around some compressed JavaScript, looking at the DOM updating (this was back in the Firebug days so there was no [break on DOM subtree modification](https://developer.chrome.com/devtools/docs/dom-and-styles#setting-dom-breakpoints)).

Hemscott had been able to do what we could not: real time prices, using web technology. **It was magic.** That's all I could ascertain.

---

In retrospect (over several years) I realised that they were achieving the real time effect using Flash. Specifically the `XMLSocket` to connect to the streaming server and using the "Flash SWF ExternalInterface Bridge" to let JavaScript receive messages from the live stream.

Essentially a very similar technique that's used in today's [WebSocket polyfill](https://github.com/gimite/web-socket-js) (which uses Flash for the filling part).

In the mean time Google released Google Talk which was the big tipping point in the web's history for shifting from a request/response pattern, to a server-push pattern, Ajax and Comet respectively.

## The origins of Comet

Google launched GTalk in 2005 (as part of Gmail) and at the time Google were employing ex-Microsoft developers to solve a very, *very* specific problem. GTalk used long lived iframes to push the chat events up to the client.

But "long lived" means that they needed to refresh (or specifically: reload) eventually, and that reload in IE would cause an <a href="javascript:window.xpaudio.play()">audible clicking noise</a> (this was actually a feature of XP's audio suite). Imagine for a moment, that clicking, coming from seemingly nowhere, on a regular basis when you're chatting online with your friends. Annoying!

<audio id="xpaudio" controls style="width: 100%;" src="/downloads/clicking.wav"></audio>

The solution is amazing (or certainly to me) and the epitome of the web: a hack upon hack upon hack.

[The solution](http://infrequently.org/2006/02/what-else-is-burried-down-in-the-depths-of-googles-amazing-javascript/) would be to create an ActiveX htmlfile object, drop the document with an iframe inside that and the clicking would be suppressed.

And so a stable server push technology emerged.

---

Comet was coined by [Alex Russell](http://infrequently.org) (of Dojo fame, and now simply known as The&nbsp;Oracle™ at Google/he works on Blink) [defined](http://infrequently.org/2006/03/comet-low-latency-data-for-the-browser/) as a method to push data from the server to the client (the browser).

Comet is not a specific technology, but more of an abstracted process. The implementation varied, and frankly at the time, was better suited to system engineers rather than your cowboy developer...like me.

Comet *could* involve any mix of iframes (of course!), long polling, XHR, long running script tags, and so on. To add to complexity, there were oddly named protocols like the Bayeux protocol and BOSH.

All things that provided barrier to entry, but real time, rightly, was hard. Real time appeared more and more across the web.

---

**The real hurdle is that there's *two* parts to real time: client *and* the server.**

---

The usual set up for a server in the mid-2000s was to use a [LAMP stack](http://en.wikipedia.org/wiki/LAMP_(software_bundle). Apache being the main sticking point.

Apache is designed (out of the box) to run and spawn a number of processes to deal with concurrent requests.

So if you have 5 apache processes waiting to deal with web requests, and you have 6 requests, the 6th user will have to wait until there's a free process before apache can respond.

This is usually find when you're deal with a request/response situation, apache is fast for that. But when you're keeping connections open to allow a server to *push* a message to the client, you saturate the available apache processes.

What does this mean in practise? If you have 5 processes and 6 streaming *requests*, the 6th *will never* receive a response. And to that user, the site is hanging indefinitely.

The solution to the server issue is evented server. If I recall correctly, this would be: Twisted for Python, Jakarta for Java, Juggernaut for Ruby, etc. But they were non-trivial to set up.

Come 2009 and Ryan Dahl.

## Node is introduced

![Ryan introduces Node at jsconf](/images/ryan-node.jpg)

At the first jsconf.eu, Ryan Dahl, introduced [node.js: evented IO for V8](http://lanyrd.com/2009/jsconfeu/skpz/).

The talk starts quite technical and detailed, but Ryan started to draw similarities with what he was doing with node.js with the DOM.

Although node.js has nothing to do with the DOM, the way that the event loop works is very similar to the way a browser will work.

### The event loop

This is what an event loop *could* look like:

```lua
function main
  initialize()
  while message != quit
    message := get_next_message()
    process_message(message)
  end while
end function
```

In a browser, the `get_next_message` could be the user clicking the mouse, or an XHR request completing, or a render, or some JavaScript being run. The point being is that the loop waits for a task, then processes that task.

This is where node.js makes concurrent requests (i.e. holding 100s if not 1000s of open connections to clients) easy.

### helloworld.js of streaming servers

As Ryan demoed in his talk 5 years ago, the code following is the simple proof that comet servers are incredibly simple with Node. The key with the server side is being able to hang inbound requests *whilst* also getting on with other work, like accepting more inbound requests.

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.write('<script>console.log("this is the start of the stream...")</script>');

  var timer = setInterval(function () {
    // if the connection has closed, and we can't write anymore
    if (!res.connection || !res.connection.writable) {
      // then clear this interval, and *attempt* to end the response
      clearInterval(timer);
      res.end();
    } else {
      // otherwise, keep sending a script with logging
      res.write('<script>console.log("and now more messages...")</script>');
    }
  }, 2000);
});

server.listen(8080);
```

This code is saved to `server.js` and run using `node server.js` and now I can visit `localhost:8080` on my machine, and it should start logging, in 2 second increments "and now more messages..." ([live demo version that writes to the DOM](http://lit-thicket-2959.herokuapp.com/)).

A comet server has a bit more to it, but with this simple few lines of code we can create as many persistent connection as we like and our server will continue to accept requests.

During the timeout, the server isn't "sleeping", it's *waiting* for the next event, be it the time it to fire, or for another request to come in.

Equally we can easily give the server *more* things to do with the single event loop. It could be collecting live prices from a server, or making APIs calls, or have its own scheduling task all inside the single program *because* of the way node.js is architectured.

What's particularly elegant about node.js today, is that it's incredibly simple to install, has first class support across all three platforms (windows, linux and mac) and is extremely well documented and supported by the community.

## Codifying into standards

As time passed, using Flash and various hacks to achieve real time eventually landed into the standards, typically under the umbrella term of HTML5.

That's to say, today we have *three* native client side solutions to communicating with the server:

1. Ajax & [XHR2](http://caniuse.com/#search=xhr2). Well known. Well loved. Well understood. The XHR2 spec takes the API further and gives us much more functionality.
* [EventSource](http://caniuse.com/#search=eventsource). Push based server *events*, that automatically reconnect when the connection is dropped.
* [WebSockets](http://caniuse.com/#search=websockets). Bi-directional, persistent sockets, that can be made across origin.

These standards are good because: all browsers implementing new features will implement these features in an interopable way. With the exception of EventSource, all these are supported by IE10 and all other browsers (and EventSource has excellent support through [polyfills](http://html5please.com/#eventsource)).

## So, what's next?

Now we live in a world where both the client side *and* server side has been solved and is simple to work with, what can we actually do?

Here's a few examples of where I've used node.js for real time:

- Live reload remote devices with user generated content (in JS Bin)
- Codecasting - like screencasting, but with HTML, CSS & JavaScript
- Remote console injection - for running a desktop console against any mobile device (like old Android or Windows phone)
- Proxy sensor events - streaming the accelerometer from a mobile device to desktop for testing
- User discovery - for a two player game waiting for each other to join the session (like two users joining a chat room)
- Push notification to browser for both progress events and when a long task has completed

A lot of this is made very easy with existing node modules developed by the node community, and stress tested by everyone else.

## Core npm modules

As I'm sure many of you know, the node module repository is rife with libraries to do just about [everything](https://www.npmjs.org/package/true). The libraries that handle real time communication have been baked, and run through the mill pretty hard and there's lot of good choice nowadays.

What's particularly useful about many of these libraries is that they provide both sides of the infrastructure required to achieve real time, and usually require very little to get started.

The two libraries that I would encourage you to gravitate towards are [Socket.IO](http://socket.io) (v1.x) and [Primus](http://primus.io).

### Socket abstraction

Normally I prefer to be quite close to the metal, and I generally code directly with the native APIs, but in this case, both libraries give me an abstraction layer that's *built upon*. This means if I want to multiplex or have specific events emitting on a socket, it's easy as it either comes with the library (in Socket.IO's case) or can be added via middleware (for Primus).

The benefits of each, as I seem them are:

- Socket.IO: will test and degrade down to the best technology to sustain a persistent connection
- Primus: provides a common low level interface to communicate with socket libraries and to "prevent module lock-in", but of specific interest is the middleware selection

For my examples, I'm using Primus with the `websocket` transformer.

## Primus

Primus used both on the server side and client side. I'm using express for my examples, so we bind Primus to the express http server:

```js
// setup express
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var Primus = require('primus');

// now instantiate primus with our express server
var primus = new Primus(server, {
  transformer: 'websockets'
});

// add the emit middleware letting me define my own event types
primus.use('emit', require('primus-emit'));

// when we get a connection...
primus.on('connection', function (spark) {
  // the socket is referred to as a "spark"

  // respond to ping events with a pong
  spark.on('ping', function () {
    spark.emit('pong');
  });
});
```

The client side is simple and small, and also has the ability to emit (rather than *just* `primus.on('data', fn)` and `primus.write(data)`) because the server includes the [emit](https://github.com/primus/emit) middleware:

```html
<!-- magic script provided by primus, note that -->
<!-- this can saved and served as a static file -->
<script src="/primus/primus.js"></script>
<script>
var primus = Primus.connect('/');

primus.on('pong', function () {
  alert('Pong received loud and clear');
});

primus.emit('ping');
</script>
```

That's it. The source for my [face-tap game is on github](https://github.com/remy/face-hit-game) and can be seen on [game.rem.io](http://game.rem.io) and be sure to try it whilst you have the [scoreboard](http://game.rem.io/scores) open.

The game uses Primus to communicate, but also includes a broadcast function to all except "me":

```js
function broadcast(event, data, source) {
  primus.forEach(function (spark) {
    if (spark.id !== source.id) {
      spark.emit(event, data);
    }
  });
}
```

## Scaling

This is a problem on both the server side *and* the client. The server side you want to use the same techniques you'd use for regular web traffic: [HAProxy](http://www.haproxy.org/), [node-http-proxy](https://github.com/nodejitsu/node-http-proxy), nginx, etc. [Nicholas Zakas has an excellent article](http://tech.blog.box.com/2014/06/node-js-high-availability-at-box/) on scaling with HAProxy.

### Client side

On the client, the issue is saturating the concurrent connections you can have per origin. The [HTTP 1.1 spec](http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html#sec8) states the following for persistent connections:

> Clients that use persistent connections SHOULD limit the number of simultaneous connections that they maintain to a given server. A single-user client SHOULD NOT maintain more than 2 connections with any server or proxy. These guidelines are intended to improve HTTP response times and avoid congestion.

However we know that [Chrome has increased](http://www.chromium.org/developers/design-documents/network-stack#TOC-Connection-Management) this default from 2 to 6 per origin. It doesn't matter what the per browser implementation issue is because they're all *quite* low.

One solution that I know of is (and I believe Facebook do this) is to generate a random origin address (usually of the CNAME) so your socket is connecting to `ws://e01938e4.example.com` and this is aliased back on to your socket server. This way you constantly generate a new origin for the socket to connect through and you don't hit the early limit of 6 (or so) concurrent connections.

### Server side

Once you scale horizontally with a proxy - or even just drag a Heroku dyno to 11 - you'll be asking yourself how does a socket connected to `server A` talk to a socket connected to `server B`?

The solution I've been exploring is using Primus' middleware combo of [metroplex](https://github.com/primus/metroplex) and [omega-supreme](https://github.com/primus/omega-supreme/) (yes, there's a Transformer theme!).

Metroplex registers your server in a Redis database (version 2.6 or above is required - brew seemed to ship 2.4) upon startup (which *should* auto unregister after 5 minutes of idle). That way you can query redis to ask what servers are also active:

```js
primus.metroplex.servers(function (err, servers) {
  console.log('other servers: %d', servers.length, servers);
});
```

Note that the address for the server is the same address as the webserver that your Primus instance is bound to.



## Long-latency real time feedback

One aspect that particularly interests me is long running requests. For example, when I created 5minfork (a site that clones a github repo and hosts it for 5 minutes), there's a point when the user requests to clone a git repo and there's a latency period.

This period length is unknown (i.e. we could be cloning a large project which takes time), but we do know that it's not instant. So how do we communicate to the user that work is in progress and *most importantly* tell the user that the work is done and they can proceed?

Easily with node.js.

[example]


## TODO

- scaling: more machines, haproxy, node-proxy
- auth: lift session off http request and add to socket - show example?
- ebay: real-time in shopping (how many people watching right now)
- github: someone commented (or pushed a change)
- Long polling is important for UX because you can communicate progress...5minfork.com - long tasks (forking on github, transcoding audio, video, parsing large jobs, etc)

















