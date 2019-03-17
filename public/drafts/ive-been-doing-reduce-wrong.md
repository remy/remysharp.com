---
title: I've been doing reduce wrong!
date: '2018-04-06 10:39:59'
modified: '2018-08-24 08:08:10'
complete: false
inprogress: true
tags:
  - code
---
# Increasing reduce with spread

There's something I find particularly pleasing about chaining my code. I enjoyed it when I wrote a lot of jQuery, and even prior to jQuery, I remember feeling like it was a code super power that I could chain function calls together in JavaScript.

It stands to reason that with arrow functions and a handful of array methods, my inner chaining unicorn is free to run wild. Except, in my case, when I use `Array.reduce` I typically drop into a multi-line function, ugh!

<!--more-->

## Prior art

I've found that I have a lot of this type of `reduce` in my code:

```js
return input.reduce((acc, curr) => {
  acc[curr] = altSource[curr];
  return acc;
}, {});
```

And this:

```js
return input.reduce((acc, curr) => {
  acc.push(curr);
  return acc;
}, []);
```

Or this, as a poor way to dedupe:

```js
return input.reduce((acc, curr) => {
  if (!acc.includes(curr)) {
    acc.push(curr);
  }

  return acc;
}, []);
```

_Note that these variables are simplified - but it is the same two lines over and over._



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

---

Instead of:

```js
const props = Object.getOwnPropertyNames(this).reduce((acc, curr) => {
  if (!curr.startsWith('_')) {
    acc[curr] = this[curr];
  }
  return acc;
}, {});
```

Should be:

```js
const props = Object.getOwnPropertyNames(this)
  .filter(k => !k.startsWith('_'))
  .reduce((acc, curr) => ({ ...acc, [curr]: this[curr] }), {});
```

---

But sometimes being verbose is okay.

For instance, this:

```js
const config = {
  "snippets.javascript": {
    "cl": "console.log($0);",
    "fn": "() => { $0 }"
  },
  "snippets.css": {},
  "snippets.html": {}
};

const res = Object.keys(res).reduce((acc, curr) => {
  const [store, key] = curr.split('.');

  if (!acc[store]) acc[store] = {};
  acc[store][key] = config[curr];
  return acc;
}, {});
```

Makes the following object:

```json
{
  "snippets": {
    "javascript": {
      "cl": "console.log($0);",
      "fn": "() => { $0 }"
    },
    "css": {},
    "html": {}
  }
}
```

_Could be_ rewritten as:

```js
const res = Object.keys(config)
  .map(k => [ ...k.split('.'), k ])
  .reduce((acc, [store, key, target]) => (
    { ...acc, [store]: { ...(acc[store] || {}), [key]: config[target] } }
  ), {});
```

Which is pretty much illegible.
