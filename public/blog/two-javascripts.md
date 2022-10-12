---
title: 'Two JavaScripts'
date: '2022-10-13 10:00:00'
nosubscribe: true
tags:
  - web
---

# Two JavaScripts

I've been looking at [enhance.dev](https://enhance.dev) and their docs and though I've not tried it in anger yet, I think it's a framework to developing that's leaning on something that's been on my mind: **there are two JavaScripts**.

One for the server - where you can go wild.

One for the client - that should be thoughtful and careful.

<!--more-->

## JavaScript's bad rep

This post is more for my peers, since I live in the *more* open web world (rather than TechBroLand), I regularly see JavaScript being thrown under the bus on twitter amongst my peers.

In truth, I do it too. I've had way too many encounters with web sites that have failed through think through their JavaScript design to be left with a broken page.

Or, when those annoying YOU MUST SUBSCRIBE modals appear, I simply block JavaScript for that page, but then half the page doesn't work - including images - which last I checked don't actually require any JavaScript to work.

So what went wrong?

## "Write once, run everywhere"

This used to be the goal. To be able to write one code base that would run in all environments.

In the early 2000s I considered this to be run on any browser on any operating system, but in the last decade, with frameworks (or libraries…who knows) such as React and Vue, that's extended to the server too.

And for a time, it was amazing. Amazing for developers, not so much for visitors and end users. Though I think (or assume) that over the years those frameworks have worked to repay the performance dept they borrowed from the visitor but a lot of harm (through design patterns) has already been done.

### An 11 meg anecdote

I was working on a Vue app that used Nuxt (version 2). It was heavily data driven, but entirely static. My thinking was that Nuxt (a server rendering framework for Vue, akin to Next for React), would build the HTML, send it over the wire and the visitor would get the content they want.

Except behind the scenes, Nuxt was also sending *all* the data that built the page, along with all the Vue framework. In some cases, the data that was used to build the page (remember, on the server) was 11mb large. On the server, that's fine, 11mb of JSON dumped into the page *especially* when it's not going to be used is problematic.

Eventually we worked out how to (literally) hack the Nuxt system to prevent this, but the framework was working against us.

### Write once is a sledge hammer approach

Writing one codebase that runs both on the server *and* on the client seems great in principle, but no amount of logic is going to sensibly separate what is intended for for the server and what's intended for the client.

I think this is how the crappy reputation has come about. As a developer, it's "easier" to add *another* dependency to my project to do some simple task like offer me a themeable template than it is to carefully craft the HTML required to perform the same task. The problem is that it then generates way more output than required and puts that burden on the visitor.

Another example that comes to mind is the humble `form` element. A form should be post'able without JavaScript. For instance, I'm sending you my contact details - if JavaScript broke (bad connection) or is disable (you're spamming my face with subscribe notices), then a form should post details to the server and then reload with page like "thanks for you deets". Not rocket science.

Try to implement that using Next.js (which I'm definitely a fan of) and I can't think (off the top of my head) how. You can post to "api endpoint", but that'll return JSON ordinarily, plus it looks weird in the URL. I'm sure there's a work around, but the point is that it has to be worked around, intentionally.

## Two JavaScripts

I think my peers are right to be critical of JavaScript and it's role in creating unusable web pages. The only time I've had sites not work in the last 12 months has been entirely down to JavaScript.

However, it's the JavaScript on the client side that's the problem. What's given to the visitor.

I'd ask you, if you're still reading, that you consider a separation of JavaScript between client and server. If you're a dev, consider the payload, your bundle and work to reduce the cost to your visitor. Heck, think *progressive enhancement*.

On the server, the language really doesn't matter. I'm a JavaScript dev, I enjoy writing with that language and I find I can write server side code quickly and easily in that language.

All of which is to say, that on first impressions, the enhance.dev project looks interesting to me, but not so much it's approach (which is around web components, which, good lord: at last!) but in it's separation of server and client yet still being in JavaScript.

It looks to be project that's leaning hard on progressive enhancement, which means everyone benefits from working web sites.

I think we need more of this thoughtful separation in the JavaScript development land.

To my peers: I don't think we need to through *all* of JavaScript under the bus, but just the client side JS when it's pulled off poorly.
