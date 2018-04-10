# I've been doing reduce wrong!

There's something I find particularly pleasing about chaining my code. I enjoyed it when I wrote a lot of jQuery, and even prior to jQuery, I remember feeling like it was a code super power that I could chain function calls together in JavaScript.

It stands to reason that with arrow functions and a handful of array methods, my inner chaining unicorn is free to run wild. Except, in my case, when I use `Array.reduce` I typically drop into a multi-line function, ugh!

<!--more-->

## Prior use

I ran a grep (using `ag`) and I found a lot of this:

To get my chaining all sleek looking, it wants to be in a single line, so what I need are operations that return the updated result. So `Array.push` is off the list for instance.

## Keyed object to array

Instead of:



## Reducing array to key lookup

Instead of:

```js
Object.keys(process.env).reduce((acc, curr) => {
  acc[curr] = JSON.stringify(process.env[curr]);
  return acc;
}, {})
```

Using a `Map` instead:

```js
Object.keys(process.env).reduce((acc, curr) =>
  acc.set(curr, JSON.stringify(process.env[curr])),
new Map())
```
