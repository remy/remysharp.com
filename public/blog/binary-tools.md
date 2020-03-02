---
title: Binary Tools
tags:
  - code
date: 2020-03-02
---

# Binary Tools

I've been tinkering on a 6502 project during the evenings spread over the last 3 months (via the excellent [Ben Eater](https://www.youtube.com/watch?v=LnzuMJLZRdU&list=PLowKtXNTBypFbtuVMUVXNR0z1mu7dp7eH) series) and in doing so I've started to build up a series of tools I use with binary.

_(This post is probably only useful for future Remy)_

<!--more-->

I should add that I'm not sure how much of this will work on different systems and availability of tools, but I'll link where possible.

## hexdump

[hexdump](https://www.mankier.com/1/hexdump) - usually with `hexdump -C file.bin` to view hex and ascii output. Also compresses repeating patterns seen below where the line is simply `*`.

Really simple to use tool for viewing source hex on the command line.

```bash
hexdump -C rom.bin
00000000  a9 ff 8d 02 60 a9 55 8d  00 60 a9 aa 8d 00 60 4c  |....`.U..`....`L|
00000010  05 80 ea ea ea ea ea ea  ea ea ea ea ea ea ea ea  |................|
00000020  ea ea ea ea ea ea ea ea  ea ea ea ea ea ea ea ea  |................|
*
00007ff0  ea ea ea ea ea ea ea ea  ea ea ea ea 00 80 ea ea  |................|
00008000
```

## xxd

[xxd](https://www.mankier.com/1/xxd) can dump hex from binary, but also convert hex to binary.

This is used for dumping the _entire_ hex content out. It also has a _revert_ feature that lets me generate binary files from strings of hex. I've been doing a bit of work around unpacking old file formats, and generating snippet of binary data is useful.

Below you can see my generating a binary snippet for a ZX Spectrum+ .bas file header. The first column needs to be the offset (`0` in this case).

```bash
echo "0 504c 5553 3344 4f53 1a01 00e7 0000 00" | xxd -r | hexdump -C
00000000  50 4c 55 53 33 44 4f 53  1a 01 00 e7 00 00 00     |PLUS3DOS.......|
0000000f
```

I could capture this output using `… | xxd -r > out.bin` and then process the binary elsewhere.

## diffing binary / diffing hex

Using `xxd` above, I can combine diff tools to identify changes between binary (typically where I've got a typo and generated a slightly different file).

```bash
$ diff -u <(xxd -c 32 a.bin) <(xxd -c 32 b.bin) | diff-so-fancy
```

I'm adding [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy/) into the mix to clearly highlight the changes in the file (the `diff -u` flag is needed to make this work properly).

![Visual hex diff](/images/hex-diff.png)

In the diff above I can clearly see that the first block starts to match, but the does not.

## Honourable mentions

- [od](https://www.mankier.com/1/od) - very similar to `hexdump` and the tool I _used_ to use to [debug text files for rogue characters](https://remysharp.com/2018/10/29/shell-debugging-vanishing-text#debugging-invisible-characters)
- [strings](https://www.mankier.com/1/strings) - a great little _goto_ when I'm looking for text inside binary files
