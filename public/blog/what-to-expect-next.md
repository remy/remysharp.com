---
title: What to expect next
date: '2007-07-22 12:27:42'
published: true
tags:
  - personal
  - update
  - widget
modified: '2014-09-03 16:15:12'
---
# What to expect next

I feel like this blog has been a little quiet over the last couple of months, so for the loyal readers out there, here's a glimpse of what's been going on and what's coming next.


<!--more-->

## What have I been up to?

I've been focusing on [Left Logic](http://leftlogic.com) (my business) for the last couple of months, releasing two very well received applications.

### HTML entities

The [HTML entities lookup](http://leftlogic.com/lounge/articles/entity-lookup/) is both a web app and a dashboard widget that allows you to search for HTML entities by their visual likeness.  So for instance, if you want to find the &euml; character, you search for the letter 'e', or you want to find &raquo; so you search for &gt; or &gt;&gt;.

It's done really well to be picked up so far and hopefully the word will spread further.  It was [top for del.icio.us](http://del.icio.us/url/b0fcdae510591ee929916bd492d24d95), was top on the popular links on (Ma.gnolia)[http://ma.gnolia], a [staff pick by Apple](http://apple.com/downloads/dashboard/developer/htmlentitycharacterlookup.html), named at one of the [top 10 widgets by engadge](http://www.engadget.com/2007/07/07/enwidget-ten-useful-apple-dashboard-widgets/) and [dugg by Kevin Rose](http://digg.com/design/HTML_entity_character_lookup_based_on_how_the_character_looks/who) (though sadly not a lot of other people!).

### Speech Bubbles

The [speech bubbles](http://leftlogic.com/lounge/articles/speech-bubbles/) mini projects allows you to place a speech bubble on any web site, add some text and email the link to a friend.  It works using a bookmarklet and iframes on the 'public' page that creates the effects.

[Here's an example speech bubble](http://tinyurl.com/2cqgd5)

### This blog's new theme

I've been looking around to find a decent theme for some time now, and finally settled on "Illacrimo" by [Design Disease](http://www.designdisease.com).  I've had to go through the theme code to make it [XHTML](http://validator.w3.org/check/referrer) compliant (a couple of random mistakes like missing <code>ul</code> tags around list elements).

I'm also working on modding the theme to allow for a wider main body.  So far I've got this <a href="#?" id="expand">expand</a> function working, but it doesn't handle the comments or the comment box yet (I've had to re-do a bunch of background images and play with the CSS on this theme to make this work).  Let me know whether you think it's worth using this and expanding on it.

### Tagging

I've moved away from Ultimate Tag Warrior to [Simply Taggging](http://trac.herewithme.fr/project/simpletagging/) and I'm finding it much better for the latest version of WordPress.  Definitely recommend it (and it imports from UTW too).

## What's coming up?

### Last.fm recent album artwork plugin

I've finally got around to writing the code to grab the artwork from [Last.fm](http://last.fm) for the most recent track you've been listening to.  I'm going to release it later this week as a WordPress plugin, equally, the code should be easily migrated to TextPattern or any other blogging software.

### How to write a dashboard widget

After writing the [widget for the HTML entities](http://leftlogic.com/lounge/articles/entity-lookup/#widget) I realised there were a lot of bespoke ways of coding inside of [Dashcode](http://developer.apple.com/tools/dashcode/), so I've been writing my experience up and adding tips.

However, between starting the post and now, Dashcode has expired!  I'm hoping that Apple will re-release it since the expiry made sense when Leopard was coming out in July, but not [now that it has been delayed](http://remysharp.com/2007/04/13/apple-delays-osx-leopard/).  

I've had a play with some of the memory debugging tools for apps, and managed to find the point in the code which performs the date comparison, but I can't work out how to patch the binary to always pass the test (or even find the source of the date to make it expire a year later).  I'd be very interested if someone else out there thinks that they may be able to hack the binary to get it to work...

### Code dump

I'm thinking about adding a category called 'code dump', for useful snippets of code (that go beyond the scope of a single project).  It will mostly focus within JavaScript.  I would make use of [snipplr](http://snipplr.com/) - but I've not had a great experience with it yet.  If there's interest in this, I will add it.

### My iPhone App

I've been converting my [Marbles Squared](http://ihatemusic.com) to an iPhone app, starting with the initial code.  I've got [something working now](http://remysharp.com/marbles) without a decent style in place.  It's playable, but there isn't a leaderboard and you can't seed games.
