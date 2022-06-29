---
title: 'Why did Safari go batman?'
date: '2022-06-29'
tags:
  - web
---

# Why did Safari go "na, na, na…n"?

This week I released the first round of tickets for [ffconf 2022](https://2022.ffconf.org) an in a last minute change (literally 20 minutes before the tickets went live), I decided to add a live countdown which would switch out and _then_ show the "Buy Now" button at 10am.

Except, of course, Safari didn't work.

<!--more-->

But feel free to skip all this to the [TLDR](#tldr)!

## I maintain JavaScript date API is terrible!

This kind of problem isn't entirely Safari's fault (though I'm no fan), but it's because the `Date` object, specifically parsing strings, is terrible and inconsistent and it's been terrible from the outset (or certainly in my opinion!).

In particularly though, is when you want to set a date from a string. The documentation you'll find around the web says to avoid `Date.parse` but going through `new Date("…")` doesn't come with the same warning - though it has the same pitfalls.

For instance, can you spot which of these values result in `null`?

```js
new Date("Sept 13 2022 9:00");
new Date("Sept 13, 2022 9:00");
new Date("Sept 13, 2022 9:00am");
new Date("Sept 13 22 9:00");
new Date("Sept 13 '22 9:00");
new Date("13 09 22 9:00");
new Date("12 09 22 9:00");
```

It's probably not obvious - plus, if you're American you'll read those last dates differently to a European (whom I'll go ahead and say "are reading it right"!).

## Use one date string, and only one

Being a developer, I tend to represent my dates as `2022-06-29`. JavaScript can handle that.

So I set the tickets to go live with:

```js
new Date('2022-06-27 10:00:00')
```

This worked in my browser of choice (Firefox) and I gave it a test on mobile (Brave) which given the simplicity (oh…such a fool) and Brave using the Chromium browser engine, I figured it was safe (aka: foreshadowing).

I immediately spotted the first bug - timezones! Those people not in the UK, say perhaps, Germany, were already past 10am, so it would display the button.

A quick change, test and release later:

```js
new Date('2022-06-27 10:00:00+0100')
```

Now it parses as (effectively) "10am at BST". And yes, if you're reading this spotting the problems, it's easy in retrospect!

First things first: the string format is … a fluke. It's readable, but not a standard that JavaScript ideally wants.

The other issue is dates really just want to be in UTC - I'll return to this.

My date constructor above, in Safari failed with:

```js
new Date('2022-06-27 10:00:00+0100') === null
```

This is because that space, between the date and time, is invalid. It's missing a `T`. The world of difference.

```js
new Date('2022-06-27T10:00:00+0100') !== null
```

**So the take away, if anything, is that the date format must follow the [ISO 8601 extended format](https://tc39.es/ecma262/#sec-date-time-string-format) - importantly, that `T` needs to be in between.** {id="tldr"}

## Using UTC over timezone adjust

The `+0100` always felt brittle to me, but the closest to "right way" is to use UTC dates across the board (since the time is location dependent).

This is solved by adding a simple `Z` at the end of the string (and not with the `+nnnn` at the end).

It's worth noting that extracting the date data will then localise itself, i.e. the following call gives a value of `10` when run in the UK during British Summer Time:

```js
new Date('2022-06-27T09:00:00Z').getHours() // 10
```

More importantly, I can use this feature for date comparison. So my countdown code would look like this:

```js
const target = Date.parse("2022-06-27T09:00:00Z");
function update() {
  const now = Date.now();

  if (now > target) {
    showBuyButton();
  } else {
    displayRemainingTime(target - now);
    requestAnimationFrame(update);
  }
}
update();
```

Regardless which country this page is loaded in, UK included, it will run a countdown to the _right_ time - oh, and it'll work in Safari!
