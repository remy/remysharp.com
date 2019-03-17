---
title: Mobile Battery Performance
date: '2012-04-25 14:00:51'
published: true
tags:
  - web
modified: '2014-09-03 16:15:12'
---
# Mobile Battery Performance

I was working late adding some finishing touches to a mobile workshop I would be giving at the BBC the next morning when I run a twitter search looking for "bbc mobile" - and it turns up this article *on* the BBC about [poorly designed mobile sites 'drain smartphone battery'](http://www.bbc.co.uk/news/technology-17811557) - how pertinent!

I read through, and here's my take and criticism.

<!--more-->

The reporting on the BBC site is excellent, or excellent to me because it's a digested form of the [original report](http://www2012.wwwconference.org/proceedings/proceedings/p41.pdf) and begins with this quote:

> We hope this paper demonstrates the importance of building a mobile site optimised for mobile devices.

"Perfect!" - I exclaim to myself. But go ahead and try reading the report. It may be clear to a hardened engineer, but I'm be prepared to be 9 out of 10&dagger; *web workers* (web developers and designers all under one cosy roof) would a) not follow the report, and b) likely not make it to the end of the report. It's not written for them - or rather it's undigested.

<small>&dagger; I'd actually wager more than 9/10ths, but it's a catchier term!</small>

The BBC article does pick up on two messages, one that's a pretty nice take away (and frankly, I managed to glean this from the article too):

> ...using the .jpeg image format instead of other file types like .gif and .png

This appeared to save on battery. If only we had the flipping [connection type API](http://www.w3.org/TR/netinfo-api/) in more browsers we could use media queries to fix this elegantly.

What's interesting is (unsurprisingly) Gmail comes up trumps on performance (in the non-eating battery performance metric) but what's more interesting is the reasons "why". The paper claims:

> Gmail, the most "green" mobile site we found, uses HTML links to open email messages that the user clicks on. [...] Our experiments suggest that using links instead of Javascript greatly reduces the rendering energy for the page. Thus, by designing the mobile version of the site differently than its desktop version, Gmail was able to save energy on the phone.

This is *really* interesting to me because I've spent some time picking apart how Gmail works (and I'm far from done), but I was *pretty damn sure* that JavaScript features fairly heavily, **including** clicking email messages. So I fired up my Android, opened Chrome, opened the remote debugging port and sniffed around the DOM (as usual) and here's what a message (that you tap/click/whatever) looks like:

<img alt="Gmail messages in Chrome for Android" src="http://remysharp.com/images/gmail-messages.gif" style="max-width: 100%">

The first highlighted `onclick` is to *star* the email, the second for selecting it for some group action, and the third, yes, that `div` element, that has a click handler on it to open the message. Not "using HTML links to open email messages". Just to drum the point home - do you notice even *one single* HTML (anchor) link in there?

I think perhaps what Gmail *are* doing to save on battery is deferring the bulk of the JavaScript using the [evil eval technique](http://googlecode.blogspot.co.uk/2009/09/gmail-for-mobile-html5-series-reducing.html) where they're deploying script modules in commented out code, and eval'ing it in to execution on demand, both reducing the initial JavaScript parsing, but also negates the need for extra (expensive) HTTP requests for JavaScript modules. Something I suspect, based on this paper, Wikipedia could do with looking at (since it has the highest JavaScript execution time, yet it's the most content-ty web site I know of!).

## Not to be ignored

The BBC article does conclude with:

> The research is to be presented at the World Wide Web 2012 conference in Lyon this week.

I wonder if/hope there'll be videos of these talks, as the paper in it's current state is likely to be overlooked by a lot of our peers (understandably) but it does have an important message as smartphones become more capable (with JavaScript APIs like WebGL and the like): with great power comes great responsibility.

...technically, if the phone had great power, I guess the responsibility would go out the window because then you could go wild, but you get my gist - be wary this isn't a constantly powered device like a desktop computer. Most of us know how crap mobile phone batteries can be.

I'm just looking forward to web friendly interpretation of these and future results.
