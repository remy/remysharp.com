---
title: Works offline
tags:
  - web
date: 2020-07-17
---

# Works offline

So many web sites work offline and we don't know it. It's kind of a beautiful aspect of the P in PWA: the web sites are progressively enhanced to be available even without an internet connection.

Yet browsers won't tell us so. More on that in a bit. How do we tell our visitors our sites work offline. How do we tell our visitors that they don't need an app because it's no more capable than the URL they're on right now?

<!--more-->

I've created a Github issue (by way of creating an open forum) with a call for ideas and collaboration.

Please, if you're a designer, iconographer, tinkerer, please contribute your ideas: **[github#works-offline/logo/issues/1](https://github.com/works-offline/logo/issues/1)**

I created the issue and the repo, but this isn't mine. In fact I immediately made [issue 2](https://github.com/works-offline/logo/issues/2) to that effect. This is an effort that requires us, the makers of the web, to take matters into our own hands.

Creating a visual cue to offline capability isn't a new thing and I'm certainly not the first. The most recent large waves came in the form of the [Offline First initiative](http://offlinefirst.org/) which is already over 5 years old and [introduced by Hoodie](http://hood.ie/blog/say-hello-to-offline-first.html). I remember [A List Apart bringing support](https://alistapart.com/article/offline-first/) (albeit via an article) which created some great momentum.

Yet we're 5 years on and our visitors still don't realise how capable our sites are. Hell, I'd call myself pretty savvy but I didn't think for a moment that [lodash's documentation](https://lodash.com/docs/4.17.15) would work offline until I happened upon it by accident.

I want to see some way that we can show, proudly, on our own web sites that our URLs work offline. As [Jeremy reminds us](https://adactio.com/links/17137):

> …seeing as browsers have completely dropped the ball on any kind of ambient badging, it’s fair enough that we take matters into our own hands.

## Branding matters

HTML. Web 2.0. Ajax. RSS. HTML5. PWA.

These are … "words" that meaning to a select few individuals, and yet are recognised by a broad range of every day people.

Some of these have [logos](https://www.w3.org/html/logo/faq.html) [attached](https://en.m.wikipedia.org/wiki/Progressive_web_application) to their ideas.

But these are all examples of technical terms making it out into the wider world and becoming brand ambassadors for technical progress and innovation.

Branding is incredibly powerful, as anyone hired to build an "HTML5 web app" knowing full well there may not actually be any "HTML5" in the resulting software. The exact definition doesn't matter. What matters is the hook.

Often we just need a word to lean on to help people grasp the idea and run.

What's also interesting is that a lot of these terms have a commonality that they don't mean just one thing. Just as "XMLHttpRequest is only part of the Ajax equation" as [explained by Jessie James Garret](https://web.archive.org/web/20180822143943/https://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/) and as PWA doesn't [just mean "service worker"](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) (though technically without service workers there is no PWA).

Likewise, "works offline" does not mean it has to satisfy a specific tick list. It's an idea, one that the makers of the web need to impress upon the world.

## What does "works offline" mean?

I tried to spread the request for help via Reddit (a web site I very, very rarely visit) and one individual raised an interesting and valuable question (though it was phrased as a counter point): _isn't this just saving a cached copy?_

This is what we need to overcome with our software. For a site to work offline, is so much more, so much richer than the saved bones of an HTML page.

The reality, today in fact, is that with the service worker capability we can deliver the same offline experience as many appstore installed mobile apps. At a fraction of the cost.

## Is working offline the same as installable?

The short answer, as you know, is no. But installable isn't better than "works offline". I've installed many applications from the app stores that I found out the hard way flat out didn't work without an internet connection (usually on my travels off of my home cellular network).

Yet if I install software from the app store I expect it to work offline.

If I visit a web site, I never expect it to work offline.

What if you could tell me, when I visited your web site, that it worked offline.

Absolutely yes, the browsers should provide badging. They _could_ track if new entries were made to the origin's cache, and they could run a routed request for the URL I visited (stopping it from hitting the network layer preventing a double request if there wasn't middleware offline routing in place).

Yet there's no indication that will come from browsers in the short term. So how about [we do it ourselves](https://github.com/works-offline/logo/issues/1)?

The same way RSS went. How did you know a web site offered a feed of their content (before RSS was baked into browsers…or even after they all removed it)? Imagery, logos, word marks.

RSS needed something obvious and clear that as a visitor I could subscribe. Dave Winer in 2005 (re?)started [the conversation](https://web.archive.org/web/20060221082210/http://www.reallysimplesyndication.com/2005/09/26#a970) and Microsoft eventually [picked up the ball](https://web.archive.org/web/20060227071704/http://blogs.msdn.com/rssteam/archive/2005/10/08/478505.aspx) (working with Mozilla if I read correctly) and that's how we [got the RSS icon](https://web.archive.org/web/20051216113745/http://blogs.msdn.com/rssteam/archive/2005/12/14/503778.aspx) (the original post is [still live](https://docs.microsoft.com/en-us/archive/blogs/rssteam/icons-its-still-orange), but missing the images).

Slapping a bit of "works offline" on my site would be a great first step.

## We need your help

What I'd personally like to see as an outcome: some simple iconography that I can use on my own site and other projects that can offer ambient badging to reassure my visitor that the URL they're visiting will work offline.

Please, [please contribute](https://github.com/works-offline/logo/issues/1) if you can. There's already been some really wonderful work and this is a stage of trying anything and everything out.

If, like me, your skills don't lie in design, then please help spread the word 🙏
