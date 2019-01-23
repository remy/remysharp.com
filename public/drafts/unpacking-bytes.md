# Unpacking bits

Over the last few years I've been playing around at the byte level with JavaScript, processing, parsing and manipulating bits and bytes for projects like my [ZX Spectrum loading screen talk](https://www.youtube.com/watch?v=lQMcZtiaD0A).

In a previous life I was a Perl developer, and there were a couple of (probably overly) clever functions that were rarely used called `pack` and `unpack`. They were primarily for helping with data transfer across systems. How this applies to my own problem solving is that `unpack` could take a string template and some raw bytes, and the output would the bytes nicely mapped out to the data structure I wanted.

So I (sort of/mostly) ported it to JavaScript.

<!--more-->

## My common use case

Frequently with my byte-based hacks, there will be a specification describing a header structure for a file type, and extracting that in JavaScript can be a hassle.

For example, the MP3 ID3 metadata is described as:



## Perl's unpack vs. my unpack

The Perl functions have **a lot** of support for different data types and doing clever things like include sub-templates, checksum features and a little more. I've ported a large chunk of these features, trying to map the original implementation, but not absolutely everything is replicated. Side note: the project is [on github](https://github.com/remy/unpack), so if there's something you'd like to see included, please send a pull request or file an issue 🙏

I decided to, for now, only focus on `unpack` since I wanted it my work.