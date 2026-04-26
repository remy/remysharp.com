---
title: The 30 year game
draft: true
tags:
  - personal
date: 2026-04-24
---

# The 30 year game

In the coming days I'm going to release my Game Boy game called Marbles² (or Marbles Squared). It's a port of a game that I originally wrote back in 2002, but is a game that started in my life in (or around) 1996.

The development this iteration of the game, the one in 2026, took me about a week and I haven't written a single line of code. Here's how things have changed.

<!-- more -->

## TL;DR

I get it, this is a stupidly long blog post. There's no real value buried inside of it, it's pretty much entirely a story of how technology has progressed over 30 years (not really a spoiler) and my journey to evolve a game that I found in 1996.

If you scroll to the end, there's a link to the game download page.

## 1996

At some point during my days during Sixth Form (college to some, basically aged 16-18), a close friend had (some) machine (that neither of us can remember) and they let me play a game on it.

![A picture of Remy and Julie when they were just babies, both looking dreamily into the camera](/images/remy-6th-form-days.avif "Remy & Julie from their Sixth form days in the 90s")

I remember really enjoying the game. It was technically a very simple puzzle game: a bunch of balls that you would tap the matching colour groups of balls and they would collapse down into the corner. The goal being to clear the screen.

I never caught the name of the game but my dad had a [Psion](https://en.wikipedia.org/wiki/Psion_Series_3) and remembered that in the instruction manual (long gone are those times) it mentioned you could write your own software.

I'd been making little [Visual Basic](https://en.wikipedia.org/wiki/Visual_Basic_(classic)) [programs for friends](https://tweets.remysharp.com/1181605537571655681/) for a few years by then, so I decided that since I had access to the internet (of sorts) through bulletin boards I would try and build my version of game so I could play it all the time!

When I finally managed to download _and_ printed out the [documentation](https://archive.org/details/psion-sibo-c-sdk) (I remember it just kept printing and printing and printing), the very first is what hit the hardest.

SDK. This was foreshadowing. I had no idea what an _SDK_ was. Nor any of the other mass of acronyms. And software development being gate-kept by the usual nerds meant there wasn't going to be any help with the "basic stuff".

(In truth is might have been any kind of acronym, I just remember being bewildered).

Google doesn't exist yet so I tried thumbing through the documentation and spent probably weeks just going back and forth just looking for any clue that would help me get a footing so I'd have something to start with.

In the end, I got absolutely nowhere. I park the idea and put it down to lack of knowledge, and lack of experience. This was not for someone like me. This was for people who had the inside knowledge. Plus, at that age, I had plenty of other (better) distractions.

## 2002

In 1999 I started my work placement for a year as part of my Computer Information Systems Design sandwich course degree (a mouthful!). In the end, I'd never return to finish my degree and stayed on for a decade.

![Remy, just about, wearing god knows what: large Elvis sunglasses, fake elf ears, a set of flowers around his neck, a fake HEAD (of all things) and a nurses hairband - it's not pretty](/images/remy-dl-days.avif "Certainly a lot less dreamy that the 90s")

But back to '99 and the start of the new century. The company was a web agency with the boss and two students (myself being one). Along with client work, the agency also had it's own side projects, one of which was [Eurocool](https://web.archive.org/web/20011225185437/http://www.eurocool.com/palm/apps/latest/index.html) - a website dedicated to software for the Palm Pilot (they even made [BBC news](https://web.archive.org/web/20011212081559/http://news.bbc.co.uk/hi/english/events/the_launch_of_emu/the_uk_and_emu/newsid_222000/222808.stm)).

So I eventually bought myself one and through Eurocool I started notice that some of the games and some of the utilities came with source code and the source code was not huge and by this point I had learnt a lot more programming.

By that time I had tinkered with some C, worked with Java. I was writing JavaScript (JScript and VBScript). I was writing Perl and I could start to understand the functions of the source code and I went about making my first utility for the Palm pilot for me.

I started with a couple of smaller bits of software for the Palm Pilot, before I realised I could (and should) make a game

As it turns out that I'm not a very good graphic designer, so when it came to drawing circles for the Palm Pilot it was…very, very bad. The best I could do was draw squares and colour them in. So this is where the name Marbles Squared comes from (_"it's a feature, not a bug!"_).

It took me until the mid 2020 so realise that the original game from the 90s was actually [SameGame](https://en.wikipedia.org/wiki/SameGame) that I had unwittingly cloned (though only the game play mechanic, the Wiki page details the scoring system which I was never aware of).

One of the key mechanics of my version of the game was that the the random function would have a [seed](https://en.wikipedia.org/wiki/Random_seed), and that seed would make the grids being played repeatable and shareable.

My game even [turned up in American Scientific](https://remysharp.com/2007/03/23/the-day-i-appeared-in-scientific-american) (though the original article has been long disappeared sadly). After a few years, the game had been downloaded over 1/4 million times.

More importantly though, the coding part took me (probably) 3 months to go from scratch to the first version of a workable game, mostly coding late into the night because I had a full-time job (running in start-up days of getting home at 8pm and later). I'd continue to iterate on it for a further 6 months and the [last release was in 2003](https://ihatemusic.com/). If you want to try the game on a (pretty faithful) web port of the Palm Pilot, I'm hosting the [Palm version on the Marbles](https://marbles2.com/palm/) website.

## 2008

By the mid-late 2000s, I had move away from London and I joined the web scene down in Brighton. Coincidentally the iPhone had launched in 2007.

![Remy awkwardly holding his three cats, one black and white, one tabby and one long haired](/images/remy-2008-cats.avif "I remember using this as an excuse for not going out and meeting Brighton webbies")

Eventually I caved and got myself an iPhone and Steve Jobs [original vision](https://m.youtube.com/watch?v=p1nwLilQy64) was for developers to use the web and the power of the browser (sidebar: that wasn't really his vision, he just [didn't want 3rd party apps](https://www.theguardian.com/technology/appsblog/2011/oct/24/steve-jobs-apps-iphone)).

So that's what I did. I took my knowledge of Marbles Squared and the only code that was directly ported was the random function so that I could continue supporting the seed mechanic.

I also add a timer bar across the bottom of the screen (to let me play with CSS transitions), but functional it did nothing, so watching friends play the game and panicking about the timer running out was a real delight!

Developing the core of the mobile version was a matter weeks (if that) because I was breathing JavaScript daily, and that I was so familiar with how the game would play.

As with all these projects, it really wasn't the core gameplay that took the time, it was the UX around the game. The damn button in particular with the "new" `border-image` (vendor prefixed to kingdom come!) probably proved to be the trickiest parts.

A it probably took me a few weeks to finish the [mobile version](https://marbles2.com/mobile).

## 2020

In 2020, the [ZX Spectrum Next Kickstarter](https://www.kickstarter.com/projects/spectrumnext/zx-spectrum-next) project was delivered (after quite a few long years of waiting) and with the pandemic lockdown in full swing, it was time to tinker.

![Remy with his head resting awkwardly on a desk, with a spectrum, a modern keyboard, some kind of phone and various figurines from lego Batman characters to super mini Jokers](/images/remy-zxnext.avif "This was the vibe of tinkering on tech during lockdown!")

The Next came with an upgraded (and much more capable) NextBASIC (plus the crystal boost to 28Mhz made a big difference). So I set about making myself a game.

I wrote a clone of [Oh Mummy](https://remysharp.itch.io/go-mummy) that I used to play on the my friends' Commodore C64 but after that was done I turn my hand to recreating my Marbles game.

The challenge here was that even though the Next was faster than an original ZX Spectrum, NextBASIC still wasn't fast enough to do the grid traversing to workout available moves - or certainly not in a way that felt responsive.

So this meant turning my hand to Z80 assembly. I'd tinkered with the language but never had a real project to solve with it. This was perfect for dipping my toe into. Plus, there was 40+ years of experience on the web to learn from.

The bulk of the game would still be in NextBASIC but it would call out to a library that I wrote in assembly for *hard* tasks.

That project probably took me over 3 months because it was a brand new language. It was also much harder to debug. The development cycle is a lot longer compared to something like JavaScript.

But as I reach the end of that piece of work, I realised that I wanted to add a high score table.

The Spectrum Next (most times) included a Wi-Fi module, but it didn't have any native HTP protocol support so was another side quest.

I built an [HTTP client](https://github.com/remy/next-http) in assembly for the spectrum and one of my more prouder moments that my `.http` is now part of the [Spectrum Next distro](https://gitlab.com/thesmog358/tbblue/-/blob/master/docs/dotcommands/http.md), part of the default library of tools.

This would let players see a [global leaderboard](https://marbles2.com/spectrum) on the spectrum *and* share their own high scores directly from the retro hardware.

The http part was probably another three or more months, but absolutely worth it.

## 2026

In the intervening years AI has exploded as we're all well aware.

In the last few months I have taken to using LLMs to create small personal projects that serve a single purpose, a tool to calculate the distance between a and b, but also to add how long it would take me to walk or run and so on. Or maybe it would be a small song game that I would share with my friends.

About a month ago, I decided that I would take my experience of vibe coding and see if I could build the Game Boy game that I've been wanting the Game Boy version of Marles Squared (ironically I discovered, literally today, that Samegame was available on the Game Boy in 1997 - though it's very different from the game I wanted to enjoy).

![Remy standing in front of his arcade build with his Marbles Game Boy game running](/images/remy-2026-gameboy.avif "30 years later, Remy's able to play the game he wanted from 1996")

I was able to describe in detail exactly what I wanted and I was able to iterate over and over *and over* to get all the details kind of fine-tuned. It certainly wasn't just a *one shot* build me a Game Boy game.

As with all the previous iterations, the real work was in the UI.

I did however, set myself the constraint that the game **had to** fit into a 32K rom (this means it works on a cart that doesn't have an MBC - memory bank controller - chip - which is what allowed games to grow up to 8MB large).

The LLM (Claude Code in my case) was also vital to really quickly turning around tooling that helped me in the development process. Tools to slice my [graphics into tiles](https://tools.remysharp.com/gb-tile-converter/) or to [visualise tile data](https://tools.remysharp.com/gb-tile-visualizer/) inline to code, or to [convert fonts](https://tools.remysharp.com/gb-font-extractor/) (for variable width fonts which I didn't use in the end due to byte size limits).

I was also able to take an existing rust implementation of a Game Boy emulator and layered on an MCP server so that that Claude Code could test, screenshot and probe the memory of the game to see if it was doing what I needed to do.

But the whole process was me just talking back and forth to Claude code in particular to get this game built and the vast majority of it took about a week.

---

So in the 30 years that's passed I've gone from taking weeks and weeks looking at documentation and getting nowhere to taking a week to build a fully working piece of software that suits all of my requirements.

But the reality isn't as straightforward to say you can just magic up anything you want. My advantage I have is that I've got decades worth of experience in software development. I also have an intimate understanding as to how this game is supposed to work.

As an experiment I tried to vibe code another game. Our family was playing [100 Jumps](https://100jumps.org) and I thought it'd be a good candidate for a Game Boy game.

The source code is online, and on the surface it seemed pretty straightforward to me to re-use the techniques that I was using to develop Marble Squared.

Except what happened is I kept iterating on something that was awful. The physics were wrong. The movement was wrong. The graphics were bad. No matter how many times I tried to iterate and even reset, it just didn't come out feeling like a decent experience.

I've come to realise that the reason for this, is because of where my experience lies, and in particular my intimate understanding of how my *own* game works. This knowledge allowed me to carefully plan out the development, to know where all the pitfalls were ahead of time, which I simply didn't have for 100 Jumps.

I think we're starting to see in the tech industry that the pitch that AI is here to replace our jobs isn't entirely true. In fact, a lot of us have known for decades that the real skill isn't in producing code, but actually understanding functionality and translating it to the real world.

---

If you made it this far, thank you for reading. If you simply skipped from the top to find the download link, I appreciate you too 😄

You can download the game over on itch, and if you fancy your chances, you can submit your high score via the [Marbles website](https://marbles2.com/gameboy).
