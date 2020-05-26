# New bytes from TextEncoder

I've been working a lot with binary data and [doing conversion](https://twitter.com/rem/status/1257422542723260417) in JavaScript and recently converted a byte array from 8 bytes to suddenly 20 bytes.

Surma and Jake were kind enough to deep dive it in their [203 podcast](https://developers.google.com/web/shows/http203/podcast/), but it boils down to this:

> [Remy] had a byte array, he decoded it he re-encoded it and suddenly the string got longer and that's because the original byte sequence that he put in contained invalid UTF-8, so each invalid byte was turned into a question mark at a box, which in turn when re-encoded into UTF-8 turns into **three bytes** and so that's how the byte array got longer.

So, the question mark in a box, � is 3 bytes [specifically](http://www.cogsci.ed.ac.uk/~richard/utf-8.cgi?input=%EF%BF%BD&mode=char) `0xEF 0xBF 0xBD` and JavaScript is going to _encode_ into this character if it encounters a non-UTF8 character, like my original string.
