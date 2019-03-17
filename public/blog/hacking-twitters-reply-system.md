---
title: Hacking Twitter's reply system
date: '2010-06-14 12:37:45'
published: true
tags:
  - twitter
  - web
modified: '2014-09-03 16:15:12'
---
# Hacking Twitter's reply system

I'm only writing about this because I still see some tweets coming out of Twitter that are intended for everyone, but end up just going to a select few. This trick is pretty well used, but hopefully it'll help those people who haven't spotted it yet.

<!--more-->

The way @replies work, is that if you start your tweet with @user only that user and your common followers (ie. that follow both you and me) will see the tweet.

If you want everyone to see the tweet, yet the tweet is in reply to @user, then you can you can hack the @reply system by putting a character before the tweet.

Instead of doing:

> @brucel and I are doing are talking HTML5 at London Geeknights

I'll insert a period character (it can be anything you want) and it'll be seen by everyone:

> .@brucel and I are doing are talking HTML5 at London Geeknights

## When would you want to use this? 

I *only* use this when my reply is of value to all my followers. 

If it's not, and only a specific reply, then I don't hack the @reply.

## Inverting the hack, not CC'ing lots of people

The inverse of this hack (perhaps...!) is when you're having a conversation with a specific group of followers. You don't need to /cc them all if you all follow each other.  For example, if I'm replying to a tweet from @codepo8:

> @brucel @adactio HTML5 has wings! (not a real tweet!)

I can reply with simply:

> @codepo8 Like redbull or something else?

And since @brucel & @adactio follow @codepo8 I know they'll see the reply too in their main stream.  

If I want to force it in to their replies, then I'll include them in the @reply if it's really worth getting to their attention.
