---
title: Should I add another dependency?
image: /images/should-i-install.jpg
date: '2019-02-01 14:02:48'
modified: '2019-02-01 09:41:26'
tags:
  - code
  - web
published: true
---

# Should I add another dependency?

This is, by far, not the first post on this topic, but it's something that I've considered for years and years and recently I was presented with the question again.

Though this post is through a node perspective, it applies to front end development too.

<!--more-->

## The recurring question

When I [run workshops](https://leftlogic.com/training/) a question that has come up time and time again since my node workshops started back in 2011:

> How can I know these dependencies are secure/not malicious?

My answer has always been the same: you need to vet your dependencies.

Today there are some excellent tools available for dependency vetting: [Snyk](https://snyk.io) is the code security company I had the pleasure of working with during year one.

These tools can even notify you when a new vulnerability has been found in your project.

It is still down to you, the author, to manage the problem. During those workshops I always draw comparison to the front end development world, which by comparison to Node development, is a _little_ more mature.

I felt like by 2010, the front end developer had common sense to include "trusted" vendors and untrusted would have their code examined and either flagged as good to use, or the functionality would be hand rolled*.

Caveat: _not all developers_ - yes yes, I know.

For example, libraries like jQuery (again, this was 2010) had been vetted over and over, publicly. The heady days of pulling in scripts from DynamicDrive and the likes had long gone.

In a sense, the front end developer was a little more cautious*.

Caveat 2: see caveat 1…

## Missing functionality? Just npm install

Registries like npm are absolutely amazing for productivity. If I need to do date parsing, or <abbr title="Jason Web Tokens">JWT</abbr> signing, or make http requests, or any number of the things the current 40 billion packages on npm offer, then I can "just npm install it".

The problem I've seen both amongst my peers and with myself, is that we're a little too quick to run `npm install`.

Even when the vetting does take place, even a cursory check (is the project maintained, are issues being filed, latest change, etc) - it doesn't account for the vast depth of sub-dependencies.

Sub dependencies is my concern, and again, has been discussed by many others many times over.

## Due diligence

This is by no means authoritative, but these are the types of signals I look for when considering a dependency.

These signals aren't quite yes/no responses, but it'll help me weed out the libraries that I might not want to consider at all.

- Can I see the source code (without having to download a tarball from npm's registry)
- How deep is their dependency graph, and what are those dependencies used for
- Are there issues raised and open on their source code (github, gitlab or otherwise)
- Are the open issues new or very old? New might suggest active usage, very old might suggest inactivity or abandonment (which is totally legit, [supporting long term open source is hard](https://remysharp.com/2018/01/10/open-source-with-a-cap-in-hand))
- Are there tests and can I see whether they're passing (failing tests isn't particularly a red flag, it could be a non-public build)

Even after considering all these items, I still need to ask whether it's worth authoring the solution myself.

## To install or to author?

Very recently an issue was raised on nodemon asking for scriptable control of the config akin to `.eslintrc.js` (over a static file such as `.eslintrc.json`).

The suggestion was to use [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) - a library used in a lot of other utilities for config parsing. It checks for multiple config extensions and supports JSON, JavaScript and Yaml.

The big upside is that the library is battle tested.

The downside is: another dependency that carries it's own dependencies.

Of course there's also the edge risk of package hijacking to introduce malicious code deep down in the chain. Again, [well documented](https://snyk.io/blog/malicious-code-found-in-npm-package-event-stream/). I include it only as a factor in the decision.

I had a similar issue recently: I needed to copy the terminal output to the clipboard. Do I install _another dependency_ or just add the 4 lines of code myself to do it?

Authoring will take a little time, and there might be inspiration you can take from existing libraries.

Authoring the functionality yourself also offers the huge benefit of laser focused implementation. Specifically you're not consuming resources to support all the use cases - you're only supporting your use case.

## What to do?

For me, it's something I have to evaluate on a case by case basis.

I currently, perhaps naïvely, trust largely used projects like Express, React, graphql, Vue and so on (though exactly where "so on" ends, I'm not entirely sure).

It's the middle size projects I have to deliberate about. Very roughly speaking, I will lean towards 3rd party solution when I know the problem is hard to solve. Such as implementing a QR image decoder. I would still do my due diligence, but it'll have a higher likelihood of being installed.

As for everything else: they're in the grey zone.

Something in my gut doesn't want to take up _even more_ resources because I didn't want to write some mundane code. Which is in fact, what prompted this entire post.

TL,DR; be responsible and careful, and really, I don't think there's a simplified solution.
