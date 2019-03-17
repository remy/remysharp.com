---
title: Detect Global Variables
date: '2007-11-01 17:36:51'
published: true
tags:
  - bookmarklet
  - code
  - debugging
  - global
  - javascript
modified: '2014-09-03 16:15:12'
---
# Detect Global Variables

I've got a handy little bookmarklet that I use to check whether any variables have slipped out in the to global namespace (i.e. on to the <code>window</code> object).

<a style="font-size: 150%; text-align: center;" href="javascript:(function(){var a={},b=[],d=document,e,f,i,w=window,g={},v=(prompt('Ignore filter (comma sep)?','')||'').split(','),i=v.length,f=d.createElement('iframe');while(i--){g[v[i]]=1}for(v in window){a[v]={'type':typeof window[v],'val':window[v]}}f.style.display='none';d.body.appendChild(f);f.src='about:blank';f=f.contentWindow||f.contentDocument;for(v in a){if(typeof f[v] != 'undefined')delete a[v];else if(g[a[v].type])delete a[v]}e='addEventListener,document,location,navigator,window'.split(',');i=e.length;while(--i){delete a[e[i]]}console.dir(a)})()">Globals</a>

Note that all global variables (including functions) that have been added by your page, will be written to via <code>console.log</code>.

The bookmarklet will also prompt to filter out globals, i.e. if you don't care about functions, just filter it out.

<!--more-->

It won't work in IE because it writes to the <code>console.log</code> - but globals are globals - so it can just as easily be tested in Firefox.

## How it works

It's fairly simple really.  The bookmarklet creates a hidden iframe and loops through all the attributes on the <code>window</code> object removing the common ones.

Then there's a small tweak to remove a few manually (addEventListener, document, location, navigator and window), partly because it's an iframe, partly because I set the location to [about:blank](about:blank).

Every thing that remains was put there by the particular page.

## The code



The code is simply a compressed bookmarklet version of the following:

    var differences = {},
        exceptions, 
        globals = {},
        ignoreList = (prompt('Ignore filter (comma sep)?', '') || '').split(','),
        i = ignoreList.length,
        iframe = document.createElement('iframe');
    while (i--) {
      globals[ignoreList[i]] = 1
    }
    for (i in window) {
      differences[i] = {
        'type': typeof window[i],
        'val': window[i]
      }
    }
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = 'about:blank';
    iframe = iframe.contentWindow || iframe.contentDocument;
    for (i in differences) {
      if (typeof iframe[i] != 'undefined') delete differences[i];
      else if (globals[differences[i].type]) delete differences[i]
    }
    exceptions = 'addEventListener,document,location,navigator,window'.split(',');
    i = exceptions.length;
    while (--i) {
      delete differences[exceptions[i]]
    }
    console.dir(differences);

And there it is :)
