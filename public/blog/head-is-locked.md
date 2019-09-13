---
title: head is locked
tags:
- web
date: 2019-09-13
---

# `head` is locked

Yesterday I [posted a little historical insight](https://remysharp.com/2019/09/12/why-some-html-is-optional) into why the closing `</p>` tag is optional, but in passing I mentioned you'll not see any new elements proposed for the `head` element.

Though I can't refer to any specifications (partly because I'm writing this from a gym treadmill!), here's the reason why.

<!--more-->

It was the good young Mr Harry Roberts who [called me out on twitter](https://twitter.com/csswizardry/status/1172117050791276544?s=19). 

The reasoning is obvious once you see it, and I'll have to pass credit to Jeremy Keith for making me realise why.

You won't see new elements added to the `head` element because the parsing algorithm only allows for title, meta, style, script, base and link.

Today, if your browser spots anything else in the `<head>` tag, it'll land in the `body` element in the DOM.

You can see this happening in Hixie's DOM visualisation tool - the "invalid" positioned element gets [tossed out into the body](https://software.hixie.ch/utilities/js/live-dom-viewer/?%3C!DOCTYPE%20html%3E%0A%3Chead%3E%3Ctitle%3EOk%3C%2Ftitle%3E%0A%3Cp%3EHello%3C%2Fp%3E%0A%3C%2Fhead%3E%0A%3Cp%3EYo!%3C%2Fp%3E).

If a new element was created to go in the `<head>` all existing instances of browsers up to that point would eject the element into the body and it would mess things up.

This would completely break the backwards compatible feature of HTML, which, as we've seen, hasn't happened yet.

For this reason, you'll find the `link`'s `rel` is repurposed ALL the time (link rel="preconnect", etc) to get around this problem.

So, that's why `head` is locked and you won't see new elements designated beyond the `body` element.

_Written from a treadmill on my 41st birthday, so you'll forgive any typos 😉_
