---
title: Where do those node warnings come from?
date: '2017-12-04 12:26:09'
modified: '2017-12-04 12:25:27'
tags:
  - code
published: true
---
# Where do those node warnings come from?

This is a micro post with a tip that I'll need to remember again in the months
to come. Node.js can emit warnings on the terminal saying that a rejected
promise wasn't caught, or calling an asynchronous function without callback is
deprecated.

But where exactly is the original call that causes that warning?

<!--more-->

![Node warnings](/images/node-warnings-before.png)

Passing the command line argument `--trace-warnings` gives me a full stacktrace
to the originating call that triggered the node warning:

![Node warnings after](/images/node-warnings-after.png)

Note that even though I'm using mocha (via
[npx](https://www.npmjs.com/package/npx)) the noe argument is still _correctly_
passed on to node to give me the stacktrace.

You can even go a little further an include a module like
[clarify](https://www.npmjs.com/package/clarify) to strip the node internals
from the stacktrace which makes it a little easier to read.
