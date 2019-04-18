---
title: "ToF: Touch"
date: 2010-04-29 15:19:08
tags:
- web
---

# ToF: Touch

From: [Thoughts on Flash](http://www.apple.com/hotnews/thoughts-on-flash/):

> Apple’s revolutionary multi-touch interface doesn’t use a mouse, and there is no concept of a rollover. Most Flash websites will need to be rewritten to support touch-based devices. If developers need to rewrite their Flash websites, why not use modern technologies like HTML5, CSS and JavaScript?
>
> Even if iPhones, iPods and iPads ran Flash, it would not solve the problem that most Flash websites need to be rewritten to support touch-based devices.

Ri-hi-ight. So I've written a few HTML5 mobile web apps. They do look great, and they work on more than just the iPhones, iPods and iPads - but that's not my gripe here.

Steve, you're saying that by using _just_ HTML5, CSS and JavaScript that touch events are just going to work?

Well, you've clearly not taken a "desktop" web app and moved it to mobile. There's the touch event system. Something that desktop browsers know nothing about. So if I want my app or game to feel responsive, I've actually got to response to a `touchstart` event instead of a `click` event. In fact it's pretty [difficult to control](http://remysharp.com/demo/reply.html?id=11319555134) how these events fire and whether you can cancel the click entirely.

What I'm saying it - it doesn't _just work_, you do have to write code to handle touch events.

[Faruk writes](http://twitter.com/KuraFire/status/13078060585):

> He never said it would "just work" with web technologies, just that IF you have to do new work anyway, why not use open technologies?

To which I [replied with](http://twitter.com/rem/status/13078197875):

> Like I said, I'm pro-open web, but for argument's sake, here's why: because your _entire_ codebase is in another language.

// originally via: http://remy.tumblr.com/post/558663481/tof-touch
