---
title: Clearing twitter
tags:
  - web
date: 2020-06-19
---

# Clearing twitter

It's no surprise that twitter and similar sink holes are constantly trying to "engage" you so you can be sucked into their void. As someone who believes that the web belongs to its users and I browse the way _I want_ I frequently change and block content on these sites so I can use them the way I would like.

So here's a quick share on how I'm doing that.

<!--more-->

This is a simple example of how _I think_ twitter can be improved - the picture below shows, highlighted in red, the "trending news" which really isn't news - or at least not news that I would recommend consuming. I certainly don't want to get my COVID-19 advice from the latest trending bullshit. More recently they have launched (possibly in split tests) a DM … "thing"? so I can use that to message people instead of…what, email? WhatsApp? Not sure. Anyway, it's shit that I don't need in my life, so it's getting ejected.

![](/images/clean-twitter.png)

Step 1: get yourself [uBlock Origin](https://github.com/gorhill/uBlock/) (the origin bit is important) available for [most browsers](https://github.com/gorhill/uBlock/#installation)

Step 2: use the right click - block element picker to stop content from bothering you

When you fire up the picker, you'll notice that Twitter (and other sites that don't believe in writing actual CSS classes) are using something to generate their CSS, which makes picking element using CSS selectors tricky.

Except, the trick is to look for aria roles or even data properties. As much as I dislike these big companies, they _do_ try to support a broad range of users via good use of accessibility and we can use that to our advantage.

![](/images/picking.png)

The uBlock Origin element picker will need a selector like `##div[aria-label="Timeline: Trending now"]`, I'm not sure what the double hash is about, but it works.

So now we can surf web pages the way _we want_.
