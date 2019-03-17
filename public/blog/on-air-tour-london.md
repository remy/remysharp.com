---
title: 'on AIR Tour: London'
date: '2008-04-11 10:29:27'
published: true
tags:
  - air
  - javascript
  - onair2008london
  - onairtour
  - web
modified: '2014-09-03 16:15:12'
---
# on AIR Tour: London

<img src="http://remysharp.com/wp-content/uploads/2008/04/air.jpg" alt="Air" title="Air" style="float: left; margin: 5px 5px 0 0;" height="132" width="99" /> Adobe hit London yesterday with their [on AIR tour](http://onair.adobe.com/) and I had a seat.

I'd been initially interested in AIR last year when I realised it was be a good entry point to developing a desktop app for the Mac (I've dabbled in Objective-C - but I can't get my head around the square brackets!)

Overall and excellent day and some great presentations.


<!--more-->

<h2 style="clear: left;">Why AIR?</h2>

I was attracted to AIR because I've got the skill-set that allows to dive straight in: HTML, CSS and JavaScript.

Although, I think, AIR is immediately associated with Flex and Flash type technology - there doesn't seem to be any disadvantage whichever way you approach it - it's just a case of what are you more comfortable working with.

## The Day

It was free to register for tickets, and I never for a minute thought they would sell out.  I may have been naive, but the spread offered by Adobe was excellent.

I've not been to an event entirely designed to promote a product, but free food and drink throughout the day, lunch provided, free beers at the end of the day and [Guitar Hero 3](http://www.flickr.com/photos/remysharp/2268147045/in/set-72157600666145464/) available for some battle mode action (which I managed to completely fluff - I blame the XBox 360, I'm used to the Wii!).

I didn't come away feeling like Adobe had force fed me AIR, I came away with a great experience of the day, I had actually learnt something new and I was keen to try out my new skills.

## Presentations

I've attended a few conferences, and @media Ajax was the closest conference to my developer heart...until this one.

The presentations would often break out of the keynote slides to dive in to the code and run live demos.  Right up front there was one presentation on using Flex Builder and directly after building AIR apps using JavaScript - first example using TextMate: perfect.

The quality of the presentations were *generally* very high.  There were a few comedy moments/presentations where the app being demonstrated refused to come out to play (I can't bring myself to name the app!) - but it highlighted the importance of good interface design, i.e. if it requires the Internet to work, make sure you [sniff for a connection](http://livedocs.adobe.com/air/1/jslr/air/net/URLMonitor.html) first!

One of the best presentations detailed the security model AIR apps followed and why it should be followed. A splathering of notes:

* Apps uses [sandbox](http://livedocs.adobe.com/air/1/devappshtml/help.html?content=ProgrammingHTMLAndJavaScript_10.html) [bridging](http://www.adobe.com/devnet/air/ajax/quickstart/sandbox_bridge.html) - i.e. doesn't let the app import anything without specifically having to handle it.
* Recommend you can auto update to get new features in to your app, and in particular bug patches. This should even be the first thing you build in to your app.
* Following functionality is restricted: eval(), innerHTML, &lt;script&gt;, document.write()
* You can load content and expose in to the sandbox via <code>parentSandboxBridge</code>
* You can import but it's done explicitly via Loader class - and you should use XMLSignatureValidator to ensure the imported content really does come from you.
* See customUpdateUI for greater control over installing updates.  It invokes the currently installed app, with an 'application update event' - then you handle the update yourself.  

## Sans Flex Builder

Being the TextMate fan that I am, I was extremely pleased to see a live demo by [Kevin Hoyt](http://blog.kevinhoyt.org/) using TextMate.  There are existing Air TextMate bundles out on the tubes, but none that had the API completion.

Which is why I went about parsing the JavaScript API and dropping it in to a [Air TextMate bundle](/downloads/Air.tmbundle.zip) - finished before the last presentation was over :-) 

## Some Titbits

Finally, here's a randomly ordered bunch of info I left with:

* Mac, PC and Linux runtimes all run with Safari 3.0 render engine, and the WebKit will be upgraded, and hence support SVG and CSS animations.  Although this may be more like a 2.0 release, they are planning to upgrade WebKit as it continues to upgrade.
* AIR 1.1 will support multi-language (mid-2008)
* You can include libraries via swf files, using script tags such as: <code>type="application/x-shockwave"</code>
* Install badges are the best way to install the app (a link from your web site that will trigger the install process).  You can customise these as much as you want - but you'll have to do the donkey work yourself as it's still quite new. Although there is a [beta badge](http://labs.adobe.com/wiki/index.php/AIR_Badge) available.
* When placing a menu, you need to sniff the OS (since MS Windows a locked each individual window).

## Finally

If you have the chance, you're interested in JavaScript and the tour is nearby - I highly recommend signing up if there's space left.
