---
title: ISINDEX
date: '2019-02-21 17:37:23'
modified: '2019-02-21 17:37:23'
complete: false
inprogress: true
tags:
  - web
  - code
---

In our crusade to recreate the [world's first browser](https://worldwideweb.cern.ch/) (in 2019) the question of how to _search_ came up.

It's an interesting problem because the context for those days, 1989-1990, was that: the web had just been invented/proposed, the first http daemon had been written (and published) and the first browser had been written: WorldWideWeb.

For search to work, there would have to be an agreement between all three: the servers, HTML and the browser parsing the HTML.

So `<ISINDEX>` was used. This post looks at how it worked, where it faded out, and how, today, we actually have a very close descendant that is alive and well.

<!--more-->

## Notes

- [Many indexes and mention of search in history of W3](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/DesignIssues/ManyIndexes.html)
- [Summary of http 0.9 - agree how servers should handle isindex requests](https://www.w3.org/DesignIssues/HTTP0.9Summary.html)
- [Early hint of dropping `ISINDEX` and introduction of INPUT](https://lists.w3.org/Archives/Public/www-talk/1992NovDec/0042.html)
- [HTML 2.0 Forms specification '94](http://download.remysharp.com/archive/HTML-WG/html-archive.messages/152.html)
- [`<queryform>` successor to `ISINDEX` and precursor to `FORM`](http://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/79.html)
- [INPUT was pre-web?](https://web.archive.org/web/19970120135440/http://www.eit.com/goodies/lists/www.lists/www-talk.1993q1/0079.html)
- How did ISINDEX work?
- prompt and action properties
- Example on Lynx and WorldWideWeb
- Included in the announcement of the [first draft of the HTML5 Parsing spec](https://lists.w3.org/Archives/Public/public-whatwg-archive/2006Feb/0111.html) in 2006.
- [Dropped in Chrome 35](https://codereview.chromium.org/96653004/)
- Could also be used to trigger [XSS attacks](http://www.thespanner.co.uk/2008/08/26/new-xss-vector/)

The rendered DOM in browsers resembled this - an injected form, two horizontal rules, label and an input:

![isindex rendered in Chrome 31](/images/isindex-chrome.png)

## Browser support

- Chrome 34: 2014-04-09
- Firefox 55: 2017-08-08
- Opera 21: 2014-05-06
- IE11: 2013-10-17
- Android Browser 4.4
- Lynx 2.8.8rel.2

## To read

https://web.archive.org/web/19970120135440/http://www.eit.com/goodies/lists/www.lists/www-talk.1993q1/0079.html
