---
title: Send Outgoing Webmentions
image: /images/webmention-app-card.jpg
tags:
- code
- web
date: 2019-06-12
---

# Send Outgoing Webmentions

In a recent [Twitch](https://www.twitch.tv/remysharp) session I decided to add Webmentions to my blog, specifically in the flavour of showing "liked" from other websites (though, who am I kidding, it'll just be Twitter…).

Amazingly I managed it in 90 minutes (with 3 stream crashes to boot).

Adding Webmentions to a site seemed straightforward and a well trodden path. _Sending outgoing_ webmentions on the other hand seems to have been generally left to ones own devices.

So I decided to take up the challenge and build a platform agnostic method of sending outgoing webmentions - that anyone can use.

<!--more-->

## TL;DR - sending webmentions

I've written an application that will scan a URL's contents and delivery Webmentions (and pingbacks) to those sites your post links to (and supports Webmentions).

This works with a homepage containing multiple posts, single stand alone posts and RSS feeds. For homepage (or pages with multiple blog posts) there's the expectation that the `h-entry` microformat schema is being used.

Introducing: **https://webmention.app**

If relying on a third-party isn't your bag, then you can install the [command line tool](https://github.com/remy/wm) and use it with your deploy process.

## TL;DR - receiving webmentions

Webmentions are cool: they're (supposed to be) decentralised, like the web. I'm pretty sure the way I'm using Webmentions on my blog today is _wrong…ish_.

To add webmentions to your site: connect your socials with [Bridgy](https://brid.gy/), auth with [webmention.io](https://webmention.io) and add client side JS [webmention.js](https://github.com/resonance-cascade/webmention.js) to your site.

Max Böck also has an [excellent write up on using Webmentions on a static site](https://mxb.dev/blog/using-Webmentions-on-static-sites/).

My concerns are currently that there's a great gravitation towards Twitter as the place a post gets mentioned. This lead directly to my next issue: that sending Webmentions for _normal_ blog posts didn't seem to have a common solution, yet…

## Webmentions, Twitter and the status quo

From what I've seen so far there's a particularly strong relationship between Twitter likes/retweets/replies and webmentions appearing on blogs. In fact it's exactly how I approached Webmentions in the first place - to add likes on my posts. Those "likes" are driven _entirely_ by Twitter.

My site is picking up Twitter likes because Bridgy is checking social media and sending Webmentions to my site. What I'm keen to see is Webmentions properly supersede their predecessor of pingbacks. I want to see "replies" on blog posts actually pointing to other blog posts.

Reading Jeremy Keith's post on [Indie Web building blocks](https://adactio.com/journal/7698), he touches on what I'm seeing:

> My site doesn’t automatically send Webmentions to any links I reference in my posts—I should really fix that—but that’s okay; Aaron—like me—has a form under each of his posts where you can paste in the URL of your response.

I'll acknowledge that starting with a form is a great form of progressive enhancement, but it's _how_ Jeremy, or anyone for that matter, might go about automating the problem that worries me. It's not a particularly simple task and potential bespoke for many.

If the status quo gets stuck at: I write a post, you write a response post (or separate commentary), then you have to come _back_ to my post to enter your blog post URL to notify me of a WebMention, then…it feels…cumbersome, and like it probably won't stand the test of time.

The ability to send Webmentions needs to be a part of an automated workflow - the same way as posting a new WordPress blog post automatically sent pingbacks.

Equally important is that a website that doesn't accept webmentions _should_ be able to _send_ webmentions.

So lets go about fixing that.

## Automatically sending outgoing Webmention notifications

In the workflow for webmentions, the biggest part that I believe needs automation is automatically sending outgoing Webmentions to links referenced in new posts.

So I've written my own solution to this:

🎉💫 **[webmention.app](https://webmention.app)** ✨🌈{class="bigger}

As usual with most of my projects, the [source code is available on Github](https://github.com/remy/wm).

You can give the service a URL to the `/check` endpoint and it will give you a preview of notifications it will send. To send outgoing notifications (rather than a dry-run) use a `POST` request.

You can pass it:

- An RSS feed
- A single post URL
- Any URL to find multiple posts (like your homepage)

In addition, if you're not comfortable relying on a third-party for the notification process (because: who knows what site will outlast yours), you can install it as a command line tool and run locally.

The command line can be used as part of a build process - in this case we're assuming that the project will generate a static RSS feed in `./_site/feed.xml`.

```bash
$ npm install @remy/webmention
$ npx webmention ./_site/feed.xml --limit 1 --send
```

This will pick the first item in the RSS (the latest post) and send any Webmentions found.

In my personal case, I'm using the service as part of my Netlify post-build process - [described in detail](https://webmention.app/docs#how-to-integrate-with-netlify) on the website. Each successful Netlify build calls the webmention.app service using [my token](https://webmention.app/token) and points to [my RSS](https://remysharp.com/feed.xml). As Netlify sends a `POST` webhook, the webmentions are automatically sent out.

---

Give it a try, let me know what you think. I tried to put extra effort into the documentation and my hope that it is simple enough to follow for most bloggers: [webmention.app](https://webmention.app)

*[RPC]: Remote procedure call
*[CORS]: Cross origin resource sharing

