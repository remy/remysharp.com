---
title: Polyfill is not Progressive Enhancement
date: '2013-04-02 11:03:47'
modified: '2014-09-24 16:31:01'
draft: true
---
# Polyfill is not Progressive Enhancement

Jeffrey Zeldman once [wrote](https://twitter.com/zeldman/status/124928936579842049):

> Polyfill: a heap of JavaScript dumped on old browsers to give them text-shadows. (Try progressive enhancement instead)



<!--more-->

What spurred me to write this post, and is particularly important to me, is the message that's being sent out. If polyfilling truly was just heaping JavaScript in to old browsers, then it would be a **bad idea**, and should be abandoned. Entirely. I wouldn't encourage using the process at all. But it's not that at all, and the suggestion of using progressive enhancement is correct, *but incorrect as an alternative method*.

That said, the polyfill approach has been misunderstood before. One particularly [frightening post](http://blogs.computerworlduk.com/facing-up-to-it/2011/10/using-polyfill-to-cover-up-the-cracks-in-html5/index.htm) I came across included this:

> For me a big concern is that I've not yet been able to find a single provider that gives you polyfills for the whole of HTML5, or even the majority of the specification.

/me slaps forehead.

## A polyfill for the WHOLE of HTML5

Yeah, that's never going to happen. Or at least I *really, really* hope not. **This** is bad. Having a polyfill for all of HTML5 is the equivalent of styling all your sites like an early MySpace page - using EVERY SINGLE CSS PROPERTY IN THE BOOK.

With HTML5 and other technology, you cherry pick the right parts for your problem. Same with CSS. You use what you need. You don't need rounded corners and text shadows on EVERYTHING. Nor do you need a polyfill for everything - because you're not using EVERYTHING.

## "Try progressive enhancement instead"

Let's ignore polyfills for a second. And let's ignore the simple fact that really, honestly, you shouldn't need to add JavaScript to provide a text-shadow - because, you know, no one ever didn't buy your product because it didn't have a drop shadow.

Let's say you're using *progressive enhancement* to add text-shadows to IE.

That would be done with JavaScript. You'd call a special function called, `enhanceShadowsWithUnicornDust`. Perhaps it's your own masterpiece, perhaps some code from GitHub. But a JavaScript call is required here. The key is that obviously this is progressive enhancement and so if JavaScript isn't available the web site is still readily usable.

Now let's use a text-shadow polyfill.

Without the polyfill, the content is still available. With the polyfill, it applies text-shadows. But instead of writing some specific piece of JavaScript to render the text-shadow (which would be required in the example above), a polyfill will work by looking at the CSS and using your original CSS expressions and values to apply the text-shadow. No additional JavaScript. Most importantly, the polyfill *doesn't* apply if there's native support for text-shadows.

Now, the *only* downside I can see is the CSS "looking" part. The obvious approach is a CSS parser - and a parser running in IE6, IE7 and probably even IE8 isn't going to be an added extra you want.

Someone else pointed out: polyfills are much more valuable in the API world rather than polyfilling CSS - because you need to parse the CSS to understand *where* to apply the new effect.

However, point I'm making here is that a polyfill can be, and most *are*, written with a progressive enhancement in mind. Then it's over to the developer to think about progressive enhancement because you need your web site to work without style or behaviour and that's typically bespoke to every web site.

It's not "try progressive enhancement *instead*", but progressive enhancement should *come free with polyfills*.

## A closing thought

Don't write a CSS parser *just* so you can polyfill text-shadow. That's just stupid.

Do use polyfills applied at the server side during the build process, something like autoprefixer or Myth - which does polyfill, but does it before the user even sees a byte of your code.
