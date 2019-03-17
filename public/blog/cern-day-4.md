---
title: CERN day 4
date: '2019-02-15 08:46:06'
modified: '2019-02-14 23:02:18'
tags:
  - personal
published: true
---
# CERN day 4

Another long day from 9am to 10pm coding, conferring, braining, hacking and edging towards our goal: recreating the world's first web browser: WorldWideWeb.app.

It's amazing the speed of the progress we're making, but I feel like we get to cheat a little by leaning on the collective decades of engineering that goes into our current browsers and the language(s) of the web. What's fun is all the reminders behind glass cabinets all around us.

![punch](/images/cern-2019/punch-cards.jpg)

During our data centre visit, we were told that back in '50s, the physicists would fill suitcases with punchcards and bicycle to where the current <abbr title="data centre">DC</abbr> is and have them processed. Now data is flying at unfathomable rates to the building we're working out at.

## The "stack"

Given we only had 5 days, a huge priority for me was to ensure that the Web Team at CERN had fully configured our domain and the continuous integration process so that we actually had a URL at the end of all this.

Thursday was also a good day to start merging all the content work that the wordsmiths of the team had been working on.

By 6pm on Thursday we had just that: a git push goes to CERN's <abbr title="continuous integration">CI</abbr> process (using OpenShift), which builds a docker image, runs my build process and then connects to the service of the public facing URL (which if I'm allowed, I'll publish for Friday's post).

All the code will be in a public repo for your viewing pleasure (please try not to laugh or criticise too much - we're on a tight deadline!!!).

![The code](/images/cern-2019/code.jpg)

The code stack is as follows:

- Node for the backend
- Backend: express for http serving
- Backend: cheerio to capture proxied requests and massage into a 1990's consumable format (i.e. strip video, img, script, etc)
- Backend: tap for (limited) tests
- React for the front end
- Client: react-draggable for the windows
- Client: react-hotkeys for accelerator
- Client: react-loadable for (limited) code splitting
- Parcel for the build process
- 11ty for the content site

In a way there's not a lot of 3rd party dependencies, whilst at the same time it's still 200mb of `node_modules`. In a way, this is akin to the libraries that the WorldWideWeb browser might depend on. I was writing [Visual Basic 3.0](https://winworldpc.com/product/microsoft-visual-bas/30) around the years the WorldWideWeb was being built, and to "ship" a program, you'd have to include a 3mb .dll library (which meant spanning across multiple [floppy disks](https://en.m.wikipedia.org/wiki/Floppy_disk)). So nothing changes, eh?!

## It looks awful…which is great!

A primary goal is to replicate the user experience and the look and feel as closely as we can.

[Mark Boulton](https://markboulton.co.uk/) and [Brian Suda](https://suda.co.uk/) have been working hard at meticulously replicating the font and have even enlisted external help.

The results are superb and have brought the jaggies of the NeXT operating system to our nice modern rending engines.

That combined with the interface patterns that Angela has done, I'm now able to wire the front end up to make it look really close:

![Jaggies](/images/cern-2019/jaggies.jpg)

I've also been working on a software system that makes the menu (relatively) simple to manage and wire up to modals and actions that are supposed to occur.

One day left to get the editable aspect done, and though at 4pm I wasn't too optimistic, when I closed my laptop at 1am I _think_ it might be possible to pull off in the next 24 hours.

I'll close with this view of the DC from Tuesday. Note that the middle red pipe in the distance, _that_ block was Europe's main connection point in the 90s taking a whopping 80% of all Europe's web traffic.

![Europe's DC](/images/cern-2019/europe-dc.jpg)
