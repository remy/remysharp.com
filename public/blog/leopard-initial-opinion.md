---
title: Leopard - initial opinion
date: '2007-10-27 13:02:24'
published: true
tags:
  - apple
  - leopard
  - mac
  - opinion
modified: '2014-09-03 16:15:12'
---
# Leopard - initial opinion

Among thousands and thousands of other Mac lovers out there, I too purchased my copy of Leopard for it to arrive on Friday.  The ride wasn't as smooth as I expected, and there were some roller coaster moments.  There's also a few small things that don't work as expected, and there's a few gems that are unexpected.


<!--more-->

## Before the install

The whole process wasn't helped by the charade that preceded my receiving the software.  Around midday I was told it was out for delivery.  At 6:30pm, I called again to be told it had been put out for delivery at 9:30am and that it had arrived at the depot (i.e. where they delivery *from*) at 11:30am.  Hmm...time machine was really working!  Finally I was told it was still at the depot, and wouldn't be delivered until tomorrow.

7:30pm that evening, a lowly messenger arrives at the door handing me Leopard.  Random.

## Backup!

I didn't.  I'm not sure why I didn't, I'm usually very good at this stuff.  I threw caution to the wind.  When Leopard had installed (about 1 1/2 hours unattended install), I found my email and all my iCal events completely empty.

I was quite ready to lob the OS out of the window and desperately hunt down my Tiger CDs.

I knew searching Google would probably not work, since the software was so new, it wouldn't have indexed any results yet.  So I went hunting on apple.com and technorati (in the hope someone had blogged their problems).  No one else appeared to have problems!

However, Apple did have the article "[iCal, Mac OS X 10.5: Empty "Home" and "Work" calendars may appear after installing Leopard](http://docs.info.apple.com/article.html?artnum=306537)".  Sorted.

Mail, for some reason it hadn't removed my plugins, as a Mail upgrade normally would.  I removed them, and it worked just fine.

## A Few Gritty Bits

### Resolution Independence

With all the initial chatter about resolution independence, it doesn't look like it was ever to be so.

### Stack alignment

There's an odd effect when opening a stack and then moving over it.  I kind of expected the current stack to stay in focus in the Dock.  I've included a quick vid of what I mean (I'm being picky).

<object width="400" height="300" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab">
  <param name="src" value="http://remysharp.com/wp-content/uploads/2007/10/stacks.mov" />
  <param name="controller" value="true" />
  <param name="autoplay" value="false" />
  <embed src="http://remysharp.com/wp-content/uploads/2007/10/stacks.mov"
    width="400" height="300"
    controller="true" autoplay="false"
    scale="tofit" cache="true"
    pluginspage="http://www.apple.com/quicktime/download/"
   />
</object>


### Mail's RSS reader

This was one of the features I was looking forward to most - to be able to consolidate all these messages.  However, since Mail doesn't import [OPML](http://en.wikipedia.org/wiki/OPML "OPML - Wikipedia, the free encyclopedia") I've got a manual job of adding 65 RSS feeds...

I'm looking around for a hack, and *when* I find it, I'll post it up here.

### Apache 2

Although later copies of Tiger came with Apache 2, the version I had running on both my machines ran 1.3.  In the upgrade, they sneakily moved me over to Apache 2 - which broke my offline dev environment :-(

I've since [posted how to fix it](http://remysharp.com/2007/10/27/lamp-in-leopard-osx-105-php5-and-apache-22/), and staying with Apache 2.

### QuickSilver - show application menu broken

I use the [current app -> show menu hack](http://www.43folders.com/2007/03/12/tme-quicksilver-application-menus) for Quicksilver - now not working.  I suspect it's perhaps to do with QuickSilver hooking the menu nib...or something...fingers crossed it gets fixed soon.

## A Couple of Gems

### Coverflow & preview icons

I don't use coverflow too much in iTunes, in fact barely at all.  However, I find my self in Finder going back to coverflow and skimming through my documents finding what I'm after that little bit faster - and it's kinda fun too.

Quickview is really smart and very fast considering it's opening up all kinds of types of docs.  

I think this is the most unexpected feature that I'm using.

<object width="541" height="338" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab">
  <param name="src" value="http://remysharp.com/wp-content/uploads/2007/10/coverflow.mov" />
  <param name="controller" value="true" />
  <param name="autoplay" value="false" />
  <embed src="http://remysharp.com/wp-content/uploads/2007/10/coverflow.mov"
    width="541" height="338"
    controller="true" autoplay="false"
    scale="tofit" cache="true"
    pluginspage="http://www.apple.com/quicktime/download/"
   />
</object>

### Network mounting & unmounting

If you move around with your Mac, then you may know of the pain that is: forgetting to unmount.

When Tiger doesn't unmount a network drive, and you disconnect the network - everything hangs for about 5 minutes while the OS goes off to work out what the heck happened.  

Now in Leopard, so far as my tests have shown, forgetting to unmount doesn't render your machine busy.  It's cached a tree of where you've been already.  You can't access the files while you're offline, but it doesn't groak if you disconnect the network, but remain mounted.

### Scrolling

You can scroll windows that are not in focus.

### iCal's icon

No longer stuck on 17th of July when it's closed!

## Overall

Overall, I'm still impressed.  There are a few UI things that I'm not quite sure about, but the same was true when I moved from Panther to Tiger - it just takes a little time to get used to the changes.

I'll be getting myself and external drive for Time Machine - turns out you can't use S3 as a Time Machine disk :-(

I'd like to hear what other people think of Leopard too.
