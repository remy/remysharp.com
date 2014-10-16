# Debugging events in devtools inspector

I'm a big fan of event delegation and binding events at the `document` level, but recently discovered a tiny tweak to my workflow that makes debugging much easier.

TL;DR: bind to `document.documentElement` not `document`.

<!--more-->

In the screenshot below, you can see the list of events that are bound to the root element, but notice in the screenshot below (taken from Firefox Nightly devtools) that the `mousemove` event listen is not listed:

![missing mousemove listener](/images/ff-devtools-events.png)

However, simply moving the event listener to the `document.documentElement` (or `html`) instead, you can now see the listener which makes things just a little easier to debug:

