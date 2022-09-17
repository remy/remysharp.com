---
title: 'VS Code using all of the CPUs and how to fix it'
date: '2022-09-17'
tags:
  - code
---

# VS Code using all of the CPUs and how to fix it

Originally I used [TextMate](https://macromates.com/) (well, "originally" I used [GWD](http://gwdsoft.com/), but let's not go back that far). Then, I don't know why, I jumped ship to [Sublime Text](https://www.sublimetext.com/) (which is still excellent), I dabbled with [Brackets](https://brackets.io/) and [Atom](https://atom.io/) but eventually landed on [VS Code](https://code.visualstudio.com/).

I've been using VS Code for a lot of years (I tried to work it out), but a problem has been reoccurring over and over: VS Code is eating my CPU. It's a big jump to return to Sublime, and until today, the prospect of finding the issue was…daunting.

<!--more-->

**TL;DR:** (yes, I ramble): use "Start extension bisect" in VS Code, it'll take less than 5 minutes.

## This is what I'm talking about

![High CPU usage in vscode](/images/vscode-cpu.png)

This is frustrating because it slows down my development pipelines but also the constant whirring from my laptop worries me as to more damage that I definitely don't want to incur.

Obviously my first port was to complain (on [The Complaining Platform](https://twitter.com/rem)), to which I got a reply to try to report the issue.

The problem is, using "Open Process Explorer" (which I'd often do and the start killing processes repeatedly) would only show the "extension host" repeated many times chewing through the CPU.

The follow up reply was to use a bisect approach to debug exactly which extension caused the issue.

Originally I thought this was going to take half a day (or at least an hour or more) but wow was I wrong.

## Extension Bisect

Open the command palette (cmd+shift+p is my mac keyboard shortcut) and type "bisect" for "Help: Start Extension Bisect".

This then automates the entire process. It took me less than 5 minutes to find the extension that was causing all my headaches for months.

What's going to happen is that the utility is going to disable half of the extensions (temporarily) and restart VS Code. In my case I was "lucky" enough to have the offending extension consistently spiking the CPU.

The extension then asks if VS Code is behaving now or if it's still bad. Depending on your answer, it'll continue to bisect the extensions until (they estimate after about 8 times) you'll be left with the single offending extension:

![The bisect prompt](/images/vscode-bisect.png)

Somehow I have 174 extensions, which with the prospect of doing this manually was terrifying. The extension bisect, because it's entirely automated, it tracks what it disabled, it tracks what the abort state is, and it means that it was incredibly quick to resolve.

In my particular case, the problematic extension was a [settings sync extension](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) that I had installed before VS Code did it natively, but your own problem will likely be specific to you own set up.
