---
title: How to pad a file with specific bytes
date: 2020-06-17
tags:
  - code
---

# How to pad a file with specific bytes

On my ever onward quest for new useless knowledge I wanted to know how to change a file's length and pad it with a specific byte value, on the command line.

Funnily enough, I know how to do this with JavaScript in the browser pretty easily (for me), but the challenge was using tools fit for the job (and I didn't really want to use a JS engine to do the job).

<!--more-->

## dd my old friend

[`dd`](https://manpage.me/?q=dd) is a command line tool that can generate files, useful in fact when you want to [create dummy files](https://remysharp.com/2007/10/29/delay-the-dom-ready-event-generate-a-dummy-file) (as I was 13 years ago… 😱).

To generate the dummy data, `dd` reads from `/dev/zero` (which gives you a stream of the null byte, `0x00`).

Using `dd` I need to:

- Copy the source file
- Add X new bytes to the end of the source file until it reaches Y length
- Ensure those new bytes are the one I defined, the null zero byte isn't good enough

First task before I use `dd` is: create a stream of the byte I want, let's say `0xFC` (252 in decimal).

## A stream of bytes

There's actually two tools I could use here. The first (and the one I'll use) is [`/dev/zero`](https://en.m.wikipedia.org/wiki/dev/zero) the alternative is to use `yes` with an argument (so `yes 1` will repeat `1\n` over and over) - but with `yes` I'd need to strip the new line, then change the `1` character.

So, pipe `/dev/zero` to `tr` and transform the zero byte into `0xFC`. Of course, `tr` doesn't do hex, it does octal (base 8), so I need:

```sh
tr '\0' '\374' < /dev/zero
```

Let's double check this is the right value, by looking at the first 16 bytes as hex:

```sh
tr '\0' '\374' < /dev/zero | head -c 16 | hexdump
0000000 c3 bc c3 bc c3 bc c3 bc c3 bc c3 bc c3 bc c3 bc
0000010
```

Urm…spot a problem? I've got `0xC3BC` as a repeating word which is _not_ what I was after. From what I could gather, this is because `tr` is used to translate strings, and the default language it's using is UTF8 which… the byte 0xFC is outside of a normal range, or, something - I'm never quite going to understand UTF8 fully ([but these two do](https://http203.libsyn.com/how-to-avoid-getting-utfd-by-text-encodings)).

The solution is to switch the language `tr` is using:

```sh
LC_CTYPE=C tr '\0' '\374' < /dev/zero | head -c 16 | hexdump
0000000 fc fc fc fc fc fc fc fc fc fc fc fc fc fc fc fc
0000010
```

That's better. Now let's pipe that to `dd`

## Generating fixed length files

My aim is to take a file that has an arbitrary length with existing data, and pad it to 16K and any padded bytes must be `0xFC`.

To create a 16K file (called `output.bin`) with `dd` using our byte, the line is:

```sh
$ LC_CTYPE=C tr '\0' '\374' < /dev/zero | dd of=output.bin bs=16k count=1
```

This means our _blocksize_ `bs=` is 16k (`dd` supports shorthand for file sizes) and we want one block of 16k. Alternatively I could have `bs=1k count=16` to make 16 blocks of 1k - hopefully you get the idea.

Except this makes a whole file, I need to _add_ to a file. This is multipart task with a calculator handy.

Instead of 16K of data, I need `16K - $currentFileLength`. To get this, I need two things: `expr` (for the maths) and `stat` (to get the file size accurately).

To test this, I use the following command:

```sh
$ expr 16384 - $(stat -f "%Dz" input.bin)
15488
```

To generate a zero byte for 15,488 bytes I'll use `dd` to fill with a blocksize of 1 byte and for a count of 15,488 bytes:

```sh
dd if=/dev/zero bs=1 count=$(expr 16384 - $(stat -f "%Dz" input.bin))
```

But this is still zero bytes, so streaming through `tr` converts to `0xFC`:

```sh
dd if=/dev/zero bs=1 count=$(expr 16384 - $(stat -f "%Dz" input.bin)) \
 | LC_CTYPE=C tr '\0' '\374'
```

Now I have 15,488 bytes of `0xFC`.

So now I need to take the contents of `input.bin` and the generated output from `dd` and concatenate the two blocks of content into a final file called `output.bin`.

That looks like this:

```sh
cat input.bin \
 <( dd if=/dev/zero bs=1 count=$(\
      expr 16384 - $(stat -f "%Dz" input.bin)
    ) | LC_CTYPE=C tr '\0' '\374'
 ) > output.bin
```

A bit of a mouthful, but it puts together all the parts, then uses stream redirection to add `dd` to the output of `cat` and the concatenated result is put in `output.bin`, which is: exactly 16K large, contains 896 bytes of the original `input.bin` data and then follows `0xFC` for all the subsequent bytes.

Ah yes, that old "command line rabbit hole".
