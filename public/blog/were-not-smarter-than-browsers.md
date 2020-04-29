---
title: "We're not smarter than browsers"
tags:
- web
date: 2020-04-29
summary: "Enhance the browser, don't reinvent."
---

This morning during performing another search through npm for the package that matched my needs, I was feeling lazy and didn't want to type "npm i x" - thankfully npm provided a helpful "click to copy". And that's where it went wrong.

<!--more-->

I recorded a [video of my experience](https://www.youtube.com/watch?v=nnD0-h7fVEg) and this is part transcript, part conclusion, part repeating the obvious.

---

Look when you disable user-select or try to disable right-click on your web page and you're not only breaking the accessibility the page, but you're also making the rather bold statement that _your code will **never, ever** break_.

It seems too much of a risk.

This morning's npm visit was an excellent example. I wanted to copy the text, so I hover over "npm i chart.js" and it says briefly, if I catch it, "click here to copy" but mousing over the copy not doing anything, and indeed "clicking here" when I check my clipboard has not copied anything.

I'm clicking, but it's not copying.

Okay, bugs happen, clearly the copy button doesn't work. Instead let's select this text and just… copy? Nope, no, I can't select the text.

In fact, this is the one bit of text on that page that has been intentionally disabled for selecting, because we think as "web developers" we are smarter than the user and there's no way our code will ever break.

Well, I have news for us web developers: we are fallible. Our code will break.

So let's not break intentionally break accessibility features the browser works so hard to provide the user.

Stop preventing select - selecting text is useful both for copying, but also for reading text (see dyslexic users).

Stop not using buttons - buttons are clickable and we forget to add aria roles.

Stop reinventing links - they're magic and [our versions](https://remysharp.com/2019/04/04/how-i-failed-the-a) are rubbish.

Stop [scroll jacking](https://chrome.google.com/webstore/detail/no-more-scroll-jacking/fpialmplgijjacabejjgheeifmfamjcd) - it's squarely in the the uncanny valley, and often scrolls to fast for content to be properly read.

Let's stop thinking we're smarter than the browser.

Enhance the browser, don't reinvent.
