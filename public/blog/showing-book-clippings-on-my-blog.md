---
title: Showing book clippings on my blog
date: 2025-05-01
tags:
  - code
---

# Showing book clippings on my blog

After [jailbreaking my Kindle](https://kindlemodding.org/mesquito/) and seeing how simple it was and how all existing functionality was retained, I spotted that there was a `My Clippings.txt` file on the Kindle when mounted (I'm sure it's always there, I just hadn't mounted before).

This prompted me to get all my clippings (or as I think of them _highlights_) onto my blog since I already have all [my books](/books).

<!-- more -->

## What failed

Although the `My Clippings.txt` file was over 450Kb of content, it took me a long while to realise it contained _everything_ that I highlighted, including when I was adjusting the selection on the Kindle.

What this means is that I have these _individual_ clippings:

```
- Added on Saturday, 19 May 2018 23:13:50
in sleep, had stopped dead and started again after
==========
- Added on Saturday, 19 May 2018 23:14:15
in sleep, had stopped dead and started again after a blank
==========
- Added on Sunday, 20 May 2018 15:47:35
You believe
==========
- Added on Sunday, 20 May 2018 15:47:39
You believe that reality is something objective, external,
existing in its own right.
==========
- Added on Sunday, 20 May 2018 15:48:17
You believe that reality is something objective, external,
existing in its own right. You also believe that the nature
of reality is self-evident. When you delude yourself into
thinking that you see something, you assume that everyone
else sees the same thing as you.
```

You can see it's captured every single interaction attempt at highlighting. Suddenly I can see how I managed nearly half a meg of clippings.

The clipping file does have additional metadata, including the book title, author and location - but given the content is (probably mostly) junk, I decided I had to get the clips from elsewhere.

## Getting data from Goodreads and Amazon

The Goodreads API is notoriously rubbish. Their RSS feed of books you've read (i.e. books _I've_ read) can sometimes, often, omit data that I know Goodreads has. So I wasn't looking forward to trying to use their site for the clippings.

Although I tried and failed to sniff the traffic from my Kindle when I rate a book or sync (I had hoped to capture a message to Amazon or Goodreads and intercept it), I realised I don't actually know where the "I'm reading this now" and the syncing actually goes.

It's possible it goes directly to Goodreads (I thought Amazon bought them). It's possible it goes to Amazon and then _across_ to Goodreads (though, I somehow doubt that).

Either way, long story short, I found that there's an easily scrapable (not sure that's a word) web page on Amazon: https://read.amazon.com/notebook

It does also look like any changes on Goodreads (like when you make your highlights public) are pushed to this Amazon page.

So let's scrape the crap out of that page to get our data out.

## Scraping clippings

The page `https://read.amazon.com/notebook?asin=${id}` contains HTML fragments that holds all the book data and highlights (and notes you made on your Kindle's janky keyboard).

So we'll scan the DOM for all the `asin` ids and loop through each one, extracting all the content:

```js
async function parseFromPage() {
  // via https://read.amazon.com/notebook
  const ids = $$('#kp-notebook-library > div').map((_) => _.id);
  const res = [];
  const options = {
    credentials: 'include',
    mode: 'cors',
  };

  for (let id of ids) {
    // get the plain text from each fetch
    const t = await fetch(
      `https://read.amazon.com/notebook?asin=${id}&contentLimitState=&`,
      options,
    ).then((_) => _.text());

    // then parse it with the extractKindleHighlights
    res.push(extractKindleHighlights(t));
  }
  return res;
}
```

Now we need to parse it. You could go down the regexp path, but since we're still in the browser, we can take advantage of the DOM for navigating and iterating.

We already have the response as text, so the process is to `createDocumentFragment()` and insert the text as HTML into the fragment (though actually I'll put a single DOM element in the root of the fragment, then append to this):

```js
const frag = document.createDocumentFragment();
const root = document.createElement('div');
root.innerHTML = html;
frag.appendChild(root);
```

Using a fragment keeps it out of the main document DOM (in case it causes it go awry) but still affords us some `querySelector` goodness.

```js
function extractKindleHighlights(html) {
  const result = {
    author: null,
    title: null,
    highlights: [],
  };

  const frag = document.createDocumentFragment();
  const root = document.createElement('div');
  root.innerHTML = html;
  frag.appendChild(root);

  result.title = root.querySelector('h3').textContent.trim();
  result.author = root.querySelector('h3').nextElementSibling.textContent;

  const highlightElements = Array.from(
    root.querySelectorAll('#kp-notebook-annotations > .a-row.a-spacing-base')
  );

  for (const highlightElement of highlightElements) {
    const el = highlightElement.firstChild;
    const page = el
      .querySelector('.kp-notebook-metadata')
      .textContent.split(':')
      .pop()
      .trim();
    const text = el.querySelector('.kp-notebook-highlight').textContent.trim();

    const note = el
      .querySelector('.kp-notebook-note span:last-child')
      .textContent.trim();

    result.highlights.push({
      text,
      note: note || null,
      page: parseInt(page.replace(/,/g, ''), 10),
    });
  }

  return result;
}
```

Now the final format is more like structure JSON (I do some extra work to match up the book title to my existing reviews in markdown):

```json
{
  "author": "George Orwell and Thomas Pynchon",
  "title": "Nineteen Eighty-Four (Penguin Modern Classics)",
  "highlights": [
    {
      "text": "The solid, contourless body, like a block of granite, and the rasping red skin, bore the same relation to the body of a girl as the rose-hip to the rose. Why should the fruit be held inferior to the flower?",
      "note": null,
      "page": 219
    },
    {
      "text": "You believe that reality is something objective, external, existing in its own right. You also believe that the nature of reality is self-evident. When you delude yourself into thinking that you see something, you assume that everyone else sees the same thing as you.",
      "note": null,
      "page": 249
    }
  ]
}
```

So now I have my clippings on [my books like 1984](/books/2018/1984).

---

The one (rather important) bit that I've not quite worked out, is how to fully automate this. I suspect I'll need something either like a headless browser to do the work, or something with my Amazon credentials which isn't ideal.

What _would_ be perfect, is it I could find a way to capture the clippings directly from the Kindle, especially since it's jailbroken now - though I suspect this is an extremely tricky problem to crack.