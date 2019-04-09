---
title: 'Code highlighting: server or client?'
date: 2019-04-09
image: /images/code-highlight/card.jpg
tags:
- code
---

# Code highlighting: server or client?

Recently I posted a [quick poll](https://mobile.twitter.com/rem/status/1112821258259922950) to Twitter asking:

> Do you think syntax highlighting (in blog posts, examples, etc) be in client side or server side?

For the first half of the day the poll ran, client side held 2/3rds of the votes. It ended with a 60:40 split between client and server.

![Final results of the poll](/images/code-highlight/poll-result.png)

Though (without giving it too much thought) favour client side (I'll come on to my reasons in a bit), I was surprised at the results being around 2/3rds preferring client side. So I decided to look at my own blog posts to see what would suit my system best.

There's no TL;DR for this post because I suspect if you're reading this blog post you already know the answer that fits about 95% of the time. My aim for this post was to dispel any misconceptions I might have had.

<!--more-->

The context for this post is my own blog, a fully static site (specifically: the visitor won't enter code themselves).

## Direct Effects

Let's skip straight to the proof in the pudding shall we? I released two branches to my Netlify deployed blog, one with client side rendering (as it stands as of 7 April 2019) and one with server rendered syntax highlighting.

The order of the screenshots will always be client side then server side.

### Network Analysis

When taking these screenshots, I repeated the requests a few times to warm up the server side - so you're seeing a hot server response (ie. loaded into a CDN). The page is heavy with code examples, but asset-wise is fairly light (very few images and only required JavaScript).

![Client network render](/images/code-highlight/client-network.png)

![Server network render](/images/code-highlight/server-network.png)

Points of interest:

1. **SSR is about 1K additional** with gzip and uncompressed is about 50% larger (from 23K to 42K). This is expected to be a larger HTML file because the SSR version has a lot of `span` tags for the code (and the page is intentionally heavy with code examples). Importantly though, since there's so much repeated common content (`span`s, common `class` attributes and values), it gzips very well
2. Although the single HTML file is larger with SSR, **total transfer size on the SSR version is ~10K _smaller_**. This is because SSR is not sending the two JavaScript prism.js files (prism itself and the additional syntax highlighter).
3. Finish times and load times are about the same. **`DOMContentLoaded` is delayed by around 100ms on the client rendered side**, this I would expect to put down to Prism running client side - but we'll find out for sure next.

### Performance

As with networking, there's no real surprises here in the performance panel. I'd expect to set additional JavaScript execution and I'd expect to see a later TTFP and DOM ready events. What I was also interested in was whether using SSR for syntax highlight would cause any additional overhead in parsing the HTML (as I can from the network request, uncompressed, the HTML is twice the size).

I ran these two performance tests with the network slowed to "Fast 3G" and throttled the CPU to 4x slowdown (only to help amplify the effects I was looking for).

![Client performance render](/images/code-highlight/client-perf.png)

Above is the client side highlighting. The first JavaScript block (in yellow) is Prism being evaluated and parsed. Prism is pretty lean and small (and again, I slowed the CPU) and it's not costly in the grand scheme of things, but compared to the SSR below, where there's _no_ JavaScript, zero JavaScript is always faster.

![Server performance render](/images/code-highlight/server-perf.png)

As expected, SSR wins out and there's nothing unexpected. Importantly **the HTML parsing time only was 8.31ms** - again this post has a lot of code examples, but I'd argue this was negligible and browsers are doing what browsers do best. Without the SSR of the code highlight, the parse time is 4.91ms. That's to say: there is practically zero impact on parsing time even though we know the parsed HTML is twice the size when SSR is in play.

What about a mobile device though? The above tests were run on my desktop and additional HTML doesn't seem to be much trouble for a fast laptop. I ran a pared down test on my mobile device (albeit a Pixel 3XL which is one of the more powerful mobile devices, but it was a start). For this test, I stripped out all external assets so the performance was able to focus entirely on the HTML parsing time.

![Client side mobile HTML](/images/code-highlight/client-mobile-html-only.png)

![Server side mobile HTML](/images/code-highlight/server-mobile-html-only.png)

The top image is client side and bottom is server side. SSR is marginally longer, but it's a matter of 10ms. That time on the mobile CPU is really nothing - particularly considering there's images to decode, other JavaScript (normally) to parse and execute.

The bottom line: no impact what so ever.

## Why even client side?

Going by these results, it's hard to argue *at all* in favour for client side syntax highlighting. So why are so many people, myself included, reaching for client side as a default?

Obviously I can't speak for others, but I can share what I've experienced.

### 1. Historically client side was the only option

Well over a decade ago (yes, I've been coding longer for the web) there wasn't an readily available option for SSR code highlighting. For blogging you either had hosted options like blogger.com and wordpress.com or you would host your own. I used WordPress on my own dedicated server. WordPress had a lot of server processing to do just to render the HTML for a blog post, so the idea and cost of adding syntax highlighting was unappealing.

In addition, the best highlighters (that I had come across) were client side. [Google's Code Prettifer](https://code.google.com/archive/p/google-code-prettify/) was my choice back in those days. It only came as a JavaScript file. Later on I turned to [highlight.js](https://highlightjs.org/).

There's a theme in the highlighters I was using: they're written in JavaScript. If your backend is written in non-JavaScript (which [until late 2014](/2014/09/18/wordpress-ghost-harp-pt1) I was on PHP), then client side libraries are the way to go.

**Today's counter argument:** however years…and years have passed. Not only do we have JavaScript on the server side, but we also have static site generators (closing the argument of server processing time). Most SSG's (that I've reviewed) come with directions on how to add your favourite syntax highlighter.

In my case, my new blogging software borrows ideas from [11ty](https://11ty.io/docs/) and uses [markdown-it-prism](https://github.com/jGleitz/markdown-it-prism). In reality it's really not much more than a couple of lines added to your server side software to support syntax highlighting.

### 2. Some parts require DOM to work

Syntax highlighters use lexers and parse text input into tokens and spit out markup. It doesn't need the DOM for this particular task. However there may be highlighter plugins that you use that _do_ require the DOM and this won't fly on the server side.

In my particular case, I was using a Prism plugin called "keep-markup". Running it on the server throws up errors right away:

```
}(self, document));
  ^
ReferenceError: self is not defined
```

All the options I have to solve this are unfavourable:

1. Run the highlighter on _both_ the server and the client. A terrible idea and a waste.
2. Drop the plugin entirely (and somehow rework the code examples that relied on it).
3. Run the highlighter on client side so I can use the "keep-markup" plugin.

In the end, for my own site, I weighed up between client side code highlighting and removing the plugin: I decided to remove the plugin.

### 3. Server integration isn't the easiest choice

This is really the thing isn't it? Reaching for another JavaScript library to fix a thing is the path of least resistance. I can clearly see that I've not been thinking about the real impact of client side syntax highlighting. I'd done some research many years ago and apparently I was set with that for life.

I'm equally guilty of running to [npm](https://www.npmjs.com) to find a library that does a task that will be easier to install than code myself. Obviously there's good justification for that, but I should really audit the decision properly and thoroughly.

This particular topic, that of the "easiest choice" for the developer is a much bigger discussion, but I can see how this seemingly benign decision between client or SSR highlighter feeds into developer convenience.

## Conclusion

As I suspected, I was holding onto a (very) old assumption about server support for syntax highlighting that had stuck with me for well over a decade and lead me to the wrong approach.

Server side rendered syntax highlighting is extremely capable these days and the question of client side impact is quite literally zero.

I'm quite amazed at the poll results, and I wonder if my wording in the tweet may have swayed the results, but also I suspect there's a general tendency to reach for the quick and easy answer. The truth is that SSR code highlighting really _isn't_ hard at all, and only required one additional step.

*[TTFP]: Time to first paint
*[CDN]: Content delivery network
*[SSR]: Server side rendered
*[SSG]: Static Site Generator
