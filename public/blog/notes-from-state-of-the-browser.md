---
title: Notes from State of the Browser
date: '2012-04-28 12:57:00'
published: true
tags:
  - web
modified: '2014-09-03 16:15:12'
---
# Notes from State of the Browser

Notes/live blog from [The State of the Browser](http://browser.londonwebstandards.org/) - unedited!

## Web vs. Native - [@mahemoff](http://twitter.com/mahemoff)

"Will apps kill websites" - this month

- Facebook 2011 backing HTML5, whilst investing in native apps -
  instagram
- Instagram has no website (yet uses the web)
- Platforms, apps or otherwise, still using web infrastructure - via
  RESTful services
- Web - dev experience - boils down to view source + browser => already
  going
- UI capabilities still suck on the web - doing it consistently, with
  smooth effects is HARDDDD
- Offline doesn't matter so much?
- Dev experience can be tricky for developers - maybe not the smoothest
  or more compatible tech. ie. the localStorage "issue".
- Device integration is lacking - but will specs like WebRT solve this?
  Will Google resist these kinds of specs - why aren't they leading this
  or is there a politic play whereby Chrome Book doesn't require "apps"?

### Were WebApps are lacking

- Single sign is hard
- Intention
- Device access
- Background processing...native apps are able to proactively schedule
  task in the background - web doesn't have this at all yet
  (WebRT/thing?). Notifications / geo-fencing(?) / syncing. Background
  seems like one of the worst/highest level of requirements we need to
  compete web vs. native

### The Challenge - what we need to do

- Advisory, like html5ple.se and some guidance - it's kinda like the 90s
  again where there was a fuck load of JS libraries. Native has one way
  on the web, we have many ways and polyfills to get around issues.
- Web Apps should have support from the browser for single sign on - is
  this WebID (was BrowserID), etc?
- Developers need to contribute to "moving the web forward" - speak to
  the browser vendors. But isn't part of the problem "Fucking Apple",
  they don't talk to anyone - nor do they release at any reasonable rate
  so developers
- Think about how web vs. native - web should remember your log in,
  application state - it shouldn't appear to boot from scratch each
  time, but this is where we should be using localStorage, and back
  doesn't destroy state!!! Ajax + history api.

### Questions

- Is the point: browsers don't matter - the web does...?
- Should the browser just be the `webview`?
- "You're not on a fucking plane" - but then do all devs know how to
  build apps like gmail where it's insanely quick because they know how
  to work the mobile device?
- AppCache is not a replicatement for localStorage - far from it.
- Is there a larger problem that the browser (and a pro) exposes data if
  the user wants to get to it. It makes SSO harder because of security,
  etc?
- Web vs. Native seems like two issues: browser and the web. Browsers
  being the limitation.


## No app is an island - [@paul\_kinlan](http://twitter.com/paul_kinlan)

Overview of some technology in browsers - "we're moving faster than ever
before".

- CSS regions - makes print designers super happy - in that the reflow
  is correct.
- CSS filters - take that Instagram - using same technology as WebGL
  under the hood?
- Web Components - shadow DOM is the "component code". Web Components do
  look really interesting because we've been re-writing components all
  the flipping time, but it seems to boil down to 
- WebRTC - gives us the stream (though gUM is part of it), allows us to
  use a *stream* of video data (though god knows what format it's in if
  we wanted to capture it...).
- And a fuck load more APIs: Gamepad API, battery, pointer lock, etc.

To the point: "tunnels and bridges"...All tunnel creation is bespoke
(IRL), in that working across the web with things like oAuth is hard,
and could well go horribly wrong.

Bridges are different: common patterns are part of the process.

Future of web app dev - is "client to client" - "bridging".

### Intents

- No oAuth - because you're handing over?
- Integrating the "top 5" APIs is hard, because a) they're all fucking
  different, and b) what about when they shutdown (delicious), c) what
  about when you don't integrate the *users' favourite service*?
- Intents offers your list of services for the intent, user selects the
  service, and the service then returns the content in an open way -
  without the developer having to support all these services.
- Intent lets me send and receive => communication.
- Proposing an `<intent>` tag
- The content-type on the params determine the response kind, example: `var params = { type: 'video/mp4', data: blob, transfer: [blob] };`
- You can also establish communication channels (like P2P?) using
  `Channel` API and using ports.
- Can play today, Paul has written a polyfill with decent x-browser
  support (IE8 upwards).

### Questions

- What about defaults? Chicken and egg - the user is new, do you offer
  default services? Is this even a problem?
- How do services register their action handlers?
- Really not keen on the `action="http://webintents.org/share"` - why
  the dependency?
- Doesn't the `startActivity`/`postResponse` assume a persistent page or
  new tab or even background services? // No - it appears as just a popup, whilst my current page remains open.
- Are other browsers implementing Intents? Equally is Google starting to
  introduce it in their own apps, Google Drive for instance.

## The web as it should be - [@thebeebs](http://twitter.com/thebeebs)

- Text Shadows weren't fast enough for IE9 - the GPU was used for fonts,
  but the shadows were poorly performing (and equally on canvas - super
  poor performance even though it's all hw accel).
- First half of talk: IE sucks - yep - MS know it. IE9 is supposed to be
  the new flagship. Honestly, still lacking, but IE10 is a good second
  step.
- 8 week launch cycles with previews. 12 weeks with IE10.
- Now collaborating (not more, but for a change).
- IE10 moving to "smallest chrome" - what about "Chromeless"?
- Ironically IE10 is touch, yet IE9 isn't!!!
- Working on and contributing the CSS grid specification - combination
  of row/column. Are other browsers picking this up?
- IE10 is the delivery platform - within the browser and via the Metro
  application platform.
- IE10 appcache, data storage, etc. Basically where it should be.
- [http://thebeebs.co.uk/prepare](http://thebeebs.co.uk/prepare) - compatibility indicator via a script
  include on your site - for debugging - things like userAgent sniffing,
  etc.

### Questions

- When is IE10 going to be available on mobile?
- Once beyond the beta cycles, and in production ready, what about
  updates beyond that time? Do we have to wait another year?
- Is win.js implementing the standards - like File IO - is that going to
  use the standards, rather than the old school WSH type API - that's
  utterly bespoke to Windows?  The advantage of PhoneGap is that it
  relies on a standard, so ultimately, one day in the future, you can
  pull PhoneGap out and it should work. Can I pull out win.js and move
  to another platform?
- Touch - is this the standards based touch events?
- Debugging tools?
- Is IE10 the high street brand to the fashion industry? In that by the
  time IE10 comes out, Opera, FF and Chrome will be 12 months ahead. I
  guess this isn't a problem - if IE supports "HTML5" it means it's
  serious business - I guess good for general web sites.
- Seriously - why can't I install IE10 on my Mac directly? Or Linux?
  Sure, Apple don't port Safari to Linux, and the Windows port is pretty
  horrible, but they're arseholes anyway. // Response: No, they're
  developing for their platform - to be fair - Apple to do the same.

## Broken HTML5 promises - are we 'appy? - [@codepo8](http://twitter.com/codepo8)

- Apple is crippling the mobile browser. True, examples include WebGL,
  storage, audio, etc, etc, etc.
- Christian is asked at Mobile Congress is mostly around how do I protect
  my code, how does it compare to HTML5 - UX & performance.
- HTML5 has to be a marketing term - so it won't ever be ready because
  it encompasses a mass of technology ranging from true HTML5 to CSS to
  Node.js!
- Tooling is lacking. Dreamweaver type tools, but all the way to Final
  Cut type tools - i.e. to compose amazing interactive sites. Current
  offerings: [html.adobe.com](http://html.adobe.com) and Sencha Architech...
- Christian successfully takes the piss out of @thebeebs and @mahemoff,
  who's next?
- DRM is important to real companies. They have to protect their
  content.
- What about "native" performance? Zenga released a scroller library -
  and discussion said it works better if it was written for iOS only.
  Turned out that it was just the form value feedback that was slowing
  it down. (canvas scroller).
- Re: HTML5 is ready - did we pull it off? No, there's more questions
  than answers right now. Those answers are hard (but isn't a lot of
  this for the browsers to answer for us as developers?).
- Christian says we're just keeping ourself busy with other things -
  like demoscene or abstractions or random arguments like the
  semi-colons (2nd reference - end on 3 pokes!). Why is Google and MS
  releasing demos the canvas demos, etc. (Surely they're appealing to
  developers to get them on board).
- Talking about browsers stats. Me: honestly, these global stats don't
  matter, the client user stats matter.
- Patents: even when we can simulate or re-create the effects but
  patents are killing innovation.

But "enough with the bitching". Amen.

- Mozilla is a fully open organisation.
- "Kick ass" devtools. I hope he's not referring to Firebug because I
  really don't agree - the new devtools are a great step forward, but
  still way behind.
- MDN being supported not just by Mozilla - by people like Paul Irish
  from *other* browser vendors. An excellent web resource for teaching.
- More teaching from Mozilla and free access: mozparty, hack arcade,
  hackasourus, etc.
- [Gladius](https://github.com/gladiusjs/gladius-core) - open source (on github) Mozilla supported game platform
  (that won't be bought by another company and open!).
- C++ to JS conversion with [Emscripten](https://github.com/kripken/emscripten) (WTF!?)
- Are we mobile yet - a visualisation of current state of mobile
  support, with direct links to the bugs - so go shake a stick to get
  them fixed.
- Contributing lots of new specifications: battery, camera, vibration,
  SMS sending - and all baked in to Boot 2 Gecko.
- Christian demos a B2G which appears fast. My own copy is slow, but I
  suspect the hardware is a huge factor.
- [b2gbuilds.org](http://b2gbuilds.org) for getting nightly builds. Nexus S, Galaxy SII and
  Galaxy Nexus flash image "coming soon".
- Lots of events being run in Mozilla's open space - also open for drop
  in working.
- Wants people to make things that work.

### Questions

- Why is UX coming up? Surely the OS should provide the UX for these
  elements, buttons, etc. 
