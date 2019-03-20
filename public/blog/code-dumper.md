---
title: Code Dumper
date: '2008-05-09 18:35:04'
published: true
tags:
  - code
  - code
  - project
modified: '2014-09-03 16:15:12'
---
# Code Dumper

[Code Dumper](http://codedumper.com/ "Code Dumper :: does what it says on the tin") is a personal project of mine that I've used to practise some new skills on.

It's a code dumping repository with a couple of features that I think makes it unique from the other code bins.  Where possible, I'll blog about how particular aspects of the project so that they can be re-used - I've already done this with it's [OpenID implementation](/2008/04/24/stop-using-openid-why-how/).
<!--more-->

## Why Create Another Code Bin?

I started off using Snipplr, but got frustrated with some of the functionality that didn't seem quite as smooth as it should be.  Then it was redesigned and I found it really hard on the eye (regardless of being able to switch from small to large).

I wanted a code bin that was super easy to use and I could provide a **full** feed of the code dumps to friends or colleagues.

There are other pastie bins which simplify the process right down, but I couldn't keep a complete record of my code snippets.

So [Code Dumper](http://codedumper.com/), previously known as Todged came about.

## How is it Better?

These were all features I found desirable:

1. Start saving code from the [get-go](http://codedumper.com/new).
2. OpenID for [login](http://codedumper.com/login) - no faffing around with registering. It's there to be used.  If you use OpenID, new code snippets are linked to your account.  If you never log in, that's fine too.
3. Tab and untab support in the edit.  If you highlight the lines, and hit tab, it will indent the code.
4. Super easy URLs.  They're designed to be [pronouncable](/2008/04/14/pronounceablely-random/) if you don't specify them yourself, or if you enter a title, the page will try to generate the URL based on the title ([give it a try](http://codedumper.com/new?action=show_advanced)) or you can specify it entirely yourself, e.g. [http://codedumper.com/generic-menu-layout](http://codedumper.com/generic-menu-layout)
5. Even better URL features are the line highlighting.  If you select (or control+select) the lines in the code snippet, it will update the permalink to highlight those lines.  So you can email your colleague the particular lines you want them to look at: [http://codedumper.com/password-generator-js#2-3,9,23](http://codedumper.com/password-generator-js#2-3,9,23)
6. Automatic (attempt) to grab your avatar without any input from you (I'll blog about that soon).
7. I hate the typical captchas, I find them pretty hard to determine against the image backgrounds they sometimes have - so when you [log in](http://codedumper.com/login) for the first time, there's something different in place.
8. Undelete.  If you've got an account, and you delete a code snippet, it's never really gone.  It's stored in the [attic](http://codedumper.com/attic) for retrieval.
9. Copy to clipboard - that does just that, no popup windows requires or selecting an' stuff!
10. Auto-de-indent.  If you save your code, and it's already indented, it will save the code at the lowest tabbed (or spaces) delimiter.

I've always had more plans for the app, but business beckons and I've got another project I'm working on quietly behind the scenes to help designers.

I'd love to hear any feedback you might have.

