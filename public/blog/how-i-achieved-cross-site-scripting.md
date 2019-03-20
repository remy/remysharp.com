---
title: How I achieved cross site scripting
date: '2007-01-18 21:33:09'
published: true
tags:
  - ajax
  - code
  - heatmaps
  - javascript
modified: '2014-09-03 16:15:12'
---
# How I achieved cross site scripting

Before I get flamed for claiming the impossible, this is how I achieved a goal that was entirely in AJAX, but I needed it to across different domains!

Some background: Some time ago I found, and implemented this [awesome heatmap click tracking](http://blog.corunet.com/english/the-definitive-heatmap) for the company I work for.  However, since our test machines run everything from one machine (i.e. images and code), when it came to putting it live I never thought for a second it wouldn't work...which was the result.

It was because the page was being served from one domain, while the click tracking data was being sent to our 'static' (non-[mod_perl](http://perl.apache.org/)) servers.


<!--more-->

I'm posting this up because I think the heatmap is a superb tool for companies, in particular the designers and the marketing people.

Heatmaps will tell both groups whether a particular element is working to focus attention, or if in fact something else is drawing attention that they never thought of.

The way I got around this was to send the data via an '<acronym title="Inline Frame">iframe</acronym>'.

The click tracking needs the server side to record the data, and doesn't require a response.  So, although using AJAX to perform the click tracking (on mouse down from anywhere in the page), equally I can record a mouse down from my main page, but instead, I'm changing the 'src' attribute of an iframe which sends the co-ordinates to my static server.

So where he has used the following:

`var url='guardacoordenadas.pl?x='+tempX+'&y='+tempY;
guardar(url);`

I am simply ditching the AJAX aspect of it and changing it to (assuming 'iframe' is a variable that I have already pointed to our iframe):

`var url='guardacoordenadas.pl?x='+tempX+'&y='+tempY;
iframe.src=url;`

Here is a [simple example of it working](/images/crossdomain.html) (note that Safari doesn't throw any errors on the cross domain button).

Then I would style the iframe to sit outside of the window:

`position: absolute; left: -10000px`

Hopefully this is some use to someone else out there.
