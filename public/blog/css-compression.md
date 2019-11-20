---
title: '10 years ago: CSS Compression'
summary: I unearthed a 10 year old draft, and finished it off!
image: /images/css-compression.png
tags:
  - code
authored: '2009-02-01 16:37:30'
date: '2019-11-21 11:00:00'
---

# Title: 10 years ago: CSS Compression

What follows is a blog post that I had partially written over 10 years ago. In fact, I started writing it on an afternoon on 31st Jan 2009. I can't recall _exactly_ what prompted the thoughts that are outlined in this post but I do know that there was some discussion across the web that got me writing.

Except I never finished the post back in 2009. So I thought it would be interesting (and a little fun) to look at my post from over a decade ago, then reflect back now that web development has aged a full decade since.

<!--more-->

## But first, let me set the scene…

Let's rewind time back to early 2009. I'm already working from home, from our one bedroom flat - in fact, the office desk is _right next to_ the bed, so the commute is nil. Twitter is still relatively quiet, certainly there's no roller coaster ride of politics. That's to say that I worked in an extremely insular environment. Blog posts and Twitter were my main connection to my community.

I can't quite remember (now in 2019) what triggered the original tweet (below) but I have a vague feeling it was related to HTML compression and thus obfuscation in the browser. Which led me to ask why compression didn't apply to CSS…

<div style="padding: 20px; border: 3px solid #ccc">

**_Original date: 31-Jan 2009 4:30pm_**

When I said this [on Twitter](https://twitter.com/rem/status/1163407522):

> Curious as to why CSS minification isn't standard practise as JS minification is.

It incited/inspired a reasonable amount of discussion that I felt I should post my thoughts on the subject.

## Quick Disclaimer

First off, I need to put my money where my mouth is - and start practising what I preach.  My personal sites don't minify, but I'll get on that argument in a minute.  My business sites (should and will) and I will always recommend this for client projects.

## JavaScript Compression

For context, today's web (development community) is used to JavaScript minification. In fact, Steve Souders uses it as one of the [14 rules for high performance sites](http://stevesouders.com/hpws/ "High Performance Web Sites").  All the JavaScript libraries are available in uncompressed (development) and compressed (production) form.

What we're saying here is that minification is for production environments.  It reduces download requirements, and if the JavaScript has been minified in to one single script, then it also reduces HTTP requests - both of which are going to be a good thing for the user's experience on your site.

In the web stack, JavaScript sits in a position that moves the fastest (and is also the most brittle), so it makes sense that these things (minification) are applied to JavaScript first then work their way down to CSS and then possibly HTML.

## The price of view source

Over Twitter James Box [replied to my original tweet](https://mobile.twitter.com/boxman/status/1164355323) with:

> I'm a humble UX bod so have no place commenting on this. But doesn't minified make 'view source' redundant. If so, that breaks the web

[Jeremy Keith replied](https://mobile.twitter.com/adactio/status/1164418787) pointing us to a [blog post he had just published](https://adactio.com/journal/1550), to which I replied:

First off: I'm playing devil's advocate here, so don't burn me too much!

View sauce was also my own personal teacher as to acquiring my skills over the last decade. However, the web is changing - or even changed. We don't use tables for layout, we know better. We also use server side compression and minification to speed the delivery of the payload.

This is where view source will suffer (obviously not as badly as if the browser re-interprets the original source). I would, and am, arguing that JavaScript and CSS should be compressed. Even the HTML can be compressed if the site is high profile enough (see google.com). But! This all depends on the application.

High/medium performance sites, I believe, should minify, thus mangling the view source (though don't go changing your class names to ‘a', ‘b', etc).

Blogs, demos, show off sites should remain uncompressed to allow people to still learn (but you still need to consider your user - and whether compressing helps).

However! There's one big factor that means we can still learn from compressed CSS + HTML: Firebug. Firebug translates the markup in to a nicely laid out format, and we're all good to learn again - along with the simple fact that in 2009 client side engineering is a recognised practise - and there's much more learning resources available.

## Developer tools for developers

The source that is delivered over the wire to the browser is not always the same thing that's viewed in the browser. What we're viewing is the DOM, and the DOM inspector tools like Firebug help developers understand how a portion of the DOM is structured.

The same is currently true with CSS. We can inspect the DOM and see what styles are being applied both directly and through the cascade. So we don't lose the developer experience (entirely) and those wishing to learn from the source of how a page is constructed can.

It's a far cry from "right click, view source", I appreciate that, but the trade off is the user experience and a potentially slower web browsing experience.

With the user experience as the driver, I can see this being a strong argument for everything to be compressed down to the browser. This is what google.com does today - the source is extremely minimal and it shows, their landing page loads in, what feels like, a split second.
</div>

It's hard to tell exactly what triggered my tweet and the start of this post over 10 years ago. Jeremy's blog post, if I'm following Twitter, appears shortly after I tweeted - though I suspect the _same_ thing triggered the posting.

What's interesting is that as much as I love view source (and yes, my original comment used "sauce" as some kind of cheap joke) this feels like it belonged to a different generation and era, and was in fact a developer convenience over user experience. Compression nearly always improves the user experience.

Since this thought was posited, we've come to deploy web sites that do way more CSS compression. Specifically classes are compressed when they're written in JavaScript (CSS-in-JS is parsed by JavaScript so it can produce anything so long as it's unique) and in even more optimised situation, critical CSS is dynamically calculated and delivered separately from the rest of the site's CSS.

It's worth stating that this post and the position that everything should be compressed is the purest approach of the best payload delivered to the user as possible.

It's also worth noting that there's a negligible difference between stripping all spaces in HTML compared to leaving them out is not worth the byte or two you save over the wire. As there's little to no difference, view source still works.

As for today, do I believe CSS _should_ be compressed? I'm not sure I do. The CSS delivered certainly should only contain the CSS the page (or pages) need (tools like [devtool's coverage](https://developers.google.com/web/tools/chrome-devtools/coverage/) can help spot unused CSS), but this again boils down to removing white space, again, no tangible benefit.

What about compressed class names that CSS-in-JS produces? I'm not so sure. Certainly being able to deliver critical CSS is something I want to see, but we're specifically talking about compressing a class name from `.btn__call-to-action` to `.b1` (or something).

Without having tested it, I would image CSS-in-JS would produce a lot of unique class names and completely loses the benefits of the _cascade_ (the C in CSS). Compression likes repeating text, which the cascade would have, but unique classes would not. Again, without testing, I wonder what would produce a smaller file…

Still, it was fun to look back over a decade to see what I was doing in webdev land!
