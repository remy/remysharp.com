---
title: Trailing white space in TextMate
date: '2008-03-30 16:20:39'
published: true
tags:
  - code
  - textmate
modified: '2014-09-03 16:15:12'
---
# Trailing white space in TextMate

Trailing white space in TextMate has been bugging the hell out of me in recently, until [Dominic Mitchell](http://happygiraffe.net/blog/) [bookmarked](http://del.icio.us/network/remy.sharp/) this [awesome tip](http://lukewarmtapioca.com/2008/3/26/trailing-whitespace-in-textmate).

I've decided to take the tip one step further.


<!--more-->

The idea is to create a base layer grammar, and have it inherited by all the languages you want some common patterns to be matched.

## Common Grammar

Start by creating a new language grammar.  I've created it in the Source folder and called it source - but you can call it what you like.

I've added the trailing space pattern, with a slight twist on Britt's version, in that I'm only looking for trailing space (2 spaces or more) on lines I have code on (i.e. I don't care about blank lines):

<pre><code>{
  scopeName = 'source';
  patterns = (
    { name = 'source.invalid.trailing-whitespace';
      match = '\S(\s{2,})$';
      captures = { 1 = { name = 'invalid.trailing-whitespace'; }; };
    },
  );
}</code></pre>

It's a same we can't use <code>scopeName = 'source.*'</code> and have TextMate use namespacing to handling the inheriting.

## Inherit

Now in each language you want to make use of this grammar, add the following to the <code>patterns</code> lists:

<pre><code>patterns = (
  { include = 'source'; },
  // patterns continue...</code></pre>

I've included this in my JavaScript bundle, HTML bundle and so on.

## Highlight

As Britt's post shows, you can now highlight the nasty lines as such via the preferences:

![Highlighting trailing white space](/images/highlighting-trailing-white-space.png)

## Wrap Up

Now that you've got a common language grammar, you can add any number of extra matches that make programming that little bit more enjoyable...not that I can think of any just yet :-)
