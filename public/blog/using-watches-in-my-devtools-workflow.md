---
title: Using watches in my devtools workflow
date: '2013-11-27 10:00:23'
published: true
tags:
  - code
  - devtools
  - workflow
modified: '2014-09-03 16:15:12'
---
# Using watches in my devtools workflow

I've recently found that I'm able to optimise [my workflow](/2013/07/18/my-workflow-v3-full-coding-stack/) inside of devtools
using "Watch Expressions" which I've found (for me) is often left untouched.

<!--more-->

## Using watches

The video below works through the real example where I'm using watches to get
visual feedback whilst developing.

<iframe width="1280" height="720" src="//www.youtube.com/embed/_gL4FCchTEI?hd=1" frameborder="0" allowfullscreen></iframe>

## The console up/enter workflow

Typically if I had a bug, I would use the console to re-run my code and check
the result until it worked. Since I'm already editing functional code that's
being live-updated inside V8 it means my workflow is already pretty slick.

<img src="/images/watch.gif" style="border:1px solid #999; float:right;margin-left: 5px; margin-bottom: 5px; width: 40%;">But this cursor up, enter workflow can be improved. The code that I'm running in the console can actually be moved to the watch expressions panel.

## Changing my workflow

With my expression in the watch expressions panel, and whilst I'm still in a *paused state* of execution in the code, I can go ahead and edit the code directly inside devtools, and each time I hit save on the file, V8 will reload the function in memory, and my watch updates, which gives me a real-time preview of the result. And that's it. Very neat.
