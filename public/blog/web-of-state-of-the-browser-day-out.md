---
title: 'Web of State of the Browser Day Out'
date: '2026-03-18 09:00:00'
nosubscribe: true
image: /images/dave-sotb.jpg
tags:
  - web
---

# Web of State of the Browser Day Out

Okay, that's a stupidly obscure title. It's meant to represent the combined events: [State of the Browser](https://2026.stateofthebrowser.com/) and [Web Day Out](https://webdayout.com/) - two events I attended in the last month.

The short version is: if you get the chance to attend these events or even *anything* similar, I'd highly recommend that you grab that ticket and let the event wash over you.

For those that didn't attend (or maybe you did and wanted to read my perspective) then here's my thoughts on the separate events and then the round up of my own experience.

<!-- more -->

## State of the Browser

London based and fronted by the lovable [Dave Letorey](https://letorey.co.uk/), always has a strong accessibility story - both from a practical ("how to make the web accessible") but also universal access - in that all are welcome and an open web is championed through the talks and the heart of the event.

I tried to take a few notes for myself during the day, but this quickly fell to the wayside by midday (I find if I'm taking notes I'm slowly losing track of the talk, so it was more important at the time to stay in the moment).

The day did start with [Bramus Van Damme](https://www.bram.us/) with an excellent dive into CSS anchor position, an exciting new feature of CSS that's landing throughout browsers that means we can move a lot of complex JavaScript into the bin. The CSS spec itself it's wholly simple, and there's a blind spot specifically around recreating call out arrows (usually done using rotated weird border magic).

I do question the ease of testing - though I think a talk on how to test CSS (with launching a browser and diffing the screenshot) would be extremely valuable.

Another talk by [Fiona Safari](https://www.linkedin.com/in/fionasafari/) on how they learnt to work with their introvertness(?) left me feeling very "seen", though [Stuart](https://www.kryogenix.org/days/) did raise the valid point that this felt a little like the [Barnum effect](https://en.wikipedia.org/wiki/Barnum_effect) - where you're able to recognise yourself in most things (we're human after all, and patterns and self interest is programmed deep in us).

This quote really meant a lot to me, and I think about kids who don't push themselves to the front of the class - this is one to remember:

![Being an introvert & extrovert had nothing to do with confidence, social skills or personality flaws - Carl Jung](/images/introvert.avif)

[Zach Leatherman's](https://www.zachleat.com/) talk looking at how a common picture compare component would and could be developed from the day the first `img` element was released to today. Especially drawing attention to the "dead zone" where code has landed in the browser yet the interactivity isn't at all ready.

The time to interactivity is a metric I think (I hope), we're thinking of all the time, but to see it articulated and in the context of a relatively contained context really helped - especially considering that webbies have to go back to work and argue the case.

Then [Jason Williams](https://jason-williams.co.uk/) gave a wonderful context to how [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) came about and the sheer scale of the work.

I've spent my fair share of bemoaning the JavaScript date object (since '99, so yeah, I've been at the sharp end of `Date` suckage!), so learning about the mammoth effort that went into bringing a completely new date structure was a real treat.

I've been using Temporal for a good few years via a polyfill, but to learn there's so much more *and* it's arriving cross browser (and server-side) is valuable.

[Chad Gowler's accessibility talk](https://www.linkedin.com/posts/kitation_the-plateau-of-accessibility-compliance-activity-7434924356574752768-Szon/) was absolutely superb and I do hope they have the opportunity to give the talk again at more events - so many people can learn from these experiences.

Likewise with [Mike Hall's](https://bsky.app/profile/mikehall314.bsky.social) story of battling for every single byte for performance in a time when it really, **really** mattered (and in some senses, still does). Mike's always a pleasure to listen to (both as a speaker but also his podcast).

I'll be there for next year's [State of the Browser](https://2026.stateofthebrowser.com/2027/)

![Dave sharing the news of State of the Browser 2027](/images/dave-sotb.avif)

## Web Day Out

My general feeling from (the first) Web Day Out was that there was a strong sense of practical takeaway from the talks.

I'm hoping the slides will be available (if they're not already) because there's lots of little details in many of the talks that I definitely felt like I could apply today.

All of the talks from Web Day Out were ace quality, reflecting the wonderful speaker line up.

[Jemima Abu](https://www.jemimaabu.com/) very much set the starting tone for the day. A taste of new and exciting CSS features (touching on some of the items from Bramus at State of the Browser), and speaking to the solid idea that there's technology that's moved out of the JavaScript cycle deeper into the platform, either available in CSS or event HTML itself (such as `popup`). Giving me even more reason to [eject bytes](/2026/01/13/bytes-i-can-delete-after-all-this-time) from my code.

The original Lady of CSS, [Rachel Andrew](https://rachelandrew.co.uk/) talked about what [Baseline](https://web.dev/baseline) means to development and talked about the very practical nature of support.

One incredibly interesting item that I've not heard others mention: Rachel points out that given the nature of the data collected on Baseline support, it's now possible to accurately predict browser support by a given amount of time. Specifically, if a feature moves to "newly available" today, it will land in "widely available" in 30 months. This might sound like a long time, but Rachel makes the excellent point that developers working on a year-long+ project can use features that may not have wide support from the outset, but they'll be able to pick features based on expected support at the time they go live.

Rachel did also talk about how the Baseline project, in an early form, did consider whether to include [polyfills](/2010/10/08/what-is-a-polyfill) as part of the support timelines, but the search for a "gold standard" of polyfill was…elusive. For my part, personally, I wouldn't want or expect to see polyfills being stamped with approval by browsers. As Rachel said herself, the requirements for polyfills (and what's considered Baseline) is entirely dependant on your own projects and products.

![Rachel stands in front of a slide that reads: The search for gold standard polyfills - the perfect polyfill is hard to find](/images/rachel_polyfill.avif)

Next was [Aleth Gueguen](https://alethgueguen.com/) who shared their story of development and testing directly from the trenches - figuratively _and_ literally. In the post-social a good number of people shared how much they appreciated the insights saying how they'd love to hear more real-life stories, as often it's the real development and challenges overcome that make an interesting story (echo'ing Mike Hall's story from State of the Browser).

Then [Harry Roberts](https://csswizardry.com/) took the stage to talk outside of his usual stomping ground. That's to say, instead of performance and measurements he instead spoke to the impact of _not_ building for the web. He shared practical examples of where (anonymised) clients had brought Harry in to work on their performance issues whilst they grappled with framework upgrades. It's a strange web-world we live in when the typical path development path is to reach for Next/Nuxt/Fux/Whux/evar because everyone is does and laden the users with bloat.

Harry had many excellent points during his talk, one that comes to mind as I write today was how optimising for 2nd page load with a coach load of JavaScript, when the bounce rate is so high is premature optimisation (pause for feigned shock) - which ultimately costs negatively.

This wasn't Harry's normal wheelhouse of talk - by his own admission - but an excellent one, and I hope he gets to repeat it for others.

Post lunch, was [Manuel Matuzovič](https://matuzo.at/) sharing his newly gained knowledge from questioning if what he knew 3 years ago still stands, and modifying and improving the tech he was using - squarely in CSS land. He used his own pet project [oli.css](https://olicss.com/) as a place to experiment (I **strongly** approve - always find a safe place to play), and in particular shared his really interesting take on a CSS "reset" (not a reset per se, because browsers have managed to converge on a solid starting point, but a great starter CSS) and how he layers and reuses throughout the project.

Keeping in this space, which [Jeremy](https://adactio.com/) made clear he had curated the talks and order into these excellent pairings, [Richard Rutter](https://clagnut.com/) talked us through what had changed in (web) font typography in the last 9 years since he published [_The_ Web Typography book](https://book.webtypography.net/).

I'll be honest, I really didn't think the web type scene was either interesting or even moving. But by gosh there was a LOT. Tonnes of interesting tweaks that we can be making here and today, lots of features that were in Baseline, others that were coming. Of all the talks, Richard's had the most "oooh - I really need to pinch this for my website" slides. I'm hoping they'll be available (and I remember to find it) because it really was a treasure trove.

In the final straight was [Jake Archibald](https://jakearchibald.com/) taking a zoomed in view on the customisable `select` element that is landing (or _landed_). A (typically) hilarious talk where he went all the way back to 1993 and went through all the events that needed to take place before developers (finally) laid their hands on a stylable select - whilst also showing us _how_ to style the select today.

Highly enjoyable and difficult to ignore the contents of his slides! 😂

![Jake's slide reads "Look, this is just some placeholder text. You should be listening to whatever I'm saying rather than reading this. Seriously, stop! I might say something interesting. I mean, I hope I say something interesting. Oh god what if no one finds what I'm saying interesting? I'm going to have a panic attack."](/images/jake_select.avif)

Finally [Lola Odelola](https://lolaslab.co/) talked about their experience approaching and implementing a missing browser feature - a fallout from their talk at State of the Browser in 2024 asking the question: _should there be a `prefers-alt-text` CSS feature?_. Very much from the land of how-the-sausage-is-made and makes me twitch to want to have a crack myself (lol - if I ever had time).

## What I came away with

Look, if you've been to even a handful you'll already know it's the people between the talks that makes it all worthwhile. It's always lovely when there's talks that give me a little shove towards tinkering with code, doubly so if it's a friend up on stage (new or old) giving the talk.

For the first time in a long while I attended the post-event parties (I tend to miss out on Brighton or London event parties because home calls). In doing so I had some really, really lovely conversations with different people (though landing myself chats finishing at 3am and 1am respectively 🤦).

---

As I sit in these events, I'm thinking about what I want from FFConf. A conundrum I face is that as I increasingly follow politics, the more I want to share what I learn about the world.

At some point during the last of the talks I realised actually what this web community is, is a microcosm of exactly the kind of progressive community that I identify with. A community that cares about representation, dignity for others, equality and sharing.

I've always known I was happier in (what I called) the hippy nation of webbies, but it makes me realise actually what we're doing in the corner of the world can be applied to how we conduct ourselves in the broader sense - and actually the politics I follow these days are very much aligned with the politics that I care about inside of the web community.

