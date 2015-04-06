# Moment is quickly becoming my new jQuery!

What exactly does that mean? Well, working with the DOM pre-jQuery was a total nightmare of hoop jumping and remembering strange, backward, twisty-hand ways of moving and manipulating the DOM. Back in 2006, you drop in jQuery, and boom, you're done. But, over the years, I could see my jQuery code was getting lazy (and overly heavy handed).

Working with [dates is a nightmare](https://www.youtube.com/watch?v=-5wpm-gesOY). The library [moment.js](http://momentjs.com) beautifully and simply removes *quite a bit* of the pain.

<!--more-->

In JavaScript, the `Date` object was originally a straight port from the Java ([ref](https://twitter.com/rem/status/585074626868445184)), which means getting into a nice format like `2015-09-13` is quite a bit of fudderling. Moment takes the pain away.

Then it also gives us comparisons, formatting options, parsing, loads and loads of awesome stuff. Which explains why it's part of my default stack and appears in all my projects.

Nearly all my handlebar projects have this partial included for instance:

```js
hbs.registerHelper('moment', function (date, format) {
  return moment(date).format(format);
});
```

Except here's the rub, as with my jQuery code, I've gotten a little too generous with moment, and now I'm seeing one of our production projects with the CPU running at 100+% (how?!) most of the time, and dipping inside (via `node --prof`), I can see most of the time is spent in moment (doing regexp, parsing, formatting and so on).

There's a bunch of optimisations I can, and *am* doing, but here's an example I wanted to share.

## Refactoring out the laziness

I have a handlebar helper that will try to match the day of two arguments, typically these arguments are timestamps, but it can also be the word "today".

Here's the original source:

```js
// healthy doses of line breaks for legibility in this blog post
hbs.registerHelper('matchDate', function (date, match, opts) {
  var matchDate = moment(
    match === 'today' ?
    moment().add(config.offset, 'hour') :
    match
  );

  if (moment(date).format('YYYY-MM-DD') ==
    moment(matchDate).format('YYYY-MM-DD')) {

    return opts.fn(this);

  }
});

/* usage:
{{#matchDate @root.showtime date}}class="highlight"{{/matchDate}}
*/
```

Reasonably cruft free, and pretty quick to write. But wait a second...looking at the code carefully, I can *now* see that in the best case, there's *three* calls to moment. Worst case: there's four!

Moment is great, but it's too easy (for me) to get lazy. I've re-factored the code, and now it looks like this:

```js
hbs.registerHelper('matchDate', function (date, match, opts) {
  var matchDate;
  if (match === 'today') {
    matchDate = moment().add(config.offset, 'hour');
  } else {
    matchDate = moment(match);
  }

  // using 'day' on isSame will check if it's the same "day"
  if (matchDate.isSame(date, 'day')) {
    return opts.fn(this);
  }
});
```

Now just *one* call to moment (regardless of the path). There's probably an additional constructor call to moment (in the `isSame` parser), but it's still a lot better. The wider impact was this function (and many others like it) were being called hundreds of times on our main pages, which meant hundreds multiplied upwards many times, and quickly I understand the CPU hog.

## TL;DR: know your APIs

This laziness was partly due to being really familiar with the low hanging functions, like `format`, instead of knowing the API really well and understanding all the ways I could have used the library.

// filed under "duh"
