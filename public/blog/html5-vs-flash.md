---
title: HTML5 vs. Flash
date: '2010-02-08 12:00:24'
published: true
tags:
  - flash
  - html5
  - web
modified: '2014-09-03 16:15:12'
---

# HTML5 vs. Flash

First of all I wanted to make the title of this post "HTML5 _and_ Flash", but I know it's going to bait more readers if I say versus. I should state for the record that for the foreseeable future I think Flash has a valid place on the web, and I don't personally see it as an _us and them_ web.

Stephen Shankland, writer for CNET News got in touch and asked me to comment on an [article he was writing](http://news.cnet.com/8301-30685_3-20000037-264.html), posing me the questions in this post. Unfortunately my reply got to him to late and he had to go to post without my answers, but I thought that it would be worthwhile sharing my views via my own blog instead.

<!--more-->

> How far is HTML (and SVG and CSS and WebGL and JavaScript) to reproducing what Flash can do today?

HTML, SVG, CSS and JavaScript are very far along to replacing a lot of what I see Flash doing today - but it should be noted my browsing style is general usage, rather than gaming or interactive videos - which Flash is good at.

WebGL is very much at an early stage in it's development, only really (currently) appearing in the nightly builds of Webkit and Firefox, equally I've seen videos from Mozilla putting WebGL on to a Nokia device with no optimisation and it being able to render pretty well.

There's lots of examples of apps and effects that have been achieve using Flash in the first decade of this century, but today we can build these using Open Web technologies. This ranges from the simple image galleries to full fledged word processors. Adobe released Buzzword which relies on Flash, but on the other side we have Google Docs which relies entirely on the Open Web.

> Would you like to see Flash replaced by HTML?

I personally don't think HTML will replace Flash. I think HTML5 and the Open Web will replace Flash where Flash has been used as a stopgap. sIFR is used to bring "custom" fonts to the browser, but now we have really good support for native custom fonts via the CSS fonts module, and products like TypeKit and FontDeck are making it easy for web authors to include those custom fonts without the need of Flash.

The native video element will (eventually) allow us to drop using Flash for video. Flash has done an awesome job of pulling the braces up on browsers for the last decade, and we've needed it, but Flash is so much more than just video or font rendering. I think the smart developers aren't won't be worried about native browser functionality making Flash redundant for noddy tasks, no doubt they'll be thankful to not have to build _another_ video player.

As much as I'd like to see Open Web technology do everything, I still think we're a long way off HTML being able to able to natively replace applications such as [Aviary](https://web.archive.org/web/20100206162341/http://www.aviary.com/) and games like [Bow Street Runner](http://channel4.com/bowstreetrunner).

Equally, as I mentioned before SVG is one technology that has come along, and with the help of the svgweb JavaScript library, SVG works in IE. This library of course gets IE to support SVG via Flash. It translate the SVG markup on to a Flash canvas proving that Flash still has a place on the web as a bridging technology as well as it's intended use.

> How serious do you think the H.264/Ogg Theora matter is with the HTML5 video codec?

It's hard to say. Personally it doesn't make much difference to me if I have to encode once, twice or three times. Encoding is a background task so I set my converter off when I produce my screencasts and after an arbitrary amount of time I'll have some files to upload - obviously if you have masses of video to encode the disk usage is going to be a possible issue for you.

The problem lies with patents, which is why Firefox and Opera won't implement H.264 - but the politics and patents are for smarter people than me. There's also the fear that we as content producers could be liable for license costs to the patent owners of H.264.

On the other hand, the company that own the patent for H.264 has elected not to collect royalties until 2016 - when they may again choose not to collect royalties. Flash developers have been using H.264 for some time already and there hasn't been any retribution for them, but for now I'll be producing both H.264 and Ogg Theora encoded content.

I'll be watching this topic closely to see how browsers deal with the two codecs.

> As HTML etc. gets what Flash has today, do you think Flash will move upstream and remain relevant, become optional, or what?

I think two things will happen. Firstly I do think that Flash will move (or remain in some cases) upstream, and continue to push what's capable within the browser. Gaming is a great example of an arena that Flash excels at. The second thing I think we'll see is Flash developers taking the progressive enhancement approach to applications, relying more on HTML based solutions and enhancing upwards using Flash - Jeffrey Zeldman posted a great article recently [suggesting exactly that](http://www.zeldman.com/2010/02/01/flash-ipad-standards/).

> How difficult is it for a Web developer today to use the fragmented Open Web standards vs. the more consistent Flash?

I don't think it's too hard at at all, but it really depends on what technology you choose. Web Storage has pretty solid support in the latest browsers (if not the nightly builds), but it's relatively easy to patch missing support just using JavaScript which would map sessionStorage to the [window.name hack](http://ajaxian.com/archives/whats-in-a-windowname) and localStorage to cookies.

Geolocation can be detected and made use of if it's available, whilst those without the functionality can still map their position using something like Google Maps or a text field, thus taking a progressive enhancement approach.

Offline applications on the other hand can't be achieved if the technology isn't available - so it really depends on the application, it's use and whether you have a specific platform in mind for deployment (which generally I wouldn't encourage, but we know it happens).

Flash developers definitely have an easier time when it comes to deployment environment - in fact I've met a number of Flash developers now that said they made the shift from JavaScript and HTML years ago to Flash because of the appeal of a single environment: the Flash runtime.

> Anything else on the subject?

As I said at the start of this post, I don't see this as an _us and them_, Open Web and Flash. I do see HTML5 plugging the areas that have been held up by Flash for the first decade of this century, and there are other areas that HTML5 supports that Flash doesn't - but Flash could even make use of, such as Offline Applications.

It's an exciting time on the web again where browsers are implementing features that make it an even more powerful platform to develop on. I for one, am keen as mustard to get building with the new shiny toys they're giving us. Equally, I'm certain Flash will continue to be used to build awesome shit (and probably some not so awesome shit) for a long time yet.
