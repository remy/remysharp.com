---
title: JS Bin for Collaborative JavaScript Debugging
date: '2008-10-06 14:54:51'
published: true
tags:
  - code
  - code
  - javascript
  - project
  - web
modified: '2014-09-03 16:15:12'
---
# JS Bin for Collaborative JavaScript Debugging

The weekend before last (28-Sep 2008) I blitzed through an idea I had on the shelf for about 6 months and put it live under the name [JS Bin](https://jsbin.com).

<!--more-->

## What is it?

JS Bin is a form of paste bin, but with a twist. It allows you to also include the HTML and CSS to provide context to your pasty.  As such, it means you can actually run the JavaScript and pass this on to a colleague to help to debug.

A short list of features:

* Save private snippet
* Remote Ajax debugging
* Snippet URLs run entirely on their own (i.e. without the JS Bin framework around them)
* Support to quickly inject major JS libraries
* Saves state within the open window (i.e. refresh and the code doesn't reset)

In addition, any code snippet can be edited.

Take this example: [query string aware JavaScript](https://jsbin.com/utala/) ([https://jsbin.com/utala/](https://jsbin.com/utala/))

...to edit it, you just add '/edit' to the URL and you can modify the snippet yourself and save it as new:

[https://jsbin.com/utala/edit](https://jsbin.com/utala/edit)

## Why?

I had a conversation with [Rey Bango](http://www.reybango.com/) some months ago where he was trying to debug a piece of code that had an Ajax hit.  He sent me the code, but without seeing it running I wasn't too much help to him.

I made a start some time ago offline and planned for a system to allow you to create fake Ajax handlers to respond to requests.

In the last couple of weeks I saw [John Resig's learning app](http://ejohn.org/apps/learn/) and the sandbox idea suddenly had legs again. I knew I could write something very quickly, almost entirely in JavaScript (and since it's a JS debugger, there's no point in the extra work to make it degrade).

A small server side php file does the saving work (and maintaining old code snippets) and over the course of a few hours I had a fully working webapp that allows me to create Ajax responders and code snippets that run live and can make real Ajax calls.

## Examples

I've recorded a couple of screencasts showing how it can be used:

* [General introduction](https://jsbin.com/about#video)
* [Ajax debugging](https://jsbin.com/about#ajax)

## Feedback

If anyone has suggestions, feedback, bugs, etc - please let me know!

_Also announced [on Ajaxian](https://web.archive.org/web/20081012014354/http://ajaxian.com/archives/an-interest-twist-on-a-pastebin)_
