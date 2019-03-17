---
title: FOWA 2007 - followup
date: '2007-10-06 00:50:15'
published: true
tags:
  - conference
  - fowa
  - patration
  - review
  - web
modified: '2014-09-10 22:11:01'
---
# FOWA 2007 - followup

The [FOWA](http://www.futureofwebapps.com) conference ran for two days from the 3rd of Oct.  My focus was very much the developer track, though perhaps I'll visit next year and sit on some of the entrepreneur sessions.


<!--more-->

The highlights for me, in no particular order, were:

* Meeting and chatting to [John Resig](http://ejohn.org)
* Steve Souders' presentation on high performance web sites
* Patration! and 300 slides
* Taking Your Application Mobile & *real* mobile web by [Heidi Pollock](http://www.futureofwebapps.com/speakers.html#HeidiPollock)
* Diggnation
* Listening to [Matt Mullenweg](http://photomatt.net/)

New apps/web apps/services I discovered during the event (in order of appearance):

* [Picnik](http://www.picnik.com/) - AIR based photo editing app
* [IBM (free) web profiling tool](http://alphaworks.ibm.com/tech/pagedetailer)
* [HyperDB](http://comox.textdrive.com/pipermail/wp-hackers/2007-May/012893.html)
* [Mobile phone acid test](http://www.jwtmp.com/a/)
* [APML - Attention Profiling Mark-up Language](http://www.apml.org/) via a *very* early preview of...
* [fav.or.it](http://fav.or.it/ "fav.or.it - favorit RSS Reader and Blogging Platform")
* [Dapper](http://www.dapper.net/ "Dapper: The Data Mapper") - user generated API(!!!)
* [Dopplr](http://www.dopplr.com/ "DOPPLR")
* [Identity matching](http://code.google.com/p/identity-matcher/) for twitter, flickr, MF identity matching (on Rails)
* [Plazes](http://plazes.com/ "Home - Plazes - Right Plaze, Right People, Right Time") - just for fun
* [Cometd](http://www.cometd.com/ "â˜„ Cometd - The Scalable Comet Framework") and [Perlbal](http://www.danga.com/perlbal/ "Perlbal") for comet servers
* [Fire Eagle](http://fireeagle.research.yahoo.com/ "Fire Eagle is coming...") - no more naughtiness...

## The Best Bits

Frankly the idea of going to a two day event where I knew absolutely no one, coupled with my exceptionally poor networking and small talk skills was a little bit daunting.

However, the sessions were superb.  A great effort on [Carsonified](http://www.carsonified.com/ "Carsonified") (formally [Carson Systems](http://www.carsonsystems.com/ "Carson Systems Ltd.")) part.

### Web Site Performance

The first day held the Yahoo presentation on high performance web sites, and although I had inadvertently seen [the presentation](http://feeds.yuiblog.com/~r/YahooUserInterfaceBlog/~3/152099220/) already - the points Steve Souders ran over really started to drum in to my head - so much so, the first thing I did when I got back to [DL](http://www.digitallook.com) was to start putting these in place for the latest project I'm working on.

### Mobile Applications

[Heidi Pollock](http://www.phostar.com/~heidi/faq.html) ran a session on mobile applications.  [Her energy was great](http://www.flickr.com/photos/fromheidi/1475202249/in/photostream/).  Her hostility towards all the variations of mobile browsers was awesome - the mobile platform, and forget the iPhone, it's a tiny, *tiny* drop in the ocean, has well over a 100 variations of browser.  On top of which, even with the same mobile phone, and same web site, the mobile carrier can still modify the payload causing additional headache to the whole mobile dev.  I thought I had problems with IE6 and IE7: phah!

My first, and biggest annoyance from the conference, wasn't the sessions, but perhaps the attendees - in particular, as each technology was announced, usually the first thing that would spring to mind, or be asked of the speaker was:

> When will it be available on mobile?

&lt;rant&gt; Who cares?  We don't have a solid HTML platform on mobile yet.  The iPhone is going to support Flash, and soon so will Opera and the Blackberry, but there's so many other devices out there - and isn't the main point of mobile web apps that the target audience is **so** broad?  The iPhone and Opera devices sadly aren't the majority, so if you want the attention of the big audience, forget [Gears](http://gears.google.com/ "Google Gears (BETA)") on the mobile, forget [AIR](http://labs.adobe.com/technologies/air/ "Adobe Labs - Adobe AIR") on the mobile - start with HTML on the mobile &lt;/rant&gt;

Quick list of mobile bits if you're interested:

1. Best screen res to aim for is 176px wide.
2. Forget standards and forget semantic web if you want to succeed.  An <code>&lt;h1&gt;</code> tag is easily, and better replaced by a <code>&lt;b&gt;</code> tag (note: not a <code>&lt;strong&gt;</code> tag - see next point).
3. **Every** byte counts.  A <code>&lt;b&gt;</code> tag is 10 characters less than a <code>&lt;strong&gt;</code> tag (since you're closing tags too).
4. **Every** character counts - I can't remember exactly, but it's something like 20 chars wide by 9 lines deep.  If you're translating - then think very carefully about your wording.
5. Use xhtml mobile profile 1.0 and not 1.2 - it's better supported.
6. Checkout [WURFL](http://wurfl.sourceforge.net/ "WURFL").
7. [Mobile phone acid test](http://www.jwtmp.com/a/)
8. If I remember correctly, the most popular mobile browser is the [Motorola V3](http://www.motorola.com/motoinfo/product/details.jsp?globalObjectId=69)

### Meeting the Man Behind jQuery

Although [John Resig](http://ejohn.org/ "John Resig - JavaScript, Programming, and Web Applications") wasn't there to speak about [jQuery](http://jquery.com/ "jQuery: The Write Less, Do More, JavaScript Library") is would only be polite to thank him for it.

[His talk](http://ejohn.org/blog/future-of-firefox-and-javascript/) covered how JavaScript is moving forward, and particularly JavaScript 2, how it will be available in IE, albeit kicking and [screaming](http://wiki.mozilla.org/Tamarin:ScreamingMonkey).

Our conversation spurred me on to [Rhino](http://www.mozilla.org/rhino/ "Rhino - JavaScript for Java") and [some server side DOM parsing](http://ejohn.org/blog/bringing-the-browser-to-the-server/) (which I'll be posting on separately).

### Utility Computing and 300 slides in 30 minutes

In honesty, I hadn't heard of the chap before, nor had I heard of utility computing - though I certainly knew and employed the technique myself.

The idea that the basic bits of building web sites we redo all the time, and how, for example, FaaS (Frameworks as a Service) allow us to leapfrog that tedious and simple tasks.  How products like [S3](http://aws.amazon.com/s3 "Amazon.com: Amazon S3, Amazon Simple Storage Service, Unlimited Online Storage: Amazon Web Services") and [EC2](http://aws.amazon.com/ec2 "Amazon.com: Amazon EC2, Amazon Elastic Compute Cloud, Virtual Grid Computing: Amazon Web Services") supply the HaaS (Hardware as a Service).

However, all this intellectual and product gumph aside, he also threw himself through 300 slides in a carefully crafted 30 minutes and introduced (::erhem::) us to the word:

> [**Patration**](http://swardley.blogspot.com/): "the freedom and portability to move from one service provider to another without hindrance or boundaries"

Which, silliness aside, is exactly the approach we should be taking when building our web apps.  The idea that if you're using an external platform/provider, there should be some commonality to them to allow you to move without having to rewire your entire solution.  You wouldn't rewire your house just because you moved would you.

### Wordpress Founder

Listening to [Matt Mullenweg](http://photomatt.net/) and not only realising that everything he had said made sense, but it was also stuff I knew.  This only says that I've been doing the right thing, and if he can make a great business (and his own mark out on the web) out of it, then I definitely have it lurking inside me somewhere too.  No doubt so do many other people, and I look forward to their competition and being spurred on.

### Diggnation, and a 1000 over excited techies

I've never seen [Diggnation](http://www.diggnation.com/) before, so the idea of it being filmed live wasn't that exciting (particular as I was on my own).  The only thing I get excited about is the prospect, and actually having, snowboarding holidays, and perhaps sticking IE one after cracking some bug - aside from that, I'm pretty unimpressed by most things.

The £3 bottle of Becks helped (yep, £3, ouch!), but the biggest thing I was surprised about, and still can't get my head around, was the some 1,000 (perhaps...) techies, standing, shouting, whooping, and yelling for Diggnation and Kevin Rose.  It felt quite wrong!

All that said, I really did laugh out loud and hard at the comedy [Alex Albrecht](http://en.wikipedia.org/wiki/Alex_Albrecht) had somehow produced by playing against straight guy Kevin Rose.

## Future of Web Apps

Anyone wanting to know what the future holds for web apps: either get yourself some tickets for the next event, or even better: go out and create the future of web apps.

We're in the midst of a web revolution, and expectations are high, and the competition is even higher.  However, there's still room for the right idea to be bootstrapped and pushed kicking and screaming out of the door ready to take on the World.

Good luck developers, and I'll see you by the bucket at the end of the rainbow!
