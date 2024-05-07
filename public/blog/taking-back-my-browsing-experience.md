---
title: 'Taking back my browsing experience'
date: '2024-05-01'
draft: true
tags:
  - web
---

# Taking back my browsing experience

The web has changed, a lot, over the last 3 decades. There's certainly more web sites for one. The quality has vastly improved by comparison. Calling it the "wild west" back then is probably giving the early web too much credit.

But our expectations were low back then. Heck, I remember hearing web addresses on the radio and it sounding more like verbal diarrhoea - so you were lucky if you even knew _where_ the web site was, let alone UX being a factor.

Then we had the growth years and now we're here. Most web sites I come across look fully formed, well crafted UI (even if the UX sucks), usually partial loading (making Ajax feel proud) and generally of an average standard. Or… possibly you just see a lot of polished turds.

Still, as much as these sites are a grown up version of visiting businesses, the entire experience is marred by just a terrible fight for your attention (which to me seems stupid since we're already engaged by _being_ on the web site).

Twitter is one site that hurts to visit. Multiple attempted distractors to get me to either upgrade, or engage in random brands or follow completely unrelated twitter accounts. This has mostly lead me to only visit the site perhaps once a fortnight.

Spotify is another classic. A music site that's hell bent on pushing podcasts, TV shows and audiobooks on us. Maybe that's your bag, but there's no preference for me to say: just music please.

Then there's the ungodly number of cookie overlay modals and "your cursor went too close to the edge of the page"-sign up to our newsletter.

Or scroll jacking.

I'm going slightly off topic here, but mobile phones are particularly guilty of this. We, the consumer, pay good money for a phone and it's software. Then, we're left with software that we can't really control. I'm not after super-hacker nonsense, I mean something simple like: delete the iOS stocks app. We don't really own the tech that we own…

I don't think this is an acceptable situation. I think that we're smart people. I think we should create our own tools to _fix_ our own browsing experience.

What follows is a mix of practical take-aways that you can do today, some more technically complicated processes and some theory that, makes sense in my head, but I'm not sure what the implementation details are (yet).

I'm going to talk about two tools, but they're by far unique - there's many similar tools that do the same thing that I'd encourage you to use.

What these tools boil down to are two things:

1. Inject CSS and modify the display
2. Inject JavaScript and modify the behaviour

Doing this at a single browser level is very easy today: browser extensions.

Doing this a the point of the internet entry is more complicated, might require bespoke hardware, but ends up being the silver bullet.

Let's start with modifying the display.

![Twitter before modification](/images/take-back-the-browser/twitter-pre.png)
