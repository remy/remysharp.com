---
title: "Should we ignore video for Safari?"
date: 2010-06-30 15:22:26
tags:
- web
---

# Should we ignore video for Safari?

So I'm thinking out loud here, like a brain fart, but with an actual thought.

VP8 and the webM video format. It's going to be implemented natively in Chrome, Opera and Firefox. IE9 will support webM if the decoder is installed, but won't ship with it natively. Flash will provide the webM decoder, so if the user has the latest version of Flash installed, webM will work in IE9 - a fairly likely case since watching video is something that's typically done at home on the machine the user will upgrade.

So then there's Safari, which as far as I know, won't support VP8/webM.

But Safari? In the leader board of usage stats, Safari only _just_ punches above Opera in 4th place with around 2-3% market share.

If IE had 2-3% market share we wouldn't even bother testing our pages in IE - it just so happens Safari is the default (and a pretty good) browser that ships with a geeks favourite tool: the Mac.

So, with Safari having such a weak market share, should we really both even encoding h.264?

Perhaps just supply a webM video and be done with it.

**[Bruce adds/corrects](http://twitter.com/brucel/status/17422580379)**:

> @rem Flash won't support webM (=VP8+vorbis in MKV). It'll support VP8 (no Vorbis). But Goog will find a way to get codec onto machines.

For this conversation, I'm setting aside the discussion of mobile support - that's an entirely different post.
