---
title: "Transforming text"
tags:
- code
summary: Take a glob of text and apply a series of rules until you have the structured JSON you want.
date: "2019-09-02 11:00:00"
ad: terminal
---

# Transforming text

During the weekend I spent an hour coding a hacky bit of code and I thought it might help one or two other people so I posted it on Twitter (on Sunday at 10am UK no less) and [the response was…surprising](https://mobile.twitter.com/rem/status/1168095658638749697). I genuinely thought it would only serve me, but some 120+ retweets and 800+ likes it seems like others found a use too.

Since twitter is rather ephemeral, it made sense to post on my blog (a bonus for all you [RSS users](/feed.xml) 😉).

<!--more-->

## What is it?

🔗 **[https://transform.isthe.link](https://transform.isthe.link)**

This tool will take a glob of text - an example might some copied data from a browser - and you apply a series of rules to the text until you have the structured data you want.

[![Transform in action](/images/transform.png)](https://transform.isthe.link)

It might take a bit of playing around with, and frankly the code behind it is fairly messy, but it does the trick.

## Why?

Before the haters pile on, I absolutely do use command line tools to do string manipulation. I have a whole [course on the command line](https://terminal.training/?coupon=READERS-DISCOUNT) ($80 off with "READERS-DISCOUNT" coupon) and I absolutely did run the original problem through a pipeline of `awk`, `csvjson` and `jq`.

The command line is absolutely fine, but sometimes it's nice to have a webgui to show me what's going on and to perhaps be a little friendlier to a user (though I'm not sure my solution is friendlier - it's fairly bare if I'm frank!).

But that's why. It took me an hour to hack together (you can still see the JS Bin specific runner code in the [source](https://github.com/remy/transform)) and probably another hour to make nicety tweaks (like grid for layout, memorising URLs, etc).

If you're interested in seeing more of my random micro projects, I tend to put them on [https://isthe.link](https://isthe.link) - with links to the source where worthwhile.
