---
title: In the middle with <center>
date: '2014-08-15 14:38:14'
published: true
tags:
  - code
  - html
  - html5
  - troll
modified: '2014-09-03 16:15:12'
---
# In the middle with <center>

I posted a [tweet](https://twitter.com/rem/status/499629513983406080) recently that confused some people. They might have thought I was trolling or being sarcastic!

> The `<center>` tag is awesome. Why have I been avoiding it all these years?

Seriously. It is. But I feel like I may have to defend my opinion on this one!

<!--more-->

## It's *easier*

I want to centre some text. My brain has a fork in it's process:

1. I use `<center>`
2. I don't use `<center>` and choose from an array of CSS based options

Let's entertain option 2 for a moment. Here's my code:

    <p>The witch had a cat and a very tall hat,</p>
    <p>And long ginger hair which she wore in a plait.</p>
    <p>By: Julia Donaldson and Axel Sheffler</p>

I want the author credit to be centre aligned. This is the cost with option 2:

1. Add a class to the last `p` tag
2. *Think* of an appropriate name, perhaps "credit"
3. Create a new style sheet file
4. Add the `link` tag to the `head` of my document
5. Remember to add `rel="stylesheet"` or it won't work
6. Add 3 lines of CSS

As such:

    .credit {
      text-align: center;
    }

Not much work.

Now compared to using the `center` tag:

1. Add `center` tag around content
2. No, there is no step two. Got you there for a second, right?

## But...but...semantics!

Okay. Semantics. Let's keep the deeper conversation aside for a minute, but what I've seen argued is: the `center` element doesn't have any semantic value.

So instead you might use a `span` or a `div` instead (and yes, sure, if you were just centring a paragraph, you'd use a `p` and CSS as above).

But now you're using an element without any semantic meaning, and then adding CSS (and probably classes) to centre align.

Instead, why not, use `center`, which has "no semantic meaning" and benefit from the default browser styling that you get for free. Just like you do for different heading levels. Or for `sup` or `small`?

## Yeah, but it's deprecated!

Actually, according to the W3C validator, the element is *obsolete* - which sounds a little harsher.

But then, so what? The beauty of HTML is that it works, as busted as you can make it, browsers will make it work.

Old pages written with `font` tags and `big` still work, and there's a [well defined spec](http://www.w3.org/TR/CSS2/sample.html) for browser vendors that support HTML4 as to how HTML4 elements should be styled. HTML4 moved to recommendation in 1999, and HTML5 has still not reached recommendation phase (at time of writing it's Candidate Recommendation as of 31 July 2014).

My point being: browsers will support the HTML4 elements for a long...long time. I'd be prepared to bet that HTML4, and `center` styling will be supported beyond the lifetime of this blog (and any other of my sites).

So it's deprecated. But it works. And that's basically the web summed up: **but it works.**

## More center?

Yep, I've convinced myself, I'll be using `center` just a little more often (than previously not at all). Maybe you'll reconsider pulling it back in to your toolbox!
