---
title: On compressing 32 character uuid
date: '2017-10-16 19:51:57'
modified: '2017-10-16 21:03:57'
complete: false
inprogress: true
tags:
  - code
draft: true
---
# On compressing 32 character UUID

TL;DR: I did a bunch of tests to see if I could compress a 32 character UUID down. I managed to half the length, but really it was utterly pointless, and ultimately due to the context: it really didn't make things easier.

<!--more-->

Working on a project where I wanted to export the data to a gist, the unique identifier returned by github was a 32 character UUID (a unique identifier made up of hex values). 32 characters I felt, for this mini project, was a bit long. So can I compress it?

## Options

I know a _little_ about compression, but not enough to know off the bat which is the right method, and most effective for my string. Here's a quick overview of the initial "compression" methods that sprang to mind (airquotes on compression, because I'd take _easier to read, but longer_ over a 32 character uuid):

- Base64: almost guaranteed to produce a longer string, but it does ensure portability in a URL since it uses URL safe characters<sup>&dagger;</sup>
- Huffman coding: points for buzzwords, though I didn't know how it worked, so I get to learn
- LZW compression: I've used this in the past to encode strings through proxies
- Brotli: I'd heard of, didn't really know what it was, but turns out it's a strong Google compression that uses techniques from both Huffman coding and LZW and it's own added spice
- Something made up…it's _only_ 32 characters, how hard can it be!&zwj;<sup>&dagger;&dagger;</sup>

<small>&dagger; _I think_.<br>&dagger;&dagger; …and so I lost 2 days.</small>

## Base64

Base64 is great for URL friendliness, but based on experience, it nearly always produces a larger result that the source. That's to say: it's not compression at all: base64 never claimed to be.

What's special about base64 in particular, is that it's good at converting non-textual content into text based content which web pages and URLs typically need to be. So it's entirely possible that _if_ another method can compress the 32 characters right down, it may need to be encoded using base64 be usable in a URL.

**32 chars via base64 = 44 chars**

## Huffman

Super interesting to me as someone who wanted to learn computer science, but ended up doing Computer Information Systems Design (that's to say: I failed to to get into Comp Sci at uni!). A pretty efficient method for creating an encoding table that means that most frequently occurring characters compress into single *bits* of data. ie. if the number 4 appears in my string 10 times, instead of being 10 bytes long (and thus 10 characters), it becomes 10 bits long, which is 1 byte and half a "nibble".

There's lots of great tutorials and [videos](https://www.youtube.com/watch?v=ikswC-irwY8) on the web, but if you're anything like me, be warned that you may fall into a rabbit hole of Huffman coding, binary heaps, priority queues and more!

Although the compression is good, you also have to include the [Huffman tree](http://huffman.ooz.ie/?text=65a1a72f77abf9fdfae7ddbcf8f3b3b7) in the payload so it can be used to decode. There's techniques to minimise the impact of this, but against a string that's 32 characters, it doesn't end well.

