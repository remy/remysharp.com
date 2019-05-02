---
title: Search & dynamic shortcut links for a static site
date: 2019-05-02
tags:
  - code
---

# Search & dynamic shortcut links for a static site

In porting my blog from Heroku to Netlify there were a few dynamic aspects that I had to reconsider in moving to a fully static hosting platform.

Two features, which in my case, are closely connected, were search and dynamic shortcut links. These shortcut links meant that I could visit remysharp.com/twitter and it would redirect to the latest post where the slug contains "twitter".

<!--more-->

---

It's possible you can guess how most of this works, so you [might want to skip](#squashing-text) to how I'm reducing the search content and then how I'm prioritising results. After this section, I'll explain how shortcut links work.

---

## How it used to work

Previously my blog was hosted on Heroku. The content (blog posts, pages, etc) were fully static. However, the server had a dynamic aspect to it which meant that I could execute some logic on the server side.

```js
/* match slug partial and redirect to post */
route.get('/:slug', (req, res, next) => {
  // if our slug matches *anywhere* in the slug of a post
  // find will return the *first* match, which is the
  // latest post. If there's no match, then do a normal
  // request (which might lead to a 404)
  var slug = slugs.find(
    slug => slug.includes(req.params.slug)
  );

  if (slug) {
    // blogs is a global object with all the post data
    var url = fullUrlForPost(blogs[slug]);
    return redirect(res, url);
  }

  next();
});
```

The above code is simplified from my original [server.js](https://github.com/remy/remysharp.com/blob/73fb7c59f1f749a9e6af2786d544ff1ff2e2f1a7/server.js#L287)

The [search on the server side](https://github.com/remy/remysharp.com/blob/73fb7c59f1f749a9e6af2786d544ff1ff2e2f1a7/server.js#L99) used elastic search (from a free [Bonsai](https://bonsai.io) add-on via Heroku). In fact, upon releasing a new blog post would also require updating the elastic search index (which was part of my workflow, but another step in the chain).

So if I'm moving to an entirely static solution, how do I solve these two features that I wanted to keep?

## Solving search first

The refactor of my blog is heavily inspired by way [11ty](https://11ty.io) works (it didn't use it directly because of rods I had made for my own back using Pug and Harp previous - but it's fine). As such, I came across [Phil Hawksworth's post about client side search](https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/) and took inspiration from his code whilst making my own improvements.

One important side note (as Phil points out in his post): the form for search should be backed with Google or DuckDuckGo (or other).

I'm currently pointing to `https://www.google.co.uk/search` with a hidden field of `q=site:https://remysharp.com` and the actual search field is named `q`, and Google will join the queries together. Sadly, at time of writing, DuckDuckGo doesn't join the search fields (so it redirects to searching _all_ of remysharp.com).

### The parts to search

Following in Phil's steps, I need three parts:

1. The HTML that renders my search form
2. A JSON blob of searchable content from my blog posts
3. JavaScript that will do client side search (or more specifically: filtering)

### HTML

My HTML looks like this - I don't think it warrants explaining except the `script` tag at the end:

```html
<form id="search" action="https://www.google.co.uk/search">
  <label>Search for:
    <input id="for" autofocus="autofocus" name="q" placeholder="fragment of post..." type="text"/>
    <input type="hidden" name="q" id="q" value="site:https://remysharp.com"/>
  </label>
</form>

<ul id="search-results">
<!-- placeholder for results -->
</ul>

<script id="result-template" type="template">
  <li>
   <a href="{{url}}">{{title}}</a>
  </li>
</script>
```

I'm using a `script` tag with an _invliad_ `type` attribute. This means it's ignored by the browser as I intend to use this in my JavaScript.

### Search data / JSON

In my particular case I'm using [Pug](https://pugjs.org), but the aim is the same: generate a static file that contains a (possibly large) JSON dump of my posts:

```pug
---
layout: false
permalink: /js/search-data.js
---
- var format = ({ url, output, data }) => ({
-   url, title: data.title, text: squash(_.output)
- });
- var data = JSON.stringify(collections.blog.map(format));

| var searchData = !{ data };
```

The result is a file in `/js/search-data.js` containing:

```js
var searchData = [{"url":"/2019/04/24/all-your-envs-in-a-row","text":"all your envs row ve used zeit s now platform ll know get environment values readable by code have jump few hoops there are solutions place can put m able keep where d expect them caveats this technique works most common cases ll proba…" /* snipped */ }]
```

Remember this isn't 11ty - even though there's a `collections` object. What's important to know is that `collections.blog` is an array of blog posts I've written with the front matter data in `.data` and the `output`, in my case, is the rendered post (rather than the source, which I'll explain in a moment).

The plan is to load this in with the client side JavaScript and use the data to provide search results.

### Squashing text

The `squash` function, importantly, is what strips out redundant characters and "low quality" text (words like 'and', 'or', etc). This is closely based on Phil's work.

```js
module.exports = function squash(text = '') {
  // ensure the text is
  const content = text.toLowerCase();

  // remove all html elements and new lines
  // this also ensures code blocks are removed
  // from the search results - and they make up
  // a large part of my posts
  const re = /(&lt;.*?&gt;)/gi;
  const plain = unescape(
    content
      .replace(re, '') // strip escaped code and the contents
      .replace(/<code.*<\/code>/gms, '') // strip entire code blocks
      .replace(/<\/?[^>]+(>|$)/g, '') // remove tags from around text
  );

  // remove duplicated words and duplicated spaces
  // new Set ensures unique elements in the collection,
  // then the `...` spread operator converts the set
  // to an array so it can be joined back up.
  const string = [...new Set(plain.split(/\s+/))].join(' ');

  // remove short and less meaningful words
  let result = string.replace(
    /\b(the|a|an|and|am|you|I|to|if|of|off|me|this|that|with|have|from|like|when|just|your|some|also|know|there|because|actually|recently|something)\b/gi,
    ''
  )
  .replace(/[^\w\s]/gm, ' ') // fail safe: remove non-chars & non-white space
  .replace(/\b\w{1,2}\b/gm, '') // remove any "words" of 1 or 2 characters
  .replace(/\s{2,}/gm, ' ') // compress whitespace to a single space

  // trim for good measure!
  return result.trim();
};
```

My code above has some duplication inside of it (in the regular expressions), but it does a good job of leaving most of what's important.

---

**Performance tip:** if you generate your own search data file, take a bit of time to find low value words that you use a lot and remove them from the results. Do not just copy my example above as it's just a sample of [what I remove](https://github.com/remy/remysharp.com/blob/master/lib/squash.js).

I've [written a jq query](https://jqterm.com/8050a199a4f696ec61f2018c924f3961?query=map%28.text%20%7C%20split%28%22%20%22%29%29%20%7C%20flatten%20%23%20convert%20into%20an%20array%20of%20words%0A%7C%20map%28select%28length%20%3C%204%29%29%20%23%20pick%20only%20words%20of%20a%20specific%20length%0A%7C%20reduce%20.%5B%5D%20as%20%24item%20%28%7B%7D%3B%20.%5B%24item%5D%20%2B%3D%201%29%20%23%20count%20unique%20words%0A%7C%20to_entries%20%7C%20map%28select%28.value%20%3E%202%29%29%20%23%20pick%20results%20with%20more%20than%202%20duplicates%0A%7C%20sort_by%28.value%29%20%7C%20reverse%20%7C%20from_entries) that you can use to get a good idea of word frequency. Swap out my example source JSON with your own and tweak the numbers (in the word length) to get a sense of which words you can remove. Using this method allowed me to reduce my data file by 70KB.

---

### Searching and prioritising results

First of all, the generated `search-data.js` is included in my HTML search page. In my case, for (at time of writing) 485 blog posts, that means 580KB of JavaScript (219KB compressed to my visitor).

As the visitor searches, my code checks their query against the following criteria and gives them "hit points":

- URL - 100 hit points per match
- Title - 100 hit points per match
- Body text - 1 point for words less than 5 chars, otherwise hit points = word length

Finally, if there's *any* hit, the recency of the post adds points. 100 points divided by the number of years old the post is (where posts this year are "1 year"). I took some time tweaking this algorithm and this is what worked well for me.

Hidden in comments on my own search results page are comments with the hit count "weight" (which I exposed during testing) which gives you an idea how it works:

![](/images/search-hit-points.png)

The hit points determine the order of the results. Rather than dumping a lot of JavaScript into this post, you can [view my search JavaScript here](https://github.com/remy/remysharp.com/blob/master/public/js/search.js) - specifically the `find` function is where all the hit point calc happens.

Once the candidates are collected, the results are interpolated into the template (the script tag with the `type="template"` from earlier). Again, this lives in my search JavaScript and of course you can/should use your own version of templating.

---

So that's search.

Dynamic shortcut links extend on the search data, and I rather like it.

## Dynamic shortcut links

Given that I host my blog with Netlify, I'm able to define my own custom redirects. If you navigate to a URL that doesn't exist, you'll hit [my custom 404 page](https://remysharp.com/404).

This is the source to my 404 page:

```pug
script.
  const data = !{ JSON.stringify(collections.blog.map(_ => ({ slug: _.slug, url: _.url }))) }
  const pathname = window.location.pathname.split('/').pop().toLowerCase();
  const match = data.find(_ => _.slug.includes(pathname));
  if (match) window.location = match.url;

h1 Redirecting...

script.
  if (!match) document.getElementsByTagName('h1')[0].innerText = 'Four oh four...'

// rest of my "normal" 404 page here
```

What does this do? When the page loads, JavaScript immediately kicks in and checks if the URL (pathname only) is a partial match _any_ of the slugs for my blog posts. Remember that `.find` for JavaScript arrays returns the first result (and my `collections.blog` is ordered by most recent first).

If there's a match, JavaScript immediately redirect - and since JavaScript is blocking it prevents the rest of the 404 page from appearing (which shows a list of my most recent posts).

If there's no match, the `h1` heading is changed to my 'Four oh four…' title (yes, a poor joke!). If you inspect the source to [the 404 page](https://remysharp.com/404) you'll see it's crammed full of JSON. It clocks in at 13KB with all that JSON, which isn't terrible, and comparable to any image on my blog.

The Netlify redirect I use is also relatively straight forward (and probably recommended):

```text
/* /404.html 404
```

So that's it. You can now jump to the latest post on failing by typing ["remysharp.com" "slash" "fail"](https://remysharp.com/fail) into the browser URL and it'll redirect to the correct post.

All static, with help from Netlify's amazing redirect feature.
