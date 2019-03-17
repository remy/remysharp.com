---
title: Broken Offline Support
date: '2011-04-19 19:07:20'
published: true
tags:
  - code
  - html5
  - javascript
  - offline
  - rants
modified: '2016-09-30 12:21:09'
---
# Broken Offline Support

The state of offline detection in desktop browsers is broken and it needs to fixed or at least get better, but I can't see this happening unless we push against the browser vendors to fix this.

Currently, as of April 2011, offline and online events are broken, as is the navigator.onLine property. The only exception appears to be WebKit/MobileSafari on mobile (though I've only successfully tested Android's 2.3.3 and iOS 4.3). Here's the test url: <a href="http://jsbin.com/otudo5/1">jsbin.com/otudo5</a> (<a href="http://jsbin.com/otudo5/1/edit">source</a>)

<!--more-->

# Browsers support these events, don't they?

All the browsers support these events...in a way. In fact, even IE has good *broken* support for these events for a long time now (pre-IE7?).

When the browser goes in to an offline mode, it'll fire the offline event. This is currently supported in Opera, IE and Firefox. When the offline event fires, it switches `navigator.onLine` to read `false`.

So if this is the state of support, what am I getting my knickers in a twist for? *How* they get in to "offline mode" is the problem.

# Work Offline

The browsers I've listed to having an offline mode, only trigger the event when the end user decides to hit the "file" menu and then select the "Work Offline" menu item.

**This is not the way this event should work, and it needs to be fixed.**

If I'm sat on a train, with a 3G connection to the web, and I run through a black spot of connectivity, I expect the offline event to fire, indicating to the web app that I'm using to run offline. As a developer, I need to be able to handle this event.

# Do we really need the event?

Actually, no, but it's misleading to developers to see these events in the HTML5 spec. At the very minimum we need `navigator.onLine` to work properly.

There is no situation in Safari & Chrome (i.e. WebKit) that you can get `navigator.onLine` to return `false` - that's pretty darn broken.

# Could we do without these events?

I *think* so.

It would seem to be easier to drop these events from the specification and only support navigator.onLine properly. The problem with the events is that they need something to poll, somewhere to check for connectivity. Polling isn't great, and I can understand that. Equally, *what* do you poll? A service could go down. Sure Google *probably* isn't ever going to go down...but it might.

How important is it to suddenly announce to the user of your web app "OMG, YOU DON'T HAVE THE INTERNETS!"? I think it's more appropriate to handle a user initiated activity that requires the Internet with a test against navigator.onLine (where the offline appcache doesn't already handle the process for us).

It should be straight forward to change `navigator.onLine` to run a blocking test for connectivity. 

I've managed to write something similar for [Chrome that polyfills `navigator.onLine`](https://github.com/remy/polyfills/blob/master/offline-events.js):

    navigator.__defineGetter__('onLine', function () {
      // test the connection using try/catch with XHR 
      var onLine = false;
      // make sync-ajax request
      var xhr = new XMLHttpRequest();
      // phone home
      xhr.open('HEAD', '/', false); // async = false
      try {
        xhr.send();
        onLine = true;
      } catch (e) {
        // throws NETWORK_ERR when disconnected
        onLine = false;
      }

      return onLine
    });

The reason the polyfill doesn't work with the other browsers is because they either don't throw a `NETWORK_ERR` on the XHR request when the network is down (This is part of the XHR spec, so that's broken too), or in Safari's case, you can't overload the onLine property. 

If my XHR *hack* worked in the other browsers, I wouldn't be so frustrated with browser support for these events. But it doesn't fully work, so now the only alternative is to call for browsers to fix their offline event and/or `navigator.onLine` support.

If you work for a browser vendor, please can you get some eyes on this issue. We developers want to build apps that work correctly without the web to run on your browser, so help us to make it the best it can be.
