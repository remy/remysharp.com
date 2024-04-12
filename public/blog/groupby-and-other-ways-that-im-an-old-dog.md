---
title: "groupBy and other ways that I'm an old dog"
date: '2024-04-12'
tags:
  - code
---

# groupBy and other ways that I'm an old dog

More of a [TIL](/til) but my blog is rather bare lately, so this will do.

I was browsing the excellent MDN to check something and came across both `Map.groupBy` and `Object.groupBy`. A handy static method for keying an array by some property (I'll show working example in a moment).

Pretty useful, but I quickly realised that I'm very much stuck in the camp of the old dog not quite learning the new tricks.

<!--more-->

## groupBy

Before I chastise myself, here's an example.

I've got an array of pets and their names, but I want to break it up into dogs, cats and others (because I treat a tortoise and a hamster equally interesting…).

My data:

```json
[
  { name: "Coco", type: "dog", age: "9m" },
  { name: "Taco", type: "cat", age: "1y8m" },
  { name: "Kipo", type: "cat", age: "2y8m" },
  { name: "Disco", type: "cat", age: "2y8m" },
  { name: "Mrs Garry Crackers", type: "hamster", age: "unknown" },
  { name: "Sir Biscuit", type: "hamster", age: "unknown" },
  { name: "Delilah", type: "tortoise", age: "mega unknown" }
]
```

Ordinarily, I would use a `Array.reduce` map and hope that muscle memory serves me well on whether the accumulator is the first or second argument.

This is how it's achieved using `Object.groupBy`:

```js
const groupedPets = Object.groupBy(pets, ({ type }) => {
  if (type === 'dog' || type === 'cat') return type;
  return 'other'
});

// Object { dog: (1) […], cat: (3) […], other: (3) […] }
```

Quite a bit simpler. If I needed to key by a non-string property, then the `Map.groupBy` is the way. i.e. if I wanted to look up using `{ type: "dog" }` from the result.

## Support and moving to new stuff

In this particular case, the [support is pretty good](https://caniuse.com/?search=groupby) - partly due to browsers auto-updating and that this seemed to land at the same time in Firefox and Chrome (because, yes, there's only two rendering engines…).

Equally, this is one of those methods that is a prime candidate for a [polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy#see_also) (I like to think that writing polyfills is great practise for coding as the obvious answer isn't always the most complete).

Of course, if you were using lodash then you possibly always used this in your toolkit.

I've noticed for myself though, that I'm still stuck very much in coding like it's 2020 (perhaps without the lockdowns and scary pandemic). Just this week I realised I never write `const fs = require('node:fs')`. Equally I've _never_ used `yield` or a generator function in the wild.

Am I long in the tooth? Probably… Should I care? I think so…whilst at the same time: not really (there's something deeper here, so I'll try to stay on topic).

Back in the early 2000s, I would use the browser developer tools (Firebug at the time and the Venkman debugger) and I would poke the DOM and objects and cruise through their properties looking for things I didn't recognise and see if I could find out more.

I don't really have a process like that these days, mostly I think because my code is sitting on top of code that belongs to Facebook/React, so even peeking under the hood is kind of pointless because it'll completely change quickly enough.

Perhaps there's a useful summary of updates landing browsers that exists (I'm 99% sure there is) - feel free to enlighten me (comments, DMs, email - what have you).

I should really keep up, even if I'm behind by 12 months - I'm too far away from retirement!
