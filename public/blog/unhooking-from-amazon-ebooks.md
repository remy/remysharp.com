---
title: 'Unhooking from Amazon ebooks'
date: 2025-06-29
tags:
  - personal
---

# Unhooking from Amazon ebooks

Over the years we, as a family, have been moving our purchases away from Amazon, except in one single place: Kindle ebooks. For me it's that I'm incapable of reading physical books ([but my kindle unlocked my reading](https://remysharp.com/2021/12/14/how-i-relearnt-to-read)), and with a Kindle, I was limited as to where I buy my books.

When I read that it was relatively easy to [jailbreak all the Kindle models](https://kindlemodding.org/jailbreaking/) I used this as my opportunity to move to buying epub books and hopefully more of that money goes to the authors (in an ideal world…).

Here's how it's going so far. In short: not _quite_ as well as I'd like.

<!-- more -->

## Jailbreaking

I won't cover the process here, but it wasn't too difficult. You have to properly identify your model (which is tricky enough), and then carefully follow the step by step process. It's lots of reading, clicking, double checking and waiting. The Kindle needs to be connected to the computer doing the work, it's tedious but gives you more features.

Importantly (for me) was that the full original system is intact. The jailbreak process adds a "book" (app) called KUAL which is the doorway to the custom e-reader - specifically I installed [KOReader](https://koreader.rocks/) (though I've no idea if there's other readers available!).

## KOReader

This is the app that will read the epub format (and most other e-book formats). A little frustrating that the Amazon purchased books are read using the original Kindle reader (they're the [AZW3](https://en.m.wikipedia.org/wiki/Kindle_File_Format) ebook format - which has Amazon's DRM protection).

The UI is…not entirely intuitive. I spent probably the course of a week messing around with different settings, losing where the menu options were, being unsure why there's two types of config panels and completely missing the pagination on the settings. Eventually I found that there's a "Menu Search" (in the right hand side hamburger menu in "Help").

There's some nice features for when the Kindle is turned off, besides having the book cover, I've got it set to show the cover, title, how long I've been reading it for and my current progress (search for "wallpaper"). I particularly like the "book map" feature (though, I can't say I visit often):

![A complete map of the book, showing sections, chapters, progress and highlights I've made](/images/koreader.jpg)

## Getting ebooks / not giving money to Amazon

This is really the draw for me. The short version is: this is not straightforward in the slightest, and Amazon have done a pretty good job of making the user experience pretty smooth (I believe, but don't have personal experience, that a Kobo reader has a similar workflow).

With Amazon, I can find the book I want using my phone, buy it, and sync my Kindle and it's ready to be read. I've managed to do this abroad even without wifi because I can hotspot my Kindle to my phone to pick up the new book.

There's two problems to overcome to get this kind of experience:

1. Automatic syncing of newly purchased books
2. DRM stripping

There's a few ways to handling syncing, none of them entirely straight forward.

If you're familiar with [Calibre](https://calibre-ebook.com/), From here there's a KOReader plugin that your Kindle can connect to and "send to main" will send the book to KOReader - though this is obviously not automated.

There is a "cloud sync" option in KOReader that can connect to Dropbox (and FTP if you like). This could get books across, but the biggest issue I came up against is the DRM removal.

DRM stripping can all be done in Calibre, but through my exploration, I couldn't find a way to automate this, even from the command line.

From my (little) experience, there's two parts to the DRM removal (so your bought book can be read on KOReader):

1. The book comes in a .ascm format - a pointer file that is serviced by [Adobe Digital Editions](https://www.adobe.com/uk/solutions/ebook/digital-editions.html) which only then gives you a DRM encoded epub (or PDF).
2. Once I've got the epub, I can use [Calibre's DeDRM tools](https://github.com/apprenticeharper/DeDRM_tools) so that my book is finally portable.

The problem with all this is that it requires that you drive the software to do the work.

I did find a [DeASCM plugin](https://github.com/Leseratte10/acsm-calibre-plugin) which worked on the Adobe Digital Editions sample book, but didn't work on the [book I had bought](https://www.goodreads.com/book/show/38739384-in-bloom) from Google's store (though it _had_ successfully fulfilled the DRM fulfilment, but just couldn't get the epub out).

So the workflow I have is clunky, and definitely not compatible if I'm away from home reading a book (and it's usually holidays that I'll impulse buy a book).

## The other downsides

There's a few other factors against me when trying to cut Amazon out of the chain of suppliers:

1. Amazon have a near monopoly on ebooks. Okay, maybe not quite, but every book publisher I've visited since jailbreaking my Kindle has pointed me (often exclusively) to Amazon to buy their book.
2. Amazon have deals on books all the time - which, if I'm honest with myself, is appealing (because I save money) but almost certainly doesn't help the authors.
3. As much as [Goodreads](https://www.goodreads.com/author/show/4048781.Remy_Sharp) sucks, I do use the "mark as reading" and have pulled [my book highlights](https://remysharp.com/2025/05/01/showing-book-clippings-on-my-blog) from their service into my blog. I do have a work around for KOReader, but again it's even more manual.
4. Fiction (or the fiction I read) is almost always in this DRM-land (and I'm slow AF reading non-fiction, so I don't do it often)

Hopefully I can revisit this process in the coming years and there will be some process to help me streamline the work.