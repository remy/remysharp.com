---
title: Adding WebMentions to my blog
tags:
- code
- web
inprogress: true
date: 2019-05-22
---

# Adding WebMentions to my blog

In my last [Twitch](https://www.twitch.tv/remysharp) session I decided to add Web Mentions to my blog, specifically in the flavour of showing "liked" from other websites (though, who am I kidding, it'll just be Twitter…).

Amazingly I managed it in 90 minutes (with 3 stream crashes to boot). So here's the parts I used to land likes on my site

![Web Mention likes](/images/web-mentions-likes.png)

<!--more-->

## TL;DR

Web mentions are cool: they're (supposed to be) decentralised, like the web. I'm pretty sure the way I'm using web mentions on my blog today is _wrong…ish_.

To get going: connect your socials with [Bridgy](https://brid.gy/), auth with [webmention.io](https://webmention.io) and add client side JS [webmention.js](https://github.com/resonance-cascade/webmention.js) to your site.

My grander concerns are relying on third-parties running services for free, rate limits and poorly optimised requests (on my part). For these, I don't have an answer yet.

Also, there's a much more succinct version of implementation details at [Max Böck's web site](https://mxb.dev/blog/using-webmentions-on-static-sites/) (which I found half way through my post, darnit!).

## What are Web Mentions?

You can read at the [W3C recommendation](https://www.w3.org/TR/webmention) or the [IndieWeb Web Mention docs](https://indieweb.org/Webmention). Or you can let me take a shot at it.

Web Mentions are the evolution of [pingbacks](https://www.w3.org/wiki/Pingback). _What are pingbacks?_ If I publish a blog post, my blogging software would crawl the links I included and "ping" your site if you accepted pingbacks (there was some XML RPC magic going on).<sup>&dagger;</sup>

<small>&dagger; I apologise; it's ~~possible~~ likely that's technically wrong</small>

How are they the "evolution"? I couldn't articulate it. The clever [Tantek Çelik](http://tantek.com) can though, and they gave a talk at Beyond Tellerrand entitled [Take Back Your Web](https://vimeo.com/336343886) which will explain (and possible inspire). I'd known about web mentions existence for a while, but it was Tantek's talk that kicked me into motion.

From what I understand, you need a few parts of the machine to make web mentions work, and it's based on a system of agreement - meaning that some site mentions your site, and you site is able to receive that mention notification.

## Preparation

To achieve "likes" on my blog posts, I'm going to be gathering the data entirely from Twitter (which I'll discuss a little later in this post).

**[Bridgy](https://brid.gy/)** let's me authenticate against Twitter and Bridgy will start polling Twitter on a regular interval for my tweets (note: _mine_ only) and links back to my blog.

**[webmention.io](https://webmention.io)** is the next step. I signed in using my blog's URL. The site used Twitter for authentication. It did this by searching my blog's markup for `rel="me"` links and found that I point to @rem as my Twitter account. Also because my Twitter page points _back_ to remysharp.com, it completes the handshake proving I am who I say I am (using the [IndieLogin](https://indielogin.com/setup#twitter) method).

webmention.io also requires that I add two `meta` tags that point to my webmention.io account:

```html
<link rel="webmention" href="https://webmention.io/remysharp.com/webmention">
<link rel="pingback" href="https://webmention.io/remysharp.com/xmlrpc">
```

## Post-by-post: client side JS

Doing a quick search I found [webmention.js](https://github.com/resonance-cascade/webmention.js) a reasonably simple JavaScript library that reads the permalink of the post from an HTML element and requests all the web mentions from the webmention.io's API.

The library is pretty thorough in it's support, so you may just want to stop there.

As I only wanted likes on my page, I used the library as inspiration and coded my own solution. Since webmention.io's API (now?) supports CORS, it was possible to request with `fetch`:

```js
async function webMentions() {
  const el = document.querySelector('.webmentions');
  if (!el) return; // early exit
  
  // encode the permalink for this post
  const id = encodeURIComponent(window.location.toString());
  const url = `http://webmention.io/api/links?target=${id}`;

  const res = await fetch(url); // FIXME handle errors maybe?!
  const json = await res.json();

  const likes = json.links.filter(_ => _.activity.type === 'like');

  // construct HTML of the avatars
  let images = likes.map(_ =>
    `<img src="${_.data.author.photo}" alt="${_.data.author.name}">`
    )
    .slice(-9) // only show the last 9 avatars
    .join('');

  // if we had more than 9, show "more" icon
  if (likes.length > 9) {
    images += `<img src="/images/more.svg" alt="">`;
  }

  el.innerHTML = `<p>👍 ${likes.length} likes ${images}</p>`;
}
```

## Server side rendered

Given my site is a static site with a nice build phase, I could collect this information during the build and add it in as static content.

webmention.io also has settings for web hooks when a new mention comes in - so this could trigger a re-build of my blog.

## The part that's missing

It seems that the biggest part that's missing automation is automatically sending webmentions to links referenced in new posts.

I wonder if a half way solution can be solved by consuming RSS (though it would only work on full entry feeds).

## Further reading

- [Indie web building blocks](https://adactio.com/journal/7698)

*[RPC]: Remote procedure call
*[CORS]: Cross origin resource sharing