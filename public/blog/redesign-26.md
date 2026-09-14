---
title: Redesign '26
date: 2026-09-14
tags:
  - fonts
  - css
  - web
---

# Redesign '26

Around June this year I decided that I wanted to spruce up my blog. I had landed on [Elliot Jay Stocks](https://elliotjaystocks.com/blog/spotify) and [Jon Hicks'](https://hicks.design/journal/jacket-app) web site and it really made me want to get my blog to something I'd consider visually appealing.

I do know that I've set the bar way, way too high by looking at their sites. Specifically because if you're reading this on my website (and not RSS), you'll know design is not my strong suite. Grey is. Boxes and grey.

Given that my [last redesign was 18 years ago](/2008/02/29/new-blog-design), I'm hoping I've learnt a few design tricks along the way.

<!-- more -->

## My tick list

There's a few main points I want to hit:

1. Font selection. I want to be intentional. I also want a serif font for the article body, and a sans-serif for the UI element of the site. I'll come back to this.
2. I want to make much better use of horizontal space. My desktop monitor is stupid wide and a single column of content looks a bit dwarfed - whilst equally I don't need inline photos to fill the entire screen.
3. I want to keep some aspect of motif from my current design and pull it across.
4. Ideally absolutely minimal changes to the structure of the code - I want to try to keep in the land of CSS and not faff with changing layout of the underlying markup.
5. Modern CSS and a lot less of it. I currently use [{less}](https://lesscss.org/) which was mainly for variables and nesting. 18 years on, this stuff is part of CSS, so it's one less tooling item.

It's only been a week of tinkering and so far I've found fonts (I hope) and I've settled on something resembling a colour scheme.

## Colours

Just as my current site has right now, I started off with a light and dark colour theme.

The first hurdle was that I wanted to keep my background image, I didn't have a "light" mode version of the image. The image being a series of gradually fading cubes that skew out from the top left corner to bottom right. None of the cubes are the same size, and technically they're trapezoids.

The image, probably the closest thing I'd say is a motif even though I'm sure most of you haven't noticed, was created during my commute home from London to Brighton nearly 20 years ago.

I was using [Pixelmator (classic](https://en.wikipedia.org/wiki/Pixelmator), which of course I don't have the original file for any more and I really remember just messing around with effects - so I've never been able to replicate it.

But then because I was working on the website in the evening, it quite often switched to dark mode and I got really used to the dark mode - and the issue with my original background image vanishes because the image background is black.

There's been a flurry of conversation about light/dark toggles from the web community ([Lea Verou's posts](https://lea.verou.me/blog/2026/dark-mode-toggles-2/) being the best source of conversation and coverage), but I still firmly stand by the assertion that the best choice is no choice.

With this in mind, I finally settled (maybe controversially) on _no light mode_. Just dark. No toggle. No theme. Simples. Intentional.

I had also picked out the orange from avatar (found at the bottom of the site linking to Bluesky) as my main accent - for links primarily (and because I really like strong orange), I think it looks strong.

![A screenshot of the blog, dark black background, slightly off white text set in a serif font and a hazmat orange for links](/images/redesign-26-text.avif "I appreciate this looks pretty bare at this point, but this is my base.")

## Picking fonts

I've been all over the shop with fonts. I've lost track of the sites I've visited, and I was completely open to paying for a font (strong believer in supporting artists where I can), but I never found anything that sat quite right.

I'm not entirely sure I'm completely settled, but right now, the fonts I've got are:

- Noto Serif for the article content
- Libre Franklin for the UI elements (footer content, welcome text)
- Victor Mono for code _and_ headings

I also intentionally picked fonts that all had variable functions, ideally around the weight. Initially I'd downloaded the ttf files from [Google Fonts](https://fonts.google.com/) but the footprint is pretty big and I didn't understand why I was serving ttf instead of woff2.

One search later, I was converting the files from 200kb+ down to 80kb. Still pretty big I think, but a lot better.

Then there was Noto Serif (with the italics) was weighing in a 1.8mb. Not cool. I found some code that could strip out a lot of the extra glyphs that I didn't need and it got the total down to 80kb a nice saving of 1.72mb.

I also wanted a few tweaks to the Libre Franklin - I wanted `tabular-nums` and it doesn't include them (I use this in the column of years in the footer), and I wanted to add support for variable X height on the Victor Mono.

I'm not familiar enough with how font internals work (yet!) so I tried some generated code against it and it seems to work (I need to give this a detailed test to be sure), but here's the scripts if anyone is interested: [glyph-reducer.sh](https://gist.github.com/remy/e178c21675f13439d7fd74595ef45215#file-glyph-reducer-sh), [add_tnum.py](https://gist.github.com/remy/e178c21675f13439d7fd74595ef45215#file-add_tnum-py) and [add_xhgt.py](https://gist.github.com/remy/e178c21675f13439d7fd74595ef45215#file-add_xhgt-py). Worth adding: I've only tested on the specific fonts I'm using - your mileage may vary.

---

I'm far from done. The root/homepage is an absolute mess (with a horizontal scrollbar 🤢), and I really need to think about the navigation I had (I'm probably going to relocate it).

It's definitely frustrating because I know in my mind what looks good, but I'm not quite able to transfer that to the browser. Let's see how long this takes me!