---
title: Please disable JavaScript to view this site.
tags:
- web
- code
date: 2020-11-30
nosubscribe: true
---

# Please disable JavaScript to view this site.

Heydon Pickering this last weekend [released](https://twitter.com/heydonworks/status/1332620108129312768) a redesign to their web site and upon visiting it, the contents prompted a series of interesting thoughts and ideas to run riot through my mind.

The URL is https://heydonworks.com and it (currently) looks like this:

![A website simply with the text "Please disable JavaScript to view this site"](/images/heydonworks.png)

<!--more-->


Seeing Heydon's redesign prompted me to want to write about what I saw and experienced - which is also related to decades of my own work on the web.

## To the average user

I had wanted to write about what the "average user" might experience, but I realise that thought was wrong.

What I should say is: what the average user _like me_ would experience: a privileged user of the web.

Someone with access to a fairly high powered and reasonably new technology both on my mobile phone but also my laptop. Someone like me who is used to bouncing from web site to web site munching down 100s of megabytes of data to view a shiny web site only to take off to the next one.

To the average user _like me_, visiting heydonworks.com is met with confusion. Not at the message, we can parse that well enough having browsed the web any time in the last decade, but confusion as to _how to disable JavaScript_.

I happened to visit Heydon's web site on my mobile phone. I consider myself as fairly tech savvy and fairly privacy conscious and so I use multiple browsers on my phone. I use Brave for my daily browsing and Firefox exclusively for the Facebook groups I'm connected to (the idea being that I never browse another site from the browser Facebook has access to). I use Chrome and Canary for PWA installations and I use DuckDuckGo's browser for browse and burn. I also have Edge installed for last ditch testing.

The task at hand is to disable JavaScript. This took me probably around 5 minutes, but that was just me switching browsers, navigating settings screens and generally getting lost. This is probably the longest I've spent _trying_ to get into a web site.

- Firefox: I couldn't work out how to disable JavaScript at all
- DuckDuckGo: this was my go-to to test Heydon's site, but this browser has even less settings - again, I couldn't disable JavaScript
- Chrome and Edge: both browsers share similar settings, and I found this tucked away under Settings > Site Settings > JavaScript - but this was a carte blanche across _all_ web sites (which, maybe makes sense?)
- Brave: under the lion face icon in the navbar, tap Advanced controls I can block scripts and this applies on an individual basis

In my mind, JavaScript is categorised as a privacy or security setting which makes sense that it's an exposed setting for Brave. I was surprised I couldn't disable JavaScript in Firefox (or at least _couldn't find how to_ disable JavaScript) as it feels like Firefox is more closely aligned with privacy the way Brave is in these respects.

These browsers' settings also raise an interesting set of questions:

1. If I can't disable JavaScript does this mean that JavaScript is required for the web to work?
2. If the default is to disable JavaScript across _all_ web sites, does this mean it's a concern as 3rd party cookies are a concern and something we want to block entirely?

I don't have answers for these, but I think it's an interesting position for browsers to come from.

Anyway, now, finally, _after determination_, I can read Heydon's web site.

I stuck with it. Am I the average, albeit privileged, user? What if I had followed a link from another person's web site into one of Heydon's blog posts? Would I stick out the multiple browser changes, multiple setting searches just to read a blog post? Possibly not. More probably **I would have given up out of frustration.** We'll get back to this.

In truth though I really only visited heydonworks.com to view the "redesign". Heydon's site is content based and I subscribed to his posts long ago over RSS which requires neither JavaScript nor CSS to be consumed.

## Is requiring no JavaScript "bad for business"?

I couldn't say, but if I were to bet, I'd be prepared to put down some of my hard earned monkey nuts to say that Heydon has had an influx of traffic following their redesign.

There's definitely the usual fair share of upset White Boy Bro developers at Heydon's antics, and replies citing that the site isn't accessible, or that the site doesn't "enhance" **but forces the user's browsing requirements.** We'll get back to this too.

I took a brief look at the hackernews comments (because of course there's going to be a hackernews thread - where else do upset White Boy Bro developers go to share their triggered experience… oh, I guess there's reddit too…). I skim read some of the comments and they're all pretty confused.

There's a thread of thought that this site is anti-JavaScript. But that's not really the point, and in fact, those people wouldn't even be talking about the web site if it weren't for JavaScript.

But is this bad for Heydon's web site? I doubt it. For one, our web sites, our online personas are goldfish in an ocean that is the web. I'm pretty confident that most of the readers of my own blog have never seen my business web site (or are even aware it exists) - those who do visit it are going there with intention. I suspect that's the case for heydonworks.com also.

If anything it shows that Heydon knows what he's doing. Probably more so than the developers bashing out the websites that leave my browser hanging or chewing up my phone's battery.

## An interesting lesson on JavaScript

Heydon's web site uses a single line of JavaScript to perform a very intentional task: to tell the visitor how to browse this web site:

```html
<script>document.body.textContent =
  'Please disable JavaScript to view this site.'</script>
```

The website's body of content is also wrapped in a `<noscript>`. Google has no problem spidering and caching the content by the way - I checked.

Heydon is very intentionally using JavaScript in a specific way to cause a specific action. The code is _fairly_ bulletproof, though IE8 doesn't support `textContent` so the visitor would get an entirely blank page…except IE8 also doesn't support the type of encryption used over HTTPS _and_ IE8's global market share (according to [w3counter.com/trends](https://www.w3counter.com/trends) is about 0.1%) so… probably not a problem in any shape or form.

The flip side of this is of course the untold number of web sites that *unintentionally* break due to their use of JavaScript.

Last year every single Gatsby web site that shipped would display **"This app works best with JavaScript enabled"** at the top of the page in a `<noscript>` tag.

There was nothing to justify the "works best" and in my own tests I found that a web site built with Gatsby with JavaScript disabled tended to render and react faster than when it _did_ have JavaScript enabled. This message wasn't an opt-in feature either, the owners of these web sites would be unaware that the notice would show.

Then there's the simple fact that **every single web site has JavaScript disabled** until the JavaScript is parsed and run. Please note: I am not saying anything new - this has been said many times by many smarter individuals.

What does the web site show when JavaScript fails? How much breaks? Is the web site still usable? How long did I have to wait before I could actually interact with the web site? All of these are questions that must be answered when using JavaScript on a web site, let alone making JavaScript a _requirement_.

Most of the web sites I visit on an average day require JavaScript to allow me to navigate the site fully. At least once a week there will be a web site that fails to fully load JavaScript for me and I'll (rage) quit the site and usually commit it to a bank of "web sites I can't be arsed to ever visit again because they messed up".

## But JavaScript isn't the point

Or at least, I don't think it is. The point, that I wanted to return to, as I take it, is that forcing a visitor down a specific path _just_ so that they can access the content is a burden that they should not carry. It is our jobs as web developers to make our web sites accessible to all.

That's the lesson that heydonworks.com is reminded us of.

There are many, many people browsing the web in many different ways. Ways that do not mirror my perfect 10 digits and my motor skills and my fairly decent eyesight, and (sometimes questionable) conative abilities. There are people who browse the web on a huge gamut of devices and browsers.

Forcing them to jump through hurdles because we, web developers, did a lazy job of checking how our JavaScript (or even CSS) works and fails and can cause obstructions is a god damn travesty and a failing of our jobs.
