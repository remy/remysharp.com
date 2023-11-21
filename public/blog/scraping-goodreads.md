---
title: 'Scraping Goodreads'
date: '2023-11-21'
tags:
  - web
---

# Scraping Goodreads

I only use Goodreads because it's directly integrated into my Kindle ([which I love](https://remysharp.com/2018/05/18/my-extinguished-kindle)) so I can easily track when I start and finish a book.

However, Goodreads itself is terrible for data, either losing the data, corrupting it or just not having it.

So I've fixed that.

<!--more-->

## Scraping

Good old reliable web scraping. It worked 20 years ago and it still works today. In some cases I'm forced to use Puppeteer, but I try to avoid it if I can (to reduce the overhead) and in this case, it's not required.

I've written a dual platform script that will work either from the command line using Node, or it can be pasted directly into the browser's console. Both versions will spit out a full JSON object of the books I've read.

I strongly recommend running the script on a signed in page, and have a look at the [README for the project](https://github.com/remy/goodreads-scrape/) for prerequisites for the Node version.

This is the typedef of the `Goodreads` object (which the `parseBooks` returns an array of):

```js
/**
 * @typedef {Object} Goodreads
 * @property {string} title
 * @property {string} seriesEntry
 * @property {string|null} [seriesNumber]
 * @property {string|null} [series]
 * @property {string} author
 * @property {number} pages
 * @property {number|null} rating 1-5
 * @property {string[]} read timestamp of times the book was finished, or if missing "?"
 * @property {string[]} start timestamp of times the book was started, or if missing "?"
 * @property {string} published year the book was published
 * @property {string} goodreads
 * @property {number} goodreads_id
 * @property {string} cover url to cover scaled to 315px wide
 * @property {string|null} [review]
 * @property {boolean} spoiler whether the review contains spoilers
 * @property {string} slug the slugified title
 */
```

There's a few things to note that might not be immediately obvious about the data:

1. The `seriesNumber` is the number of the book in the series, e.g. `1` for the first book in the series. If the book is not part of a series, this is `null`, and `series` is an empty string. In addition, if the book is not part of a series, the `title` and `seriesEntry` are the same.
2. The `start` and `read` (the date the book was completed) are arrays. This allows for repeat readings. If there's no date, then the value is a `?` string.

You can look and poke around my [own book reviews on jqTerm](https://jqterm.com/d01be74a1faab95070836d8c306f0927?query=map%28.title%29).

## Download

The script is available on **[github to download](https://github.com/remy/goodreads-scrape)**. Feel free to use, adjust and fit to your own needs.

## Some code notes

I don't really know why I decided to make it work both in the browser _and_ in Node - probably for the simplicity of use and experimentation.

To pull this off, I created a simplistic implementation of [Cheerio](https://www.npmjs.com/package/cheerio) (which is used in the node version) to support the `map`, `find`, `text`, and a few other methods.

What was fun to find out was that Goodreads is using (I think) [Prototype](http://prototypejs.org/) and the `Array.map` method (and probably others) had been overwritten. So I had to create a hidden iframe to reclaim original `Array.map` method.

Speaking of `map` - since Cheerio implements jQuery syntax, it also implements the (slightly) backward map argument signature of `(index, value)` (instead of `(value, index)`). So I had to port that over too (:shivers:).

There was also some fun finding out that Firefox and Chrome implement _slightly_ different `Date` parsers (I'd assume because that particular API is so old there's legacy bits of cruft laying around).

Specifically Chrome can parse `new Date('18 Nov, 2023, Z')` but Firefox can't. And Firefox can parse `new Date('18 Nov, 2023, +0')` but Chrome can't. So if you [look at the code](https://github.com/remy/goodreads-scrape/blob/4e5f0ba1bd41a7a58ddc3bf7c927eabc89a7f1f1/goodreads-scrape.js#L125-L130), you'll see I try both!
