---
title: 'Code highlighting: server or client?'
date: 2019-04-02
inprogress: true
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

## Pudding

Let's skip straight to the proof in the pudding shall we? I released two branches to my Netlify deployed blog, one with client side rendering (as it stands as of 7 April 2019) and one with server rendered syntax highlighting.

The order of the screenshots will always be client side then server side.

### Networking

When taking these screenshots, I repeated the requests a few times to warm up the server side - so you're seeing a hot server response (ie. loaded into a CDN). The page is heavy with code examples, but asset-wise is fairly light (very few images and only required JavaScript).

![Client network render](/images/code-highlight/client-network.png)

![Server network render](/images/code-highlight/server-network.png)

Points of interest:

1. **SSR is about 1K additional** with gzip and uncompressed is about 50% larger (from 23K to 42K). This is expected to be a larger HTML file because the SSR version has a lot of `span` tags for the code (and the page is intentionally heavy with code examples). Importantly though, since there's so much repeated common content (`span`s, common `class` attributes and values), it gzips very well
2. Although the single HTML file is larger with SSR, **total transfer size on the SSR version is ~10K smaller**. This is because SSR is not sending the two JavaScript prism.js files (prism itself and the additional syntax highlighter).
3. Finish times and load times are about the same. **`DOMContentLoaded` is delayed by around 100ms on the client rendered side**, this I would expect to put down to Prism running client side - but we'll find out for sure next.

### Performance

As with networking, there's no real surprises here in the performance panel. I'd expect to set additional JavaScript execution and I'd expect to see a later TTFP and DOM ready events. What I was also interested in was whether using SSR for syntax highlight would cause any additional overhead in parsing the HTML (as I can from the network request, uncompressed, the HTML is twice the size).

![Client performance render](/images/code-highlight/client-perf.png)

![Server performance render](/images/code-highlight/server-perf.png)

I ran these two performance tests with the network slowed to "Fast 3G" and throttled the CPU to 4x slowdown (only to help amplify the effects I was looking for).

As expected, nothing unexpected. Importantly **the HTML parsing time only was 8.31ms** - again this post has a lot of code examples, but I'd argue this was negligible and browsers are doing what browsers do best. Without the SSR of the code highlight, the parse time is 4.91ms. That's to say: there is practically zero impact on parsing time even though we know the parsed HTML is twice the size when SSR is in play.


## Why server?

1. Historically hard and considered last - certainly true for me
2. Some parts require DOM to work
3. Most highlighters require an adapter to work which isn't part of the library property (i.e. Prism I'm using markdown-it-prism)

## Conclusion

As I suspected, it was an old assumption about server support for syntax highlighting that had stuck with me for a decade and lead me to the wrong approach.

Server side rendered syntax highlighting is extremely capable these days and the question of client side impact is quite literally zero.

I'm quite amazed at the poll results, and I wonder if my wording in the tweet may have swayed the results, but also I suspect there's a general tendency to reach for the quick and easy answer. The truth is that SSR code highlighting really _isn't_ hard at all, and only required one additional step.


- Rendering
- Downstream
- Complexity
- Browser required for some plugins
- Worked initially, but missed some languages and not clear how it doesn't work
- Highlighters written with a DOM in mind, so install instructions often lean this way

*[TTFP]: Time to first paint
*[CDN]: Content delivery network
*[SSR]: Server side rendered
