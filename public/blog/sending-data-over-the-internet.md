---
title: 'Sending data over the internet [spectrum]'
date: '2021-02-05'
draft: true
tags:
  - code
---

# Sending data over the internet [spectrum]

As I've been tinkering on my Marbles port to the Spectrum Next I've been wanting to support players submitting their high scores and being able to download "world high scores" with the _seed_ to attempt the game themselves.

Sending data over the internet is not straight forward on the Spectrum so this is my explainer, squarely aimed at NextBASIC (and not machine code).

<!--more-->

## Caveats

There's an untold number of caveats, perhaps because I've not tested enough, or missed cases or the internal ESP chip hates me, but they exist.

1. Sending data does not work every time - from experience I can _rely_ on it on failing, so I need to be prepared to _retry_.
2. SSL and HTTPS are not an option. The crypto required for SSL alone will take up way too much time on the spectrum, that and the ESP chip can't handle it properly. Equally HTTP 2.0 is a no go.
3. HTTP in general, I've found (and your milage may vary), is not reliable. A GET works, but a POST doesn't - I'm missing something, perhaps you dear reader can solve it, but I've hit a blocker.
4. You _will_ need a bespoke server to handle the requests (which is why this is the internet and not the web).

##
