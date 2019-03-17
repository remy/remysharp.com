---
title: Frictionless
date: '2018-07-22 20:18:31'
modified: '2018-07-22 21:42:49'
complete: false
inprogress: true
tags:
  - code
---
# Frictionless

In the last few weeks I've release three or four micro projects, all with solid value to myself (Whilst one or two with potential value to others). That number of working projects is, I think, quite decent. And it's not that I'm a megamind or anything, it's just that I've found a workflow that cuts through all the bullshit involved in getting started.

A workflow that cuts through the bullshit: config zero.

*Frictionless.* Do not underestimate this.

<!--more-->

## The golden era of slinging sites online

I originally come from a Perl based web development background from '99 through to the mid 2000s. When I went to start my own consultancy however, I decided to use PHP to build the client projects.

I _didn't_ think PHP was better than Perl (and quietly I would kinda resent PHP for my own terrible misjudgement). The key difference was that I could knock together a web site in PHP extremely quickly. The work would focus almost entirely on "business logic" (i.e. code that solved the specific problem) and HTML mixed with a slew of `<?php … >` symbols (where I was embedding PHP directly into HTML).

I didn't have to worry about configuring the server - because at the time, I could reuse my Apache config and add a new directory (via a small bit of copy-and-paste magic which I perhaps didn't fully understand) but that was it. Admittedly this was long before the commonplace of <abbr title="platforms as a service">PAAS</abbr> (akin to services such as Heroku and the like), but once everything was configured for one web site, it was configured for any number of web sites on the same machine.

PHP was a huge huge success, even though considered as inferior to "proper" developers (sadly I included myself in this group - and really "proper developer" isn't a thing—seriously—try to find an actual definition…it's nonsense).

One of PHP's slam dunk features was that it had an *incredibly low friction to&nbsp;release*.

Anyone would wanted to become a web developer could copy and paste to their hearts content, fiddle around with some HTML, JavaScript, CSS and PHP, and have a functional, dynamic web site up in not-a-lot-of-time&dagger;.<br><small>&dagger; An actual measurement of time.</small>

[These days](https://www.youtube.com/watch?v=vzQRTn77Crk) it's a very, very different story.

## If it ain't hard, you're doing it wrong

Blegh. What total nonsense. First of all: you're not doing it wrong, you're doing it your way. You will, however, find lots and lots of articles on the complexity of building a web app ne site. In fact, I believe there's a meme required to be released every 3 months about web development - we've even got one for [summer of 2018](https://twitter.com/smashingmag/status/950400331342663680).

Web development is as hard (or rather: complex) as you make it. Although, in a lot of cases, it's not _you_, it's the business' requirements - particularly as teams grow, processes are put in place, more accountability, tooling, reporting, red tape, and hoops. So long as they're justified somewhere along the lines it's legit in my book.

However, there's no way that I could release a project a week if I spent a lot of time in tooling. Don't get me wrong: sitting in your tool shed, shocked into glassy glazed over look by wonderment of all the tools you've configured and even built yourself is great for ones own narcissism.

One brief example of this for me lately was that my eslint configuration was complaining that `<> / </>` was failing (shorthand React for a fragment). The code still works with the warning, but the little red snaky warning _had_ to be resolved. So began 4 hours of rabbit hole diving. I fixed it, but did I feel like I had achieved something that day? Hell no.

For me historically, I've been an extremely late comer to progresses such as React and ES6. I would rail and resist build tools because I didn't want to get sucked into the void known as Configuration Tweak Hell. JS Bin (version 4 - currently live) has a Grunt config that it uses for minification and deployment, but the sole reason it's not been upgraded or even changed in years ([quite literally](https://github.com/jsbin/jsbin/blob/master/Gruntfile.js)) is that learning these tools has no value beyond their lifetime of use.

Either the tool falls out of favour eventually (see the grunt, gulp, browerify, webpack, etc cycles) or it's a configuration that I return to on an extremely low frequency and have to re-learn the whole setup again.

Tooling has its place. Tooling is invaluable for problems it solved. The best tools, I say, are the ones that work for you.

## Tools that work for me

Rather than me working to configure the tools, I've stepped rather quickly from _trying_ to configure webpack or rollup and moving over to projects like Next.js. In other cases, I literally waited until the browser could support the ES6 language features I needed and skipped the build process entirely&dagger;<br><small>&dagger; In these cases it's either for internal web sites or web sites intended for _me alone_.</small>

My workflow almost reminds me of PHP: I initialise a new project with Next and React (a single line npm command), and then I write my HTML-like markup (JSX) and inside of that markup I can embed my business logic.

It's not important to me that I'm using React. I'm fairly certain that [Vue](https://vuejs.org/) (but without evidence) has a similar low-to-no friction setup and go approach.

So, I say to you, after you've done me the kindness of reading my wittering words: find a workflow that's fast or even frictionless to get doing. Find a workflow that let's you jump right into the interesting part of your work. And have fun.
