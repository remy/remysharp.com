---
title: Thoughts and learning from ffconf 2017
image: /images/ffconf-2017/day2.jpg
date: '2017-11-17 14:18:02'
modified: '2017-11-24 12:22:45'
tags:
  - personal
published: true
---
# Thoughts and learning from ffconf 2017

Since running ffconf 2017 last week, and having the unique position of seeing all the [talks twice](https://remysharp.com/2016/04/15/ffconf-2016-news), there's been a whole load of items I'm starting to put into practise, already seeing in my own work, or importantly: want to share a few of these with you.

<!--more-->

One huge caveat that goes with this post: there's so much more that I want to discuss, but I'm almost overloaded with thoughts since the event that I may not quite do a great job of communicating them! I'll try to clarify points throughout this post as my own thoughts crystallise.

Before you ask: yes, the videos are coming out soon!

Photo credit: [Seb Lee-Delisle](https://seb.ly) (or me in a few cases)

## James on rethinking the web platform

[James](http://thejameskyle.com/) had the difficult task of the first talk of both days (the curation order is exactly the same both days). He was asked to expand on a tweet he had posted in early 2017:

> "Do not divide the web into documents and applications. Documents are dead"

*– [via twitter](https://twitter.com/thejameskyle/status/824790686822129665)*

In the week that followed ffconf there's three main themes that have been resonating with me.

### Learn little

The first is that learning how to build for the web does not require deep knowledge, or even completely accurate knowledge at the early stages. Please keep in mind that this is *my* interpretation of James' talk.

![James](/images/ffconf-2017/james.jpg)

Specifically, to teach an individual how to build their first web site can start with [create react app](https://github.com/facebookincubator/create-react-app) (<abbr>CRA</abbr> henceforth) and with minimal code, they're able to see something up and running.

We've completely skipped the understanding of how HTML works. What the relationship is with CSS or even that <abbr>CRA</abbr> is executing a load of JavaScript to render the page.

**Importantly** the page is rendered in a browser and the individual writing their first web site only had to write a few lines of HTML-ish code. There's instant gratification.

For me personally (though I know many others in a similar boat), at the early stage of learning something new, reaching the final result is possibly the most important factor in whether I'll continue learning a thing.

For example, when I was learning to work with an Arduino, it was more important to get the LED flashing than to understand what and how a resistor worked. In fact, if it didn't work, or the LED blew up, I'd rather just **copy** the right thing until it worked rather than hit the books and get a complete understanding.

<small>I realise the irony in my example: wanting the physical light bulb to go on, before the theoretical light bulb goes on!</small>

**The point:** an individual doesn't have to have a complete understanding of how all the parts work, or even a *good* understanding if it, if it means there's a tangible result to be had.

Certainly once I had built "enough" Arduino projects, I've tried to take my time to *go back* and get a better understanding of how certain parts actually work.

I also appreciate that different people learn in different ways, but what I'm talking about here is teaching, rather than learning: take the initiative to use "shortcut" tooling to get the end result faster.

### Components everywhere

Components was a theme that ran through the first three talks. For a long time I stood away from large frameworks and libraries (ultimately for no good reason), and in late 2016 I dived into React to build my first production project. The result was that I was fully converted.

It wasn't React's codebase that converted me: it was the structuring of *my* software design. My own code now took a distinct componentised approach. I always recognised visually distinct components, but my code didn't always split neatly into components. There was also the typical blog to consider: it really didn't *feel* like it should be broken into multiple components. I've also changed my mind on this too.

Recently I was updating the [terminal.training](https://terminal.training) web site, and the original source is a single HTML file. Why shouldn't it be? It's a single page, nothing special, and doesn't require any tooling to get it live.

Except when I tried to update a single _component_ of content, the near 9,000 lines of HTML were just daunting. I have over 20 years of web development experience and just trying to update a small visual component in this single file was overwhelming me.

Had I written the page at the start of my web career, it likely would have been written in Perl or PHP, and the visual components broken into separate files to be *included/required/imported* into a final page. That's to say: I've always been writing components, I just abandoned it for a "pure" development experience. Silly me.

### A web for apps, not docs

This brings me full circle to James' catalyst for the talk: documents are dead. In his talk, James went on to say:

> The truth is documents can exist within a web designed for apps, but apps cannot exist in a web designed for documents, not without adding something on.

Documents can exist within a web designed for apps. But interactive applications on a document based web is…hacky. Look at videos, carousels, date pickers, rich text editors and more.

In truth, this doesn't change anything technical about the web, but it re-frames my thinking about how I work on the web, and what I build. It won't stop me from (trying to) build accessible web sites, full of useful content and fun interactive experiences.

## Bruce on the future of the web

Bruce's talk, for me, was separated into two distinct sections.

The first was CSS in components and whether CSS in JS works, and proposing a solution that returns CSS to a separate concern (to JavaScript), and announcing [stylable.io](https://stylable.io/) (which I've not had time to fully digest, and the upcoming video of Bruce's talk should give a pretty good/quick intro).

The second part was the punch delivery: how the web is being used by "not US/Europe". Bruce originally posted a lengthy essay on China's use of the web. For this talk, he shifted across to Africa, and the talk was chocablock with hugely impactful statistics.

![Bruce](/images/ffconf-2017/bruce.jpg)

I can't share all the stats here, but it stands to full reason that some of the best Progressive Web Apps (<abbr>PWA</abbr>s) are coming out of countries like Africa because they have data sensitivity and the option of downloading a 20Mb native app or visiting a web site (that has all the properties of a <abbr>PWA</abbr>: fast, reactive, responsive and offline) will always all in favour of the <abbr>PWA</abbr>.

Most importantly to me personally, is Bruce went on to ask, what is the web:

> **What is the web?**
>
> It's not loads of computers. Loads of computers is how it works, but that's not what it is.
>
> It's not clouds. It enables clouds, but it's not clouds.
>
> It's definitely not a series of tubes.
>
> This is what the web is.  [shows photo of people]
>
> The web is a group of women in Africa, it's this blind guy in Toronto, it's these women I photographed on a bus in Bangladesh, it's this woman in a wheelchair I photographed in Hong Kong.
>
> It's these farmers I photographed in Cambodia.
>
> It's these guys for stock photography a bloke photographed.
>
> It's this women I photographed on the beach in India in February.
>
> This is what the web is.
>
> **The web is people.** The web is a mechanism for people to talk to people, and the people are not us.

Bruce shared a personal story of his discovering that he had MS, and how the web connected him to real people who would go on to play a role in his life for years to come.

I know from my own experience, the web has connected me to new friends (indeed, Bruce is a good friend of mine *because of* the web). The web has helped me connect to people in my adult life when I've needed them, when I've needed a fresh perspective on life and when I've needed help in some very dark times.

I care about the web, and making the tools and projects I build accessible to as many as possible. I sometimes lose sight of why. Bruce's talk helped me remember.

## Blaine on the practicality of passwords

As this post spirals into a mega post, I wanted to touch on some of the practical advise that Blaine's talk on passwords offered.

The talk centred around the idea that ultimately your primary email is the unique and secure identifier of an individual. The idea of having the same password but a multitude of passwords under an array of [ridiculous requirements](https://twitter.com/mattnortham/status/920210280684163072) is, when I think about it, utterly bananas.

![Blaine](/images/ffconf-2017/blaine.jpg)

Blaine mentioned he knew of a lot of people who would just jump straight to the password reset link by way of having a _magic link_ to the web site. Funnily enough, I experience the infuriating process of passwords that evening when I *tried* to order some food for a few speakers using Deliveroo.

Some key points I took away from Blaine's talk were:

1. [Secure](https://twitter.com/DKundel/status/928639522019135489) your primary email account with a strong password that I can memorise - not keep in a password manager that could potentially be lost (if I lost my machine).
- Security is on the companies and developers, [**not** the user](https://twitter.com/rowan_m/status/928638745934548992).
- Don't _require_ sign in (jsbin a number of other tools I've written does this already).
- Use auth delegation for sign in, which has also been shown to [greatly improve conversion rates](https://twitter.com/ffconf/status/928639855671873536).
- It's possible to detect the email delegation service from a user's email address - i.e. remysharp@example.com delegates to Gmail, and so Google's single sign in is prompted (I've started [a module that can help](https://github.com/remy/dennis) with this).

## Jenn: What is YOUR legacy?

I can't compress Jenn's talk into this post, nor would I want to. Watch it when it comes out. Seriously.

![Jenn](/images/ffconf-2017/jenn.jpg)

Jenn's talk articulated a lot of what I care and love about the web. Raising a lot of questions that burn at the back of my mind, like: which companies do you trust? What about ephemerality (being "short-lived"). What legacy do we, developers, leave behind?

<small>I've tried to share my thoughts on ephemerality [twice](https://remysharp.com/2016/12/22/cool-uris-dont-change) [before](https://remysharp.com/2013/10/22/a-self-destructive-web).</small>

It's not just what we leave behind, but what our role is during this time.

My event ffconf, for me, is an example of this and how it can change. Early versions of ffconf was a purely white-man line up. I was called out on this as early as year 2, but I swept away the comments claiming that the event was "diverse in it's content".

I was completely, and shamefully wrong. I'm sad to say it took me a few years to fully realise and work on making it better. Now we have ffconf and our line up these days looks "normal". It's not a skewed line of white-cis-dudes.

Jenn's talk was so strong that I can't fully do it justice here, nor quite articulate why it was so good and needs to be seen. But I think this tweet sums up the sentiment:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Me throughout <a href="https://twitter.com/jennschiffer?ref_src=twsrc%5Etfw">@jennschiffer</a> <a href="https://twitter.com/hashtag/ffconf?src=hash&amp;ref_src=twsrc%5Etfw">#ffconf</a> talk omg 💯👏🏼 it is PURE EXCELLENCE. <a href="https://t.co/m0eTjilhM7">pic.twitter.com/m0eTjilhM7</a></p>&mdash; ahsana nabilah 🌻 (@_ancxx) <a href="https://twitter.com/_ancxx/status/928667271471517696?ref_src=twsrc%5Etfw">November 9, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## That's not all

I want to write up the rest of the event, but that'll have to be another post!

For now, 2017 was an absolutely amazing experience, it's inspired me to be better at my work, and contribute to a better web for all. Thank you everyone who was involved and attended ❤️

![day 1](/images/ffconf-2017/day1.jpg)
![day 2](/images/ffconf-2017/day2.jpg)
