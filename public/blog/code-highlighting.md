---
title: Code Highlighting
date: '2007-12-06 16:14:59'
published: true
tags:
  - blog
  - code
  - development
  - syntax
  - web
modified: '2014-09-03 16:15:12'
---
# Code Highlighting

Since I'm always posting code snippets, it made sense to apply some syntax highlighting.  

There's a few different ways to achieve this depending on your preference.


<!--more-->

## For Webapps & Blogs

There's really two ways to do it:

1. Server side.
2. Client side.

### Server Side

[Geshi](http://qbnz.com/highlighter/ "GeSHi - Generic Syntax Highlighter") is one of the best ways I've come across for PHP.  I'm sure there's a [wealth of libraries out there](http://www.google.com/search?q=syntax+highlighter) for other languages.

The only thing with Geshi, is you *have* to specify the language - sometimes this doesn't suit the solution, because you just want to whack in the code and off it goes.

### Client Side

I'm in the process of (soft) launching a new web site [jQuery for Designers](http://jqueryfordesigners.com) which uses client side code highlighting.

It uses [Google's syntax highlighter](http://code.google.com/p/syntaxhighlighter/) with a few small tweaks for my own use, i.e. [I've compressed it and changed it so it applies to all code tags regardless of the class](http://jqueryfordesigners.com/wp-content/themes/Skittlish-Theme_1.06_widgets/skittlish/javascripts/prettify.js).  

I like this syntax highlighter because you don't have to specify the language.  It takes common design patterns and highlights them as appropriate, i.e. quoted strings, numbers, functions, etc.

The bottom line is syntax highlighting is used more for breaking up the code than actually picking out keywords - otherwise you're not really reading the code :-)


## Using Third Parties

Up until now, I've used [snipplr](http://snipplr.com/users/remysharp/) but I've always wanted to do more with it.  

I use a [snipplr wordpress plugin](http://snipplr.com/extras/wordpress/), combined with a custom [TextMate](http://macromates.com) bundle I've written, I can post to snipplr and post to my blog at the same time.

It's through this kind of functional requirements that I've started my own code bin: [Todged](http://todged.com) (again, another soft launch, I'm still writing new functionality for it and it's very much a showcase site which I'll blog about here in detail (OpenID, automatic avatars, etc)).  I'm toying with the functionality of allowing posted code blocks from Todged go directly in to a specified blog.


Can anyone else recommend any other tools/apps?
