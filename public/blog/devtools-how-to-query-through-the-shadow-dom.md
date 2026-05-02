---
title: "devtools: how to query through the shadow DOM"
date: 2026-05-01
nosubscribe: true
tags:
  - code
---

# devtools: how to query through the shadow DOM

This is a literal TIL but was so handy I had to put it my blog so that I wouldn't forget it later.

[Thanks to](https://bsky.app/profile/keithamus.social/post/3mkqqbxnnys27) Big Brain Keith Cirkel for sharing this.

As (hopefully) you know, there's the `$` and `$$` functions in devtools. For `querySelector` and `querySelectorAll` respectively.

Well there's _also_ `$$$` to query _through_ the shadow DOM. This means the query will cut through and into the nested DOM inside of the shadow DOM making it _much_ easier to navigate and search for elements when debugging or styling.

Begs the question: what's going to be lurking inside of `$$$$` in 5 years time!

*[TIL]: Today I learnt