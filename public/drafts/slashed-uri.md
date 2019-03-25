---
title: Slashed URI
inprogress: true
tags:
- web
date: '2019-03-25 10:15:07'
---

# Slashed URI

Trailing slashes in URIs, or URLs or URD (apparently). What the heck do they actually mean, do they have any user or technical value and should I be including them???

<!--more-->

## Inheritance from Unix

A slash in the URL is a hang over from Unix days. A slash `/`, not a backslash `\`, denotes a directory separation.

In particular, web servers for many, many years have had a default mode that reads: if a user requests a directory and I (the web server) find index.html (or .htm if it were of the windows flavour), I (the server) will return that file (instead of a directory listing).

Now, out of the box old out of date Apache (one of the early web servers) could handle the following requests:

- https://example.com/remy
- https://example.com/remy.html
- https://example.com/remy/

…and all 3 requests could serve completely different responses assuming the server doesn't apply any extra hidden logic.

The first will only match a file called `remy` in the root of my server.

The second will serve `remy.html`, and the third (normally) the `index.html` in the directory called `remy`.

This becomes confusing to me as the developer because I begin to ask whether `remy` at the root is a file or a directory. Of course it can be both, but it's quickly becoming a minefield.

## Today's static servers

Today much of these defaults have been ironed out into "sensible defaults" and you'll be able to drop a directory of html files into a service like Netlify (or equally something of your own making) and URL handing is resolved for you.

In rewriting my blog backend software I had to generate all the static files myself and consider whether my existing URL schema still worked (it is important to me that it still works and that my URLs live as long as I do).

## What is a blog URL?

If you're able to see the URL to this post, you'll see my blog post URL structure:

- Year
- Month
- Day
- Title (in "slug" form)

Now ask yourself, if this is a static blog, what are you looking at?

Is it `slashed-uri.html`? Is it `index.html`? Is it a file designed to be served with a content type of `text/html` but without a file extension? Maybe this isn't a static site, and the slug is a database key, more akin to `/post?date=2019-03-22&slug=slashed-uri`?

With all that in mind, the question that now plagues me is: 

**Should this URL end in a slash?**

## Slash or not?

Let's see. Using Unix philosophy as a starting point, it would make sense that a post itself is a directory (even if a virtual one), that way all related assets (such as images, comments and so on) would live in the same directory.

So a slash makes sense in this case. Then again, a trailing slash feels…a little superfluous to the interface to my content. It's just a character that someone (a visitor or someone else linking to my post) would need to type.

_However_. 

Nice, or "pretty" urls don't have slashes at the end, and it's completely within a web server's capabilities to redirect a request to the intended destination.

## Slash and not?

Just recently I was checking my existing blog software and I realised I was getting a valid response from both of these URLs:

- https://remysharp.com/2018/12/24/memfetch
- https://remysharp.com/2018/12/24/memfetch/

The new problem here is: _which one is correct?_ Or more specifically, which is the canonical URL?

By some fluke, I had included the link `rel` in my posts, that will read:

```html
<link rel="canonical" href="https://remysharp.com/2018/12/24/memfetch">
```

But shouldn't one redirect on the other? It seems a little weird that my server responds a `200 OK` on both URLs. The canonical URLs are typically more useful for alternative pages (like an AMP formatted page, or perhaps a version hosted on a different URL, like Medium).

## It's all a bit of a mess…

…and actually there's no rules. Which, is kinda good, but means I keep flipping back and forth on what's the right way of doing URLs for my content.

