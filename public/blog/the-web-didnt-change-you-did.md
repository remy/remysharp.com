---
title: "The web didn't change; you did"
date: '2021-02-11'
tags:
  - web
---

# The web didn't change; you did

If you didn't gather off the bat from the title, the problem with developing front end projects isn't that it's harder or more complicated, it's that *you* made it harder and more complicated. You have the power of choice, so choose what you want to do - because the choices are overwhelming and there's enough regular world overwhelming for a lifetime right now.

<!--more-->

## Framework fatigue

I can't remember when I started seeing this phrase but is was definitely in the last couple of years. Post after post in the open web community about framework fatigue. That is, the cognitive overload from not only being told that you're using the _wrong framework_ but that even if you are using the right one, there's a new version that adds some brand new programming paradigm.

This is a real thing and there are more and more shifts in framework and library options. I do sincerely believe that these solutions do solve some problem that exists somewhere. Take React and GraphQL for instance. They solved Facebook's specific problems with respect to their web site and the disproportionate amount of information they glean from their unsuspecting users. Somewhere along the line Facebook devs realised that this tech could be used in much simpler situations and thus open sourced the code. Same goes for Google with Polymer, and the iterations of Angular.

The thing is of course, if all these frameworks did actually stop evolving we'd very quickly get stuck and the web would stop innovating. Remember the days when everyone complained about IE6? If you don't you're lucky - you couldn't turn a webby corner without someone kicking off about how terrible IE6 was (and indeed is… compared to the latest).

This period of time that has brought rise to the Vue and Reacts has helped spawn reactionary projects like Preact and Svelte which, I my opinion, try to pare back the amount the framework can solve and helps reduce the general footprint of functionality (and in some ways complexity).

During 2019 and 2020 there wasn't a month that went by without a blog post _about_ framework fatigue. Now if your job is to keep changing the frameworks that the business uses on a regular basis - then you're definitely got your work cut out for you. But if your job is to keep an ear out for evolving technology on the web, well, then welcome to what every other web developer is doing.

Framework fatigue definitely exists. It's also known as innovation in this particular area of software development. Which is also **not a mandatory part of web development**.

## The illusive freedom of the jQuery days

What spurred on this blog post was a link, quote and a [comment from Jeremy Keith](https://adactio.com/links/17804). The quote was:

> Starting a new project? Make sure to write your project idea down because by the time you are finished setting up the vast boilerplate you have probably forgotten it.

Now, this advice on it's own is useful, but not for the reasons it's given. The complaint is that starting a new project is so time consuming with "frameworks, libraries, build, tools, pipeline and complexity" that it's likely to wipe you out before starting.

I keep reading lately about how complex web development has become. How, _now_ you can't build a site before getting all the tooling in place and selecting the "right" framework or spending untold hours learning some new JavaScript technology.

I keep reading how there was once a time that you could _just_ write some PHP and HTML and hit refresh and you'd see the fruits of your efforts.

How you could drop in jQuery and things were easier, and now the complicated web is here, and it's here to stay.

Dear reader - let me ask you this, and I hope you ask your colleagues the same: **what's stopping you from using _exactly_ method today?**.

I say: nothing.

jQuery is still there. PHP and HTML (though I don't think I ever saw a time where those were treated as two things rather than one weird mash of the two in a single file) and _regular old JavaScript_ is still there.

What's amusing to me today in 2021 is that I don't even need jQuery to do a lot of what I was using jQuery for - which just means I don't need to load additional JavaScript to play and create a web site.

These days are not illusive. This so-called simplicity has not gone. This simple pleasure of creating is still right there.

Sure the _choices_ might be overwhelming, but what you leant in the mid-2000s still works. Browser bend over backwards to maintain backward compatibility. As someone who is personally embedded very deep in web development I can tell the only big tech that's actually hard to do "the old" way is http (as in non-SSL) or "old https" because the new TLS stuff isn't supported by old browsers and the entire page fails to load.

But when it comes to web development there is a massive range of options, except, perhaps if you're [still using](http://www.stopbadtherapy.com/standards.shtml#new) `document.layers` you're out of luck, but we're talking about dropping support for a non-standard API from _over_ 2 decades ago (and don't worry, `document.all` does still work).

## It's the same old web

Web development did not change. Web development grew. There are more options now, not different options.

Browsers have become _more_ capable and still work with web pages built over [20 years ago](http:/./info.cern.ch/).

You can use as little as you want or as much as you please. Here, for example is a [web site I built](https://zx.remysharp.com/audio/#src=MjM3LDE3MCwwLDEwLDIzNywxNDMsMCwwLDE3MywxMjAsMCwxNzMsMTAxLDAsMTczLDg1LDAsMTczLDcxLDAsMTczLDE1LDEsMTczLDIyOCwwLDE3MywxOTEsMCwxNzMsMTYxLDAsMTczLDEzNSwwLDE3MywxMTQsMCwxNzMsMTcwLDAsMTczLDE0MywwLDE3MywxMjAsMCwxNzMsMTAxLDAsMTczLDg1LDAsMTczLDcxLDAsMTczLDE1LDEsMTczLDIyOCwwLDE3MywxOTEsMCwxNzMsMTYxLDAsMTczLDEzNSwwLDE3MywxMTQsMCwxNzMsOTUsMCwxNzMsODAsMCwyMDgsMzI=) that ported a Windows XP tool to the browser without using a single framework. The tooling pipeline, originally was: a text editor and the ability to upload to a hosting platform - nothing else. In my case, I wanted something that behaved like a specific Windows program so that prerequisite relies on some dynamic programming language (JavaScript).

But there's no doubt that it's entirely possibly (and likely) that you're working on a project with a complicated pipeline of tech all connected up. Maybe it's some tools to check your code for errors (linting), and some tools to build and transform your code (like JSX to JavaScript, etc), and some aspect of CI (for tests or automated accessibility checks) and then some provisioning and staging environment (Netlify, Google Cloud, etc) and then some end point analytics or smoke tests.

But that's because the businesses online have evolved and grown. In 1997, if your company was exclusively online you were either an innovator or a fool that was going to be quickly parting with their investment. Today, an exclusively online business is completely normal - so it's understandable that the parts that go into supporting that business are larger and more involved.

I wouldn't dream of hosting a business product on a platform that I couldn't scale through some web interface.

But for my own playing? There's no way and no need for the complicity that larger businesses need. In the same way that if you wanted to sell an old monitor on a site like ebay or the likes, you're not going to set up a limited business, file for VAT registration, appoint an accountant, get insurance and all the other gubbins.

The web really didn't change. It really didn't "become complex". The development process is not one single path. There is simply more choice and more options.

We, you and I, the developers, consumers and businesses are responsible for *demanding* more complicated (and thorough) tools. We are not, however, beholden to complexity.
