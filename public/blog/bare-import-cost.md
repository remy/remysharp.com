---
title: Bare Import Cost
date: 2019-05-10
tags:
  - web
  - code
  - grumble
---

# Bare Import Cost

This post is about `import` in JavaScript. This post, I'm afraid doesn't have any grand solutions or even semi-grand conclusions. In fact, by way of disclaimer, this is more of a stream of concious thought.

In my travels across the web lately, I keep coming across JavaScript libraries whereby the very first line in the "usage" is:

```js
import lib from 'awesome-lib';
```

Except that single, seemingly simple line, carries a lot of hidden work and understanding behind it. So here begins my complaint. But first here's an unimported bear…

![A bear…imported](/images/bear-import.jpg){title="They said I needed more pictures in my posts, so here's something totally tangently disappropriate"}

<!--more-->

## So delicately simple

This simple statement of code is incredible powerful. By no means do I intend to undermine the years _and years_ of work that has gone on and laid the groundwork to _allow_ us to have an import statement in the browser.

Today, in all the modern browsers, [we can use](https://caniuse.com/#search=modules) an `import` statement on the web with no additional tooling. Dynamic imports aren't far behind either (an import that returns a promise - useful for lazy loading).

Right on the edge of the horizon are [Import Maps](https://github.com/WICG/import-maps) which will bring support to the browser for "bare import specifiers" (currently [available behind flags](https://jspm.org/docs/guide#browser-modules-with-import-maps) in Canary). Once import maps are stable feature of (at least<sup>&dagger;</sup>) the latest browsers, then imports have come to [a fuller] fruition.

<small>&dagger; Why "at least" - what about cross browser support? I explain in the section on [prototyping](#prototyping-the-web)</small>

Until then, in the browser we can do this:

```js
import lib from './my-lib.js';
```

…but we can't do this:

```js
import lib from 'your-lib';
```

Well, you _can_, but it requires a lot more specialist knowledge.

## I really want to do that!

Importing modules brings a stability to development that historically browsers didn't have the pleasure of hosting.

JavaScript has a beautiful simplicity that everything can access the global scope. This makes development forgiving during the early days, but as authored software becomes more sophisticated a bit of privacy is desired.

Modules also offer code organisation which can (or "should") lead to better and more complete tests. Tests lead to stability and stability can be enjoyed by both the business and it's visitors.

There's also a matter of security: global scope provides another attack vector for potential bad actors that are included onto web sites - third party adverts are a potential entry point.

---

Thankfully the desire for a module system arrived years ago. My first encounters were with [require.js](https://requirejs.org/). However, I always struggled with the (now relatively small) overhead required to make a compatible module. This was called AMD - here's [a primer if you wish](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) to go down memory lane.

Of course we now have Browserify, Rollup, Webpack and a slew of other tools that _allow_ developers to benefit from modules. The crown jewel of tools is (IMHO) Babel.

Babel allowed us (and still does) to write tomorrow's code, today.

These tools are just the tip of the iceberg when it comes to tooling and workflow required to import, dare I say, synthetically for the web.

I digress, let's get back to today.

## Bare import specifiers

This is what I use all the time in [Node.js](https://nodejs.com) when I'm importing a module. Except I use the `require` function:

```js
const lib = require('your-lib');
```

Now it's a little unfair to compare `require` from Node to `import` for the web, and [Myles Borins did an excellent break down of this at jsconf.eu 2018](https://www.youtube.com/watch?v=35ZMoH8T-gc).

It's worth at least being mindful that there's a potentially complex system hidden underneath the software that's going to resolve exactly where `your-lib` exists. For Node, it's a [sequence of resolution logic](https://nodejs.org/api/modules.html#modules_all_together). Node however uses a synchronous method to resolve and running modules, whereas the web doesn't have a synchronous loading method at all. The web is async.

As it is today, a bare import, using the `import` statement, in a browser, isn't possible without a build tool doing some heavy lifting first.

## Prototyping the web

I've come to realise in recent years that my strength in development is prototyping. It's something that I'm good at and enjoy doing. My recent work at CERN to rebuild the [WorldWideWeb](http://worldwideweb.cern.ch/) in 5 days is a great example of this.

The web and browser combined, are what make prototyping so incredibly accessible. Software, good, stable, secure software takes a long time to write. The browser allows for quick, hacky, cobble-ly code to be achieve in a quite impressively small amount of time.

For me to build the WorldWideWeb.app browser in a week, meant that I didn't have time to build out the perfect workflow. I needed something that allowed me to start producing usable interfaces as quickly as possible. I knew that I would need a helping hand from larger frameworks (like React in my case) and I chose to use [Parcel.js](https://parceljs.org/) for my bundling needs. Importantly, this allowed me to `import` and dynamically import early on in the project and quickly focus on the real problems at hand.

I absolutely adore this part of my work: the fact that so little is required to start to play with code in the browser.

As such, I _want_ to be able to play around in the browser with just a single file: an HTML file with a sprinkling of `<script>` tags. I don't relish the thought of having the urge to play, and then being slamming back down to earth as I realise that to `import lib from 'your-lib'` I must first decipher and roll out a way of importing. After which I usually encounter so other shiny distraction and have forgotten about my original intentions.

…ergggh, what was I trying to say?

---

If you're writing some documentation for your project, please give a little thought to how your reader is going to interpret the `import` statement to start using the project.

New developers to the web have enough on their plate with the plethora of frameworks, testing utilities, linting tools, editor plugins, transpilation tools, transformation tools, transfiguration tools and all the other amazing, really amazing, choices in front of them. Tripping them up at the first line of the code seems a little unfair.

One day we will be able to install web modules and import them. For now maybe we can use [pikapkg](https://www.pikapkg.com/blog/pika-web-a-future-without-webpack) or perhaps import directly from [unpkg](https://unpkg.com/)'ed modules or perhaps [hack our servers](https://medium.com/samsung-internet-dev/isomorphic-es-modules-151f0d9a919b).

Until then, I'll probably keep actively (trying) to remove my build tools and probably [continue to be Moany McMoan](https://mobile.twitter.com/rem/status/1126479414802440192) on Twitter.

*[IMHO]: In my humble opinion
*[AMD]: Asynchronous Module Definition
