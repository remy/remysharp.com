---
title: Automatic permalinks for blog posts
date: '2014-08-08 14:00:38'
published: true
tags:
  - code
  - javascript
modified: '2014-09-03 16:15:12'
---
# Automatic permalinks for blog posts

There's been so many times that I've wished I could quickly link to a specific
headline in an article, but there's no `id` attributes on the tag...so I can't.

But then there's nothing I can do to fix it, because it actually requires the
blog author to overhaul their site to add `id`s to all the heading tags which
may not be a quick job.

So, my dear blog author, here's my work around until you *do* serve `id`s in
your headings.

<!--more-->

## JavaScript to generated permalinks

We're going to add a single JavaScript file that will crawl through all our
heading elements, and convert the text of the heading into an `id`.

Then, if there's a hash fragment in the URL, the window will jump down to the
named element. Thus "faking" permalink support.

## The id

The `id` attribute is only applied if there's no `id` on the heading element
and is simply a regular expression that strips away anything that isn't an
alphanumeric and converts it to lowercase.

So a heading that reads: "What does a Pro account get you?" is converted to
`whatdoesaproaccountgetyou`. [Pretty simple](https://jsbin.com/help/pro#whatdoesaproaccountgetyou).

## Exposing the link

Inspired by Github's readme permalinks, when you hover near the left of the
title then you'll see a ¶ character that is clickable and gives the reader the
permalink.

This style is injected via the JavaScript, and it's quite possible you'll need
to tweak it a little to get it style correctly on your own site (but it's pretty
small).

## Usage

Simple. [Download the script](https://github.com/remy/permalink). Then just slap
the script in the footer of your site (or after all your heading tags) and it'll
upgrade your headings for your visitors:

    <script src="js/permalink.js"></script>

Now I can share headline specific links to *your* site whilst all you needed to
do was add one line. Thank you!
