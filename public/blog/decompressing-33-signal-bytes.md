---
title: Decompressing 33 signal bytes
date: 2026-06-29
tags:
  - code
---

In my RSS reader, I stumbled upon this code-golfed (i.e. minimised to death) [snippet](https://gist.github.com/GulgDev/7b113b5e971682a6512d96c9c0fdf6da) that's fairly clever, but from the code, utterly opaque.

I couldn't immediately see how it worked, and since Copilot autocompletes most of my code for me - whether I want to or not, I figured it was a good bit of practice to decompress and understand.

First things first: snooze the little copilot bastard for an hour!

<!-- more -->

_Side note: because I got this post through my reader, I didn't happen to clock the link right after ([in the newsletter](https://javascriptweekly.com/issues/791)) that read "a Redditor breaks down exactly what's going on". So…um…yeah, I guess wasted energy, but probably good for my brain._

Here's the original author's code:

```js
const signal = F=>(f,G=F)=>F=f?_=>f(G?.()):F?.(); // 33 bytes
```

The crux is that it creates a wrapped stack of callbacks. Effectively recursion through locally defined (and overwritten) variables (`G` in this case).

I started by unpacking the implicit returns so I could see more of what was going on (and renamed `F` to `callback`)

```js
const __signal = (callback) => {
  return (f, G=callback) => {
    return callback = f ? _ => f(G?.()) : callback?.()
  }
};
```

From there, I "simplified" everything as far as I could so that that all the neat tricks could be seen. This certainly isn't _better_ code (probably a version of the one above with nicer names would work).

```js
/**
 * The function stores local variables that are overwritten
 * with a call stack of passed in functions. When the argument
 * is falsy, then the stack is unwound.
 *
 * Call stack looks like: four(three(two(one())))
 */
function signal(/*F*/ callbackStack) {
  return (/*f*/ callback) => {
    // Each new time the signal singleton is called, it creates
    // a new copy of the `callbackStack`, originally as an
    // argument which saves on the `const` part.

    const localCopy = callbackStack; /*G=F*/

    // if we're passed a callback, then redefine `callbackStack`
    // with where the local copy is called first, then we run the
    // callback. Calling this singleton multiple times creates
    // a stack of functions like:
    //
    // four(three(two(one())))
    //
    // there's also the initial protection with `?.()` to allow
    // for `callbackStack` to be `undefined`. In the example
    // below, I've just unrolled the code.
    if (callback) { /*F=f?*/

      /*f(G?.())*/
      callbackStack = _ => {
        if (localCopy) {
          localCopy();
        }
        return callback();
      }

    } else {
      // otherwise, when called without any arguments, and the
      // `callbackStack` is executed and overwritten at the same
      // time.

      if (callbackStack) {
        callbackStack = callbackStack(); /*F?.()*/
      }
    }

    // the original code returns the `callbackStack` through the
    // implicit return, but it's not actually used for anything,
    // it's just a side effect of compressing the code.
  }
}
```

Obviously this isn't the point of code-golf, to take someone's hard work and walk them back to the start (and probably even further back), but it was a good bit of brain exercise for me.

For comparison, here's the [Redditor's explanation](https://www.reddit.com/r/javascript/comments/1uc0scy/comment/ot4dm0o/).