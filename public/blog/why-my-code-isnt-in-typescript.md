---
title: "Why my code isn't in TypeScript"
nosubscribe: true
date: 2024-02-23
tags:
  - code
---

# Why my code isn't in TypeScript

I came across a reasonably interesting question on Reddit today, ask "If you don't use TypeScript, tell me why (5 year follow up)".

Frustratingly it was mostly replies as to why the dev *was* using TypeScript, or replies to those who didn't saying that they're probably using TypeScript wrong. I guess that's the state of the developer bro/you're wrong culture we've managed to create.

Anyway, it made me want to consider why my code doesn't use TypeScript and what I personally (still) struggle with when it's a requirement of the client work.

<!--more-->

## Parsing

A "well crafted" definition, type or interface (still no idea when I should use each), is often a huge cognitive load on me.

Being presented with lots of double colons, `<T>` when I'm not sure what `T` refers to, a wall of interfaces and more is an upfront cost on me, the reader.

Often the types will be tucked away in other files (probably good) but working out the argument required to a function call often leaves me distracted in the task of understanding what's required rather than making my function call.

I'm sure if I spent a few years loving TypeScript then maybe parsing the types will become muscle memory. But for something that could be easily solved with documentation (and scarcely much would be needed), I find it hard to be motivated.

Speaking of documentation...

## Docs and examples

I've lost count of the number of libraries that point to their type definitions as an excuse for actually providing docs, or even a surface level API.

Pointing to types is no better than the Java-like generated docs. There's inevitably an argument called `options` that's defined as an `object` pointing to MDN to help the reader understand what an object is, rather than documenting the properties.

Again, remember reader (and you trolls, I know you can read too), this is my own experience, not yours.

Then we come to examples. This is where in the work I'm doing lately requires I take some code samples from projects like Next, which are written as TypeScript, and as soon as it's pasted into our project (and duly adjusted), the code is shouting RED SNAKES... TypeScript is angry about something that's been introduced by the sample code that was indeed itself TypeScript.

I'm yet to understand whether it's not validated on the example site or if our project has some extra stuff in TypeScript that means it's not compatible.

## Appeasing TypeScript

This is probably the hill I'll die on. There are three main blockers I run into on a regular basis:

- I spend more time trying to resolve TypeScript complaints than I do adding code
- Our team has lost hours on TypeScript exceptions in staging and production builds (but oddly not offline/local) where some external type was missing or incompatible, another one being that the local environment passes linting but CI doesn't, it shouldn't be so hard
- Having to rewrite correctly and infallible JavaScript so that it was friendly enough for TypeScript to understand

I've used TypeScript in a single file app that was being run with Deno. I think I could count the types defined on one hand and it didn't help anyone (but it was a Netlify Edge function, which has to use Deno, so TypeScript was fine to use). In this case, the code is so simplistic that it both doesn't benefit from TypeScript but is a breeze to code: no red snakes.

But when it comes to team code, a larger, more complicated codebase (one "at scale" some buzzword bingo players might say), it's hazardous. I'm regularly presented with a wall of errors from TypeScript in VSCode telling me through some form of recursion (I'm guessing) that either the argument in, or the result out is incompatible.

![Trace](/images/ts-trace.png)

Here's a real example. I even pay for CoPilot, almost exclusively, to explain TypeScript errors to me (goodness knows what the TypeScript library can't do a decent job of explaining errors, we devs are suckers for shit tools). But half the time CoPilot suggests some nonsense change (or even exactly the same code that's already in place). At best, it gives me a hint as to what I should start editing.

But…sometimes it doesn't help:

![Copilot attempting to fix TypeScript](/images/ts-rewrite-fail.png)

Finally, having written JavaScript for such a long time (going back to '99), I've spent a lot of time trying to fully understand the language and capability. So every now and then (more often than I would have thought), I run into a problem where TypeScript insists that there's potential for a error, yet it's impossible in JavaScript (known as the classic "Remy Knows Best"… (sure, I'm not infallible at all!)).

Still, this was the latest example:

![TypeScript's wrong](/images/ts-impossible.png)

In this case, TypeScript specifically wanted the `upperCase` call to protect against being `undefined`, this code avoided the error: `_[0]?.toUpperCase()`.

The problem is that `_[0]` can never be undefined, it's just not possible.

_Edit: I've been writing this post over a week, and it's now been a month before I finally got to the bottom of this…_

It turned out, buried deep inside the project code was `noUncheckedIndexedAccess: true`, which had only lead to the code being littered with the [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) operator `?` (which, I'd argue adds extra cognition to parse the code as a developer).

It's in these processes that I have wasted so much time.

---

I am entirely certain that TypeScript helps other developers, and my problems are *my problems*. But, prompted by the Reddit post, I found it useful to articulate what's been troubling me. I wonder if I'll return to this post in another 5 years with a different experience...
