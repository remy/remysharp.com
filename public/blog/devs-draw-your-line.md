---
title: Devs: draw your line
date: 2025-03-08
tags:
  - web
---

# Devs: draw your line

This post is for my developers out there, web and otherwise. We have super powers. We can make something functional from practically nothing. And you know what they say about [great power](https://duckduckgo.com/?q=with+great+power)…

So this is short and sweet: know where you draw the line and stick to your god damn guns.

<!-- more -->

## A case study

For repeat prescriptions I use a site called [Pharmacy2U](https://www.pharmacy2u.co.uk/) (who took over for Lloyds Pharmacy for fulfilment … I guess). The terrible name should be a give away to the quality of the site, but really for repeat prescriptions the web site interaction should be limited to: email alert, click, pay, close.

I've recently been browsing the web using the [NoScript](https://noscript.net/) extension and deciding manually which scripts to enable (a point to note: nearly all checkout I've encountered requires JavaScript).

It was because of this script that I noticed that some developer, somewhere in the stack that put together the Pharmacy2U web site decided it was okay to share data with Facebook and TikTok.

I can understand (nearly) wanting to find where a business' traffic is coming from. Perhaps they're writing articles about health and wanting to track metrics (or something).

However, these 3rd party tracking scripts were on the prescription pages. The pages that list what medication I'm on.

Facebook and TikTok had been given access to read what medication I'm on by the development team responsible for the Pharmacy2U web site.

If that's you, sorry-not-sorry, but **shame on you**.

## Stop making our failing privacy worse

As developers we're the ones that control whether these tracking scripts are included. We're the ones responsible for the security of our user's content. Some content is _obviously_ more sensitive than other data. This _should_ be common sense.

Regardless of whether developers specifically inserted the tracking scripts into the medication pages, or if they developed a CMS of sorts that let's someone insert the scripts into pages - it's still software that we developers made.

Analytics in and of itself isn't bad. Putting scripts that gives unfettered access to medical information is wrong. I suspect this also puts some individuals at risk too.

Take a stand, draw a line, and stick to it. Businesses and capitalism will want to move that line, give it some _wiggle room_, but fuck that. You're not a bad person, you're just doing your job, but as a developer, like I said, you have super powers. Use them. Stop enabling this gross misuse of software.

## Epilogue

Even though Google very recently removed the excellent [uBlock Origin](https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?pli=1) - it's still very much alive to [block trackers](https://ublockorigin.com/) where the don't belong.

Equally, for me, using [NoScript](https://noscript.net/) blocks these in my desktop browser, but I also use [Pi-Hole](https://pi-hole.net/) in our home network, and I've been considering using [NextDNS](https://nextdns.io/) for my mobile outside of my home network.

So, thankfully, I'm protected, but that's only because I've got the super powers too. Mum and Dad aren't protected in the same way. I'm fairly sure my siblings aren't either.

It's a weird situation we've gotten ourselves in that we're having to actively fight to have a safe web.