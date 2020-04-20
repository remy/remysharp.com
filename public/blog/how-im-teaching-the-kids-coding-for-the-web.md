---
title: "How I'm teaching the kids coding for the web"
tags:
  - web
date: '2020-04-20 09:00:00'
summary: Analogies for teaching web
---

# How I'm teaching the kids coding for the web

Early this year (pre country-wide lockdown), my son, 8¼, asked that I start doing "Coding Mondays" with him and his sister (then 5½). Though the littlest wasn't so interested in programming (though she had some fun with BASIC, as story for another day), so far the boy has managed to make his own web site and start to get to grips with HTML and CSS. JavaScript is much further away, but he does also have the ability to publish all his changes entirely himself.

I thought it might be interesting to share how I'm explaining things to them, because they both seem to really understand it (or they're possibly just as bonkers as me, and random logic makes sense because decoding random is in their DNA… ¯\\_(ツ)_/¯ )

<!--more-->

## The tools

Initially they were both using [JS Bin](https://jsbin.com) for HTML and CSS. This worked well because it focuses entirely on HTML at the start and they got real time feedback, along with a bit of code completion (as they were using the unreleased v5). There's the obvious added bonus that when I explained that _I had written_ JS Bin - the code that they were typing _their_ code into, it both blew their minds and made me rather chuffed.

The workflow would then be: download the file from JS Bin, send it from their Chromebook (a freebie from my upgrading my phone) using [Snapdrop](https://snapdrop.net/) (a really great wifi file drop utility) to _my_ machine, I would then put that in a directory and drag and drop into Netlify to release to his web site. This wasn't so bad, but was a little limited and brittle.

As the lessons continued, I decided to move up from JS Bin to [Glitch](https:/glitch.com/) - this way the boy could make new files, directories and upload images. Once he was using Glitch, I then wired Glitch up to [Github](https://github.com) and showed him how to _Export to Github_.

Now that he can export, I connected Netlify to the repository that he was exporting to and all of a sudden he has continuous deployment from a little export button in Glitch - and he's able to make new pages, change things, edit text and more. It's very cool (if perhaps complicated!).

## The foundations of understanding

There's no point in trying to explain from the outset what HTML is, how it works over HTTP, about browsers and the DOM, let alone CSS, the cascade, specificity and more. It's a slow layering of knowledge acquisition for them.

So here's how I explained it.

I loaded up a browser and explained that "this is a web page". It's like a person in some ways. The bones are the HTML. Each bone has a name, we call them tags (or elements). Each bone does it's own special thing, like the `<p>` tag/bone will show some text.

I showed them a handful of web pages with all the styles removed and showed them that "this is the skeleton of the web page". All bits of text and angle brackets. The bone have names and they hold the bit of content.

But then, when we put the styles back, this is the skin over the skeleton. It's what makes each website look unique. Some can have different colours, shapes, heights and more. So the skin and the paint on the skin, this is CSS.

I explained that CSS is written differently from HTML, and keeping with tag only selectors showed how the _name_ of the bone/tag is specified. For example: we want the foot bone to have a border. The syntax is simple enough that he's able to write the CSS selectors, property and values without prompting. He obviously does not know all the property types, but he's collecting them and writing notes in a book he keeps by his bed.

Finally, the brain and behaviour, the way the website can be interacted with is using the third layer: JavaScript. A brain is a complicated bit of machinery so we've not worked up to it yet, but they understand it with relation to themselves.

Just today the boy was trying to recreate a "spy agent ID card" with web (on my behest over doing it as a Google Doc), and he ended up with two `div`s that he needed to style differently, but the border he had used was (incorrectly) applied to both `div`s - because so far he only knows about element selectors.

So I introduce the `class` property to the HTML tags, and I tried to explain that the `class` property lets me group tags together. Immediately he pipes up with:

> Like a classroom, if I want to select all the children my class, it's called Feathers, so it's the feathers class.

Wow, yes, exactly like that. Element selectors are like: children, teachers, parents, etc. Class selectors are like grouping as "year 1 teachers" or "Feathers children" class, and then I explained we could be even more specific and name the unique individual, known as an ID.

Now he has a basic understanding and grasp of CSS selectors and the first layer of specificity.

I'm genuinely not sure how or whether I can simplify JavaScript in the same way, but for now they both play around with [Scratch](https://scratch.mit.edu) and I think that's enough for the time being.
