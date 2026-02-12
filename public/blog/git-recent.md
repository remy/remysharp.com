---
title: 'git recent: what branch did I work on?'
date: '2026-02-12'
tags:
  - code
---

# git recent: what branch did I work on?

Mega short blog post, mostly for me to remember, but also might be useful to you.

In a project I'll often work on and move around different branches throughout the day, and as the years wear on it's rather dulled my memory - that's to say, I quickly forget what branch I was working on!

<!-- more -->

## `git recent`

I created a `git` command line alias that helps my failing memory. What it does is list all the local branches, oldest to newest with the relative time and the name:

```
[alias]
  recent = !git for-each-ref --sort=committerdate --format='%(committerdate:relative) %(refname:short)' refs/heads/ | tail -10
```

It's a bit cumbersome with the `!git` part at the start, but it's because I want to limit it the most recent 10 results _and_ I want it with the newest at the bottom.

```
$ git recent
3 weeks ago fix/ai-gen-docs
2 weeks ago feat/not-available-not-404
2 weeks ago fix/bulk-download-timeout
8 days ago fix/real-null-in-bulk
8 days ago fix/real-404
2 days ago feat/bulk-schema
2 days ago fix/transcript-endpoint-potential-null
2 days ago fix/sanitise-sql-input
21 hours ago main
20 hours ago feat/api-analytics
```

Memory win for me. Neato.