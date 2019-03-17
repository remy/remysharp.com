---
title: The Hack Stops Here
date: '2007-10-12 13:19:09'
published: true
tags:
  - business
  - hack
  - morals
modified: '2014-09-03 16:15:12'
---
# The Hack Stops Here

In my view there are two types of hacks:

1. Solutions that solve a problem that can't be solved any other way (i.e. due to a limitation within a browser).
2. Solutions to business created problems.

Hacks for the first type are acceptable.  They go where no other code can go, and are a requirement.  As such these types aren't really hacks - they're just sneaky, ninja-type bits of code.

The second type happens in two situations:

1. When a last minute detail has cropped up and there's no other way to do the task quickly enough.
2. When a business decision has been made that forces the hand of the developer to hack a solution.

There are always exceptions, but those aside: it's this last type that I (now) refuse to develop.


<!--more-->

## Facebook Friends Import

If you're not familiar with [Facebook](http://www.facebook.com) get out from under your rock.  One "feature" that's being discussed in the blogging World right now is the ability to import friends from Hotmail or Gmail.

This concept is great.  However, the actual implementation of importing your friends is appalling.  It requires the user to enter their username and password to the particular service to import the data.  

This is a hack.  A hack driven by business.

Jeremy Keith points out that this kind of hack [teaches people how to be phished](http://adactio.com/journal/1357).

This functionality is nothing new, for years we've been able to write code that can log in and cache the cookie to continue to programmatically navigate through a system ([LWP](http://search.cpan.org/~gaas/libwww-perl-5.808/lib/LWP.pm) springs to mind) - but we didn't (or you shouldn't have. Bad dog).

## Lead By Example

The big problem is that Facebook is such a big entity on the Internet that it's seen to leading the way.  In the words of [37 Signals](http://www.37signals.com/svn/posts/597-screens-around-town-facebook-virgin-america-time-etc):

> No wonder other sites have been racing to implement similar features

If you're in a position of authority, others will listen to you, and if you show them the **right** way of doing things, then you're on to a winner.  

If, on the other hand, you show them the wrong way of doing things (see [Twitter's new invite system](http://twitter.com/invitations)) you're starting a virus.

As a general rule: if it's questionable, then it probably shouldn't be written.

What do you think?  Do you find yourself being bullied in to hacking solutions, or do you think hacking up the Internet is the way to go - and more importantly: why?  Or is your approach *do the right thing*?

![Hacking can be hazardous to your heath ](http://remysharp.com/wp-content/uploads/2007/10/hacking.jpg)
