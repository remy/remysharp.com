---
title: Safari show bug
date: '2008-09-03 09:33:01'
published: true
tags:
  - bug
  - code
  - safari
modified: '2014-09-03 16:15:12'
---
# Safari show bug

This is probably the first time I've come across a bug in Safari that's comparable in bizarreness to IE bugs.

The symptoms of this bug are that when you set the CSS <code>display</code> property to <code>block</code> from <code>none</code> the element *doesn't* appear.  In fact, it has a height of zero.


<!--more-->

The bug only happens in a specific markup situation, as such I've never seen it before now - but it's worth being aware of since debugging the issue would normally start in the JavaScript, when in fact it's Webkit that's the problem.

The bug occurs when your hidden content is an inline element, containing <code>&lt;br /&gt;</code> tags and proceeded by another inline element.  It's tricky to explain, but can be seen in the source code of the example below:

[View the demonstration of the bug](/demo/safari-hide-bug.html)

The fix, after a lot of debugging, turned out to be simply to follow the inline element with a block element.  Somehow the height in the first example is being set to zero allowing the inline <code>span</code> to sit above the element.  In the second example, the block element clears the newly displayed <code>span</code> and it appears correctly.

It's pretty convoluted, which is why it reminds me a of an IE bug!
