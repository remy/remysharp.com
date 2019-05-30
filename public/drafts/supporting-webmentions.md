---
title: Supporting WebMentions
tags:
- code
- web
inprogress: true
date: 2019-05-22
---

# Supporting WebMentions

In my last [Twitch](https://www.twitch.tv/remysharp) session I decided to add WebMentions to my blog, specifically in the flavour of showing "liked" from other websites (though, who am I kidding, it'll just be Twitter…).

Amazingly I managed it in 90 minutes (with 3 stream crashes to boot). So here's the skinny, some questions I have, and my solution to how static sites can _send_ WebMentions.

![Web Mention likes](/images/web-mentions-likes.png)

<!--more-->

## TL;DR (part 1)

WebMentions are cool: they're (supposed to be) decentralised, like the web. I'm pretty sure the way I'm using WebMentions on my blog today is _wrong…ish_.

To get going: connect your socials with [Bridgy](https://brid.gy/), auth with [webmention.io](https://webmention.io) and add client side JS [webmention.js](https://github.com/resonance-cascade/webmention.js) to your site.

My concerns are currently that there's a great gravitation towards Twitter as the place a post gets mentioned. This leads directly to my next issue: that sending WebMentions for _normal_ blog posts doesn't seem to have a common solution yet. Though, I may have [my own answer](#) to this.

## TL;DR (part 2)

I've written some code that will scan a URL's contents and delivery WebMentions to those sites your post links to (and supports WebMentions).

This works with homepages, single posts and RSS feeds. For homepage (or pages with multiple blog posts) there's the expectation that the h-entry microformat schema is being used.

It lives here for now: https://webmention.app

If relying on a third-party isn't your bag, then you can install the [command line tool](https://github.com/remy/wm) and use it with your deploy process.

## WebMentions on my site: someone wrote this already!

As I approached around 900 words on this post, I found another blog post writing up nearly exactly the same implementation as I had used. So rather than repeating and botching, I'll refer you to [Max Böck's write up on using WebMentions on a static site](https://mxb.dev/blog/using-WebMentions-on-static-sites/).

Max's post covers how to implement server side rendering during static build _and_ additional client side rendering for any mentions that haven't been included since the last build.

For myself, I'm using webmention.io's webhook feature, running it through an online reduce method that then conditionally forwards the webhook to trigger a new Netlify build. It's kinda neat.

## WebMentions, Twitter and the status quo

From what I've seen so far there's a particularly strong relationship between Twitter likes and mentions appearing on blogs. In fact it's exactly how I approached WebMentions in the firs place - to add likes on my posts. Those likes are driven _entirely_ by Twitter.

It's because Bridgy is checking social media and sending WebMentions to my site. What I'm keen to see is WebMentions properly supersede their predecessor of pingbacks. I want to see "replies" on blog posts actually pointing to other blog posts<sup>&dagger;</sup>

<small>&dagger; You _might_ argue that Twitter is a micro blogging platform, like a mini medium…</small>

Reading Jeremy Keith's post on [Indie Web building blocks](https://adactio.com/journal/7698), he touches on the problem I'm seeing:

> My site doesn’t automatically send WebMentions to any links I reference in my posts—I should really fix that—but that’s okay; Aaron—like me—has a form under each of his posts where you can paste in the URL of your response.

I'll acknowledge that starting with a form is a great form of progressive enhancement, but it's _how_ Jeremy, or anyone for that matter, might go about automating the problem that worries me. It's not a particularly simple task, and potential bespoke for many.

If the status quo gets stuck at: I write a post, you write a response post (or separate commentary), then you have to come _back_ to my post to enter your blog post URL to notify me of a WebMention…it feels…cumbersome and like it might not stand the test of time.

If feels like the ability to send WebMentions needs to be a part of an automated workflow - the same way as posting a new WordPress blog post automatically sent pingbacks.

## Automatically sending WebMention notifications

It seems that the biggest part that's missing automation is automatically sending WebMentions to links referenced in new posts.

So I've written my own solution to this that handles a few circumstances.

**https://webmention.app**

You can give the service a URL to the `/check` endpoint and it will give you a preview of notifications it will send. To send properly, add `&send=1`.

You can pass it:

- An RSS feed
- A single post URL
- Any URL to find multiple posts

In addition, if you're not comfortable relying on a third-party for the notification process (because: who knows what site will outlast yours), you can install it as a command line tool and run locally.

In my case, I'm using it as part of my Netlify build process:

```bash
$ npm install --save @remy/wm
$ npx wm ./public/feed.xml --limit 1 --send
```

This will pick the first item in the RSS (the latest post) and send any WebMentions found.

## Further reading

- [Indie web building blocks](https://adactio.com/journal/7698)

*[RPC]: Remote procedure call
*[CORS]: Cross origin resource sharing

