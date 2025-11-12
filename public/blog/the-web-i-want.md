---
title: The Web I Want
date: 2025-10-11
draft: true
tags:
- web
---

# The Web I Want

Over the years I've seen efforts by the open web community to coalesce over the standards we wanted browser vendors to provide us. The events page on [webwewant.fyi](https://webwewant.fyi/events/) gives you an idea of the momentum our efforts have…

Though I appreciate standards and great features are a good thing to make a noise about, over the years I've come to realise the web _we_ want is slightly different to the web _I_ want.

So, what do I want from the web? And I'll be upfront right here, it's _not_ the web, it's my access to the web that I want to influence.

<!-- more -->

## TL;DR

Given that I own the device I'm visiting web sites, I want to be able to full modify everything about the web site I'm viewing. For my own customisation. The same way that I cover my bicycle with stickers, add Spokey Dokies or change the brakes and add a horn.

To have full control requires three things:

1. Control over the style via CSS.
2. The ability to modify interactivity via JavaScript. Though this is a little more complicated (see later on in my post), and potentially not as important.
3. Be able to modify network requests, either to prevent content/ads loading or to modify the data, such as stripping podcasts and audio books from the web interface of a music player like Spotify.

This should work both on desktop (which is significantly easier) *and* mobile, regardless of the platform. A bonus would be to have this same control over "native" apps installed.

I've got a few working solutions, but not to everything, and I'd love to read your ideas and suggestions.

## Hiding content and modifying styles

The [user origin](https://www.w3.org/TR/css-cascade-3/#cascading-origins) stylesheets - the reason we have `!important`, defines that a browser vendor will first apply their system styles ("User-Agent Origin "), then user-origin styles - i.e. ones we, the individuals can write, then apply the web site hosted styles ("Author Origin") - i.e. the stylesheets in the markup.

Except that zero browsers support this feature any more. However there's a number of browser extensions that brings this back. Today I use [Stylus](https://add0n.com/stylus.html) which does also have a nice sync feature.

I have this (constantly) work-in-progress stylesheet that removes distractions from web sites ([userstyles.world](https://userstyles.world/style/24594) / [gist](https://gist.github.com/remy/b16e40efdf2b901a769104530bbd12a5)) - I use it so that I can nuke annoying popups, so it's always growing with new selectors.

Although Firefox is my daily desktop driver, for some reason I use Brave on my phone. Brave, along with Chrome (and I'd guess other Blink based browsers) doesn't support extensions (and they don't support user origin styles)