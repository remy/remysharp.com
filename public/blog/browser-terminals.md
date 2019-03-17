---
title: Browser Terminals
date: '2017-02-10 12:40:06'
modified: '2017-02-04 18:02:32'
tags:
  - web
published: true
---
# Browser Terminals

I've been working hard on my [terminal.training](https://terminal.training) video course (for anyone wanting to learn about the terminal and command line). In that, I've been doing some side research on different terminal applications, and of course…you can run a terminal in you browser…because why not!?

<!--more-->

In fact, Umar Hansa [demoed this at ffconf 2016](https://2016.ffconf.org/#optimise-your-web-development-workflow), but didn't have time to go into *how* you do this. Personally, I've tried it and it's a nice trick, but I won't be leaving [iTerm2](https://www.iterm2.com/) any time soon. Still, if the image below intrigues you, read on.

<figure>
![Terminal in the browser](/images/browser-terminal.jpg)
<figcaption>A browser, with a terminal inside it, running a site that teaches you about the terminal…<em>"Inception!"</em> I hear them cry!</figcaption>
</figure>

---

## How to run a terminal in your browser

Note that this walk through is only as good as the terminal lasts as an experiment, so if it doesn't work, check the date (this was written in Feb 2017)!

#### Step 1: enable the terminal experiment

1. You need to enable devtool experiments, so turn on this Chrome flag: **chrome://flags/#enable-devtools-experiments** (and you'll need to reload your browser).
2. Open up devtools, hit <kbd>F1</kbd> (for settings), then select experiments, hit <kbd>shift</kbd> seven times (yes, seven times), and scroll down and select "terminal in drawer".

<iframe src="https://player.vimeo.com/video/202374083" width="640" height="385" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Now you have the terminal accessible, but it'll likely say it can't connect. Shut down Chrome, and follow the next steps.

#### Step 2: run the terminal tunnel

For the terminal in drawer experiment to work, it needs to tunnel through to a local version of devtools. If that sounds funky, it's because *it is* funky. But never fear, follow these directions (or copy and paste in your terminal):

```bash
$ git clone --depth 1 https://github.com/ChromeDevTools/devtools-frontend.git
$ cd devtools-frontend/services
$ npm install
$ node devtools.js
```

#### Step 3: connect Chrome to local devtools

Now the local devtools will be running, open a new terminal window, and you'll need to fire up Chrome. These are the directions for a Mac (with some assumptions about the location of Chrome):

```bash
$ /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --devtools-flags='service-backend=ws://localhost:9022/endpoint'
```

Specifically, it's the `--devtools-flags` which tells Chrome to connect to your local terminal tunnel.

_Et voilà_, you have a terminal in your browser. I've noticed a few quirks (specifically due to how my prompt is configured), but it does work and you could, combined with workspaces, do _all_ of your development in Chrome if you so felt inclined!
