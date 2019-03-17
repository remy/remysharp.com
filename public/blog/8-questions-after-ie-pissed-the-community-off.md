---
title: 8 questions after IE pissed the community off
date: '2008-01-22 23:01:46'
published: true
tags:
  - ie8
  - microsoft
  - web
modified: '2014-09-03 16:15:12'
---
# 8 questions after IE pissed the community off

If you're a developer or read any development blogs, you'll have seen the plans for IE8 and backward compatibility. 

I'm not going to [cover](http://alistapart.com/articles/beyonddoctype) any of the [detail](http://adactio.com/journal/1402) as to [why](http://www.andybudd.com/archives/2008/01/has_internet_ex/) this [breaks our development process](http://adactio.com/journal/1402), but instead offer up some questions.  Only 8 for now :-)


<!--more-->

## Questions it raises for me

1. Bloatware: Will the install for IE become massive in a few years?
2. I thought I read that Microsoft want to start producing a new browser each year - does this mean in 5 years time, they'll still be supporting IE7 in this same way?  It's feasible giving the amount of time between IE6 and IE7.
3. IE6 and IE7 can run side by side, based on directions from the IEBlog.  In simpleton terms, the render engine is a DLL file - so will they just support browsers that you've upgraded from?
4. I should think not, but could Microsoft use it's clout to bring other browser to use the same locked in approach? <code>X-UA-Compatible: IE=8;**FF=3;OtherUA=4**</code>
5. Is it likely that the DOM engine will be built in to the CSS engine? We know the scripting engine is a separate file (if you run IE6 + 7 together).  It's highly unlikely that the next incarnation of CSS, HTML and JavaScript won't be released at the same time, by locking our browser to a specific version don't we lock out and progressive enhancement through setting versions on the script tag?  [John Resig explains](http://ejohn.org/blog/meta-madness/)  
6. Will the <code>DOCTYPE</code> affect iframes/frames on the page, or will can they run their own independent render engine?
7. What on earth is going to happen if we set the browser engine to IE9 and the user doesn't have that browser?  Does it drop down an entire version?  Does it default to <code>IE=EDGE</code>?
8. The <code>IE=EDGE</code> is "strongly discouraged" (http://alistapart.com/articles/beyonddoctype), isn't this discouraging upgrading web sites and taking advantage of the new features?

What are your questions?  Or do you have answers?!?!
