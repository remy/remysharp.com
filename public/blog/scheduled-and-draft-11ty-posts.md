---
title: Scheduled and draft 11ty posts
date: 2019-06-26 15:05:36
tags:
- code
---

# Scheduled and draft 11ty posts

This post explains how you can add scheduled publishing to your 11ty blog (with a bonus for drafts).

Before I jump in though, 11ty is a surprisingly simple system for generating a static site from very little HTML, and drives content from markdown. Why is this good? Because it lets you, the author, move focus to writing and communicating.

Why is writing good? It's [good for you](https://ohhelloana.blog/blogging-and-me), it's a safe experimentation area and it's good to own your content rather than contributing to another [silo privately own company](https://veganstraightedge.com/articles/2016/05/12/dark-matter-and-the-indieweb) that could vanish any day.

So, you're going to blog. Now onwards to scheduled posts and drafts!

<!--more-->

## 11ty

The 11ty project offers a number of [starter projects](https://www.11ty.io/docs/starter/), of which [Andy Bell](https://andy-bell.design/)'s [Hylia](https://hylia.website/) is particularly nice - so I'll be using Hylia for my example changes.

## Filtered collections

11ty has a feature called collections. As you might imagine this are collections of content. For a the blog posts in Hylia, Andy's `.eleventy.js` config includes the following collection:

```js
config.addCollection('posts', collection => {
  return [...collection.getFilteredByGlob('./src/posts/*.md')]
    .reverse();
});
```

What the code is doing is creating a new array (using the spread operator `[...`) and filtering by source filename - in this case all the markdown files in `./src/posts`. The code is then reversing so that the newest is at the top (which I assume it's already in date order).

Our change is small:

1. Capture the date and time now.
2. Filter that new array for all posts whose date is _before_ the current date time.

Not much eh?

```js
const now = new Date();

const livePosts = p => p.date <= now;

config.addCollection('posts', collection => {
  return collection.getFilteredByGlob('./src/posts/*.md')
    .filter(livePosts).reverse();
});
```

I've also removed the spread operator because chaining on `.filter` is going to return a new array, which means that `.reverse()` won't [mutate](https://doesitmutate.xyz/reverse/) the original dataset.

If I wanted to add support for draft posts, this is a small change:

```js
const livePosts = p => p.date <= now && !p.data.draft;
```

Adding draft support is a useful bit of protection against accidentally publishing a scheduled, but unfinished post.

You could also go on to publish a list of your drafts by creating another collection with the same code, but inverted with `.filter(_ => !livePosts(_))`:

```
config.addCollection('drafts', collection => {
  return collection.getFilteredByGlob('./src/posts/*.md')
    .filter(_ => !livePosts(_)).reverse();
});
```

## The last mile

Since 11ty is a static site generator, you will need something to rebuild your blog automatically on a regular basis.

I've got my blog scheduled to rebuild every hour. It might be worth looking at what time works best for you (apparently my blog gets it's peak of traffic around 3pm UTC).

Find the frequency that works for you and schedule a rebuild which will pick up your scheduled posts.

Next we're effectively creating a [cronjob](https://duckduckgo.com/?q=what+is+a+cronjob) that will trigger a new build at a defined frequency. A few CI systems offer these natively, such as [Travis](https://docs.travis-ci.com/user/cron-jobs/) or [Circle CI](https://circleci.com/docs/2.0/configuration-reference/#schedule).

I'm using IFTTT to schedule a repeating job. Netlify hosts my blog and Netlify offers an [incoming webhook](https://www.netlify.com/docs/webhooks/#incoming-webhooks) to trigger new builds. If your platform has something similar then you're in good stead.

On IFTTT, [create a new applet](https://ifttt.com/create), select "Date & Time" as the `+this` and "Webhook" for `+that`. Give the webhook the URL to trigger you build - and you're set.

In fact, _this_ post was published through exactly the method described above.



*[CI]: Continuous integration
