---
title: 'FFConf 2026 is live: Things I Learnt'
date: '2026-06-18'
draft: true
tags:
  - code
---

# FFConf 2026 is live: Things I Learnt

As with each year for the FFConf web site, I have a distinct idea of the visual style I want. It has zero to do with the content we're presenting each year, but I do love how FFConf's site can be creative.

It was like that from the very first web site - the logo was designed in early 2009 in 12 variations (which you can see from years 2009, 2010 and 2011 before they were _really_ redesigned).

Before I (inevitably) forget, it made sense for me to write up some of the things I learnt along the way now that the [2026 web site is live](https://2026.ffconf.org/).

<!-- more -->

I think [Chris Mahon's](https://chrismahon.com/) did an excellent job with his translation of my mood board into Figma pages.

The spec this year was a fanzine style, which is a very tactile paper based medium, which doesn't always translate well to digital. The actual visual impetuous came from the (very fun) Running Man remake, the credits in particular:

![Screenshots of the credits of Running Man that look like the credits are pages from a physical fanzine, hand copied and pasted and then photocopied over and over](/images/2026-mood-board.avif "A series of screenshots from the credits of Running Man 2025 which I used as my mood board")

## The CSS

It's very likely a lot of this (`clip-path` for instance) have been around for ages. But my client work has been almost exclusively on API backend design for the last 4 years or so, which means FFConf is usually the only time I get to work in the front end to a specification.

- `writing-mode: vertical-lr` - thank you Ana
- `nth-child(odd of <selector>)` 🤯 did not know, this meant I could include elements at the same level, but only pick those of the same specific type, `&:nth-child(odd of .speaker-card)`
- `shape-outside` floating the element and having the text shape around the element, in particular the cutout of the speaker photos
- Firefox interactive polygon devtools
- `clip-path` letting me create the sharp angle shape on the footer
- `@media (prefers-contrast: more)` allowing me to support a stronger contrast (since there's a lot of greys in the final output)
- Styling the `::placeholder`
- Styling based on a CSS variable with `@container style(--high-contrast: 1)`