---
title: 'My experience with enhance.dev'
date: '2023-11-05'
draft: true
tags:
  - code
---

# My experience with enhance.dev

- web component based, both client and server
- the server side WC are where this software shines
- I prefer to understand how a system is (approximately) working so I know how to work with it, instead of against it
- newish so docs are still tweaking, though generally very straightforward to follow
- I've used 11ty's [WebC](https://www.11ty.dev/docs/languages/webc/) which is similar-ish to Web Components, and though I also liked developing with WebC, Enhance's offering doesn't (appear to) add any sugar so it lets me code with what I know.
- Small gotcha (specific to me): I've started using nested CSS during development because my browser support is, but going to production, I _usually_ transform the CSS [through postcss preset env](https://github.com/leftlogic/ffconf2023/blob/a5ac0d126b5bbc1206b17f88533dcb55f9733a8b/postcss.config.js), but as some of the CSS in the web components are inside components so I can't transform it.

## Pros

- web like
- really familiar syntax, i.e. html, css and just plain-ol JavaScript aka Web Standards.
- excellent responsive team to support you on discord
- generally works out of the box

## Cons

- a little magic happening behind the scenes, but I felt that this was in place to help the developers used to react-dev-cycle get used to something different. Related to this, coming in with react in the back of my head did me a disservice.
- Related to above, I found the partial updates rarely worked with the way I was coding (though [kj](https://github.com/kristoferjoseph) did give me a [PR](https://github.com/remy/bug-enhance-style-leak-render-issue/pull/3/files) that explains how to get the partial updates hooked in better/properly)
- deploying is tied directly to AWS
- actually getting the domain connected is not a simple task (though it is well documented)
- still some bugs that I ran into, but I seem to live in the edge of what software is supposed to do, but I found it frustrating - though one I could identify it, the enhance team had a fix usually within a few hours (i.e. it's not been battle tested, I'd expect this not to be a problem at all in a few years)
