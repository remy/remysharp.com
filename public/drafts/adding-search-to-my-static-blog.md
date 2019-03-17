---
title: Adding search to my static blog
date: '2015-06-03 17:56:13'
complete: false
inprogress: true
tags:
  - code
modified: '2015-06-18 11:15:54'
draft: true
---
# Adding search to my static blog

My blog is generated using Harp to entirely static .html files, so adding search, whilst being static wasn't immediately obvious to me.

The bottom line (if you want secure searching that other people can't mess with) is you need a proxy. That's straight forward though and I'll share the code with you in this post.

## The concepts

### Client side

The search is going to going to be entirely client side, so you're going to need to do some JavaScript wrangling, but it also means you have full control of the look and feel of your solution.

### Elasticseach

The search engine is elasticseach which means it'll handle search rankings for us and context (ie. the content around our matches).

### Heroku

In this version we'll host it on Heroku which will give us the benefit of SSL for free and an elasticseach search database that's likely to suit our needs (also for free). It's worth noting though, that by default Heroku will block the service if it's free for 4 out of 24 hours, so you might want to pay the $7 to make it run 24x7.

### Auto-indexing

Finally, the process running on Heroku is going to automatically spider your site to index new posts into elasticseach.

I'm going to explain some of this, but I'll also include a "one click button installer" so you don't have to understand how it works, and you can just get on with adding search.

