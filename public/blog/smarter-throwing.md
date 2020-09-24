---
title: Smarter throwing
date: 2020-09-24
tags:
  - code
---

# Smarter throwing

With `async/await` becoming standard procedure for a lot of my code, I find myself wrapping blocks of code in `try/catch` to ensure I'm handling errors properly.

As a result of this, I also try to make my errors a little more useful at the same that I want to show you in this mini post.

<!--more-->

## The example

I have large validation process that runs through a series of statements and checks for particular problems and rules.

Each validation rule is run and if it fails, it throws with a message, such as:

```js
export function validateFakeExample(token, scope) {
  if (token.text !== 'PRINT') return;

  const next = scope.peekNext();
  if (next.name !== AT) {
    throw new Error('Parser error, PRINT keyword should be followed by AT');
  }
}
```

My main function runs each of the validation rules all encapsulated inside of a `try/catch` because I also want to capture additional metadata that will help my user understand _what_ caused the error.

So in my wrapping `catch` I have something like this:

```js
} catch (error) {
  const message = error.message + `, "${token.text}" at: ${token.pos + 1}`;
  throw new Error(message);
}
```

This way, when the error is given back to my user, they'll see:

```text
Parser error, PRINT keyword should be followed by AT, "INK" at: 10
```

Actually I use this pattern a lot, to catch the source error, interpret it, and `throw new Error` to help me better understand what was going on.

Except it can be smarter.

## Being smart

When I call `new Error` a brand new error object is created. At this point a few things happen, specifically the stack is captured. A stacktrace is incredibly useful for debugging to trace back to the source of the problem.

Except, because I generated a brand new error, my stacktrace will originate from within the `catch`, which is helpful to a certain degree, but could be a lot more useful.

I _could_ do something with the stack. At times I've added a `console.log(error.stack)` in the `catch` which I can go searching my logs for.

What I _should_ do is instead of throwing a `new Error`, I can _simply_ modify the original `error.message` property (🤦 why did it take me that long).

So now my code looks like this:

```js
} catch (error) {
  error.message += `, "${token.text}" at: ${token.pos + 1}`;
  throw error;
}
```

My custom error message is passed by to the user (normally me) _and_ my full stacktrace is retained.
