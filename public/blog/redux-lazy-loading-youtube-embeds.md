---
title: "Redux: Lazy loading youtube embeds"
date: '2019-08-09 12:00:00'
tags:
- code
---

# Redux: Lazy loading youtube embeds

There's a great [pragmatic post on dev.to](https://dev.to/haggen/lazy-load-embedded-youtube-videos-520g) (that [Jeremy's link](https://adactio.com/links/15611) feed put me on to) on how best to embed youtube on your site, specifically to avoid the amount of scripts and tracking that's sent over the wire to your visitor.

The trick Arthur Corenzan uses in their solution is to use `srcdoc` to let the visitor click through to an embed version of the youtube video.

But then there's the IE11 visitor…

## Support

Myself, I've got a long and potted history with iframes (with JS Bin and many other tools) so when I see `srcdoc` being used I'm always partially pleased and partially sceptical.

A quick check on [caniuse](https://caniuse.com/srcdoc) shows that `srcdoc` is well supported. Opera Mini has no support, but that's to be expected (as it's a proxy-type browser) then it's IE11 and all Microsoft Edge versions prior to Microsoft's move to Blink as their render engine.

What does that mean for this `srcdoc` trick? Well, it means there's no meaningful link to follow. IE11 sees an iframe, but renders it empty.

Does IE11 matter? It shouldn't, but it does. My own blog, a technical and personal website still gets about 1.5% of traffic from these Microsoft browsers (oddly IE11 is the largest chunk). If this method were a progressive enhancement I wouldn't worry about it, but the content is simply inaccessible to the browser and the visitor.

The fix thankfully is simple though there's a consideration that I'll return to. As per the [W3 specification](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-iframe-element):

> If the `src` attribute and the `srcdoc` attribute are both specified together, the `srcdoc` attribute takes priority. This allows authors to provide a fallback URL for legacy user agents that do not support the `srcdoc` attribute.

That's to say: reintroduce the `src` attribute and it all works again.

There is another trick that you might have considered and that's to use `data:text/html…` on the `src` property. I tried that (instead of using `srcdoc`) and IE11 has a bit of a wobbly over it, so it's not viable.

Here's IE11 (from [browserling.com](https://www.browserling.com/)) rendering [my tweaked version](https://remy.jsbin.me/wispy-meadow-453/) of Arthur Corenzan's work:

![IE11 failing to render srcdoc](/images/ie11-srcdoc.png)

This works but there's an ethical consideration: do you penalise users with old browsers?

The first is that the older browser is sent _more_ bytes (and thus CPU processing) than the newer browsers. I'm going to guess there's a correlation between age of browser and age of machine it's running on too. That means users with older browsers are penalised.

The flip side is that before Arthur Corenzan's `srcdoc` trick, those users were doing the same amount of work. So arguably their experience hasn't changed. Minimum requirement: works as it always did 👍
