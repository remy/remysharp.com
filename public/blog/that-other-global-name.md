---
title: 'That other global: name'
date: '2021-01-21'
tags:
  - code
---

# That other global: name

Along with the likes of `this` and `window` there's another global variable that knocks around the browser: `name`. It would typically be set when code would call `window.open` - you could _name_ the window.

Except it could also do something else rather special: persist across reloads.

<!--more-->

## A brief backstory

There's no need go deep on this, but `name` was a wonderful variable back in the pre-HTML5 days as you could drop session like data into the variable and it would persist.

It behaves almost exactly like `sessionStorage`. If you set an object to `name` it becomes serialised into `[object Object]` upon reload. But strings would survive and that's how [early polyfills](https://gist.github.com/remy/350433#file-gistfile1-js-L38) for `sessionStorage` would work.

It's great. Until it's not.

## Confusion and bugs

What it's great is when you forget that `name` is a global that's just knocking around, and you also work with universal frameworks like [Next.js](https://nextjs.org/) or [Nuxt.js](https://nuxtjs.org/) or really any framework that works in the browser.

This is because during development, you could use a variable that happened to be called `name` (which isn't the best name, but in 2 decades of development I've certainly used that label _a lot_) and if you, by some chance, forget to declare the variable then it's still valid code.

If you're using universal code (i.e. code that runs on both the server and the client) then the client is going to run fine, but the server is going to complain that the variable is undeclared. Confusion, inconsistencies and mayhem ensue.

I've been caught twice in as many weeks by `name` somehow becoming _undeclared_. In both cases it was due to a refactor that came in via a pull request and linting doesn't pick the problem up.

No so easy to spot the problem from the screenshot below, it actually all looks kind of okay…

![Not easy to spot the problem](/images/name-nothing-wrong.png)

Until today! (that's to say: this blog post is for me to remember to never mess this up again)

## Protection from name

I use linting in all my projects these days. I have a fairly [standard copy and paste](https://gist.github.com/remy/9f87cf4a07f48cde16db4fe19827297d) for my `.eslintrc.js` file and I dump it in the root of my project and off I go.

As of today however, I've added a single rule that stops me from missing this problem:

```json
{
  "rules": {
    "no-restricted-globals": [
      "error",
      {
        name: "name",
        message: "Use local parameter instead.",
      },
    ],
  }
}
```

Now, compared to the previous screenshot, it's clear the `name` isn't in the local scope and I'm about to accidentally use the global - which I never actually want to do:

![The issue is now very clear with linting](/images/name-spot-the-problem.png)

A small change to my config but a big win for me and now prevents those nasty little bugs from sneaking into my code.
