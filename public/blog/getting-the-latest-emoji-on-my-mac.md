# Getting the latest emoji (on my mac)

In previous years I've been a mac fan and upgraded regularly, but as the OS moves more and more towards iOS style with animations and offering little to a developer like myself, I've remained on OSX 10.10 Yosemite, whilst today it's not even called OSX, it's macOS Serria.

However, my biggest daily gripe is that I don't get to enjoy the latest emoji, and I'm often faced with tofu:

> When text is rendered by a computer, sometimes characters are displayed as “tofu”. They are little boxes to indicate your device doesn't have a font to display the text.

Finally, I have a fix.

<!--more-->

This is what my current page looked like when viewing the Unicode 9.0 emoji changes:

![Tofu](/images/tofu.jpg)

The fix is to download and install a font that replaces the name of the Apple Emoji Color font.

Once I found the right copy of the fonts online, it was straight forward - though it does mean I'm now using the EmojiOne fontset and not the set directly from Apple (but really, I don't care that much).

Firstly download the [Apple Font](https://github.com/Ranks/emojione/blob/07955d394c9f2e80dd43445fd2eb6bb4fd460d54/extras/fonts/README.md#apple-font). Then when you double click to install, you'll be prompt with a conflict. I accepted the conflict (it means both Apple Emoji Color fonts are installed, but only one is active).

Now I've got the complete emoji font set, and it means when emoji is used on a web page, I'm able to infer it's full meaning, rather than have to guess what the tofu is supposed to mean (which begs questions of accessibility, but that's for another time).

Now my emoji score card looks like this:

![Full emoji support](/images/full-emoji-support.jpg)

## Input problems

The only remaining problem is that my character map program is using Yosemite's version, which means it's missing the selections for the zero width joined emojis. For instance, <img src="/images/female-technologist-type-4.png" style="width: 22px; vertical-align: text-bottom;"> [Woman Technologist: Medium Skin Tone](http://emojipedia.org/female-technologist-type-4/) doesn't appear in my character map at all.

Entering it manually is pretty tricky too. Although I can see the unicode characters in Font Book, I can't copy from there either:

![Full set](/images/full-emoji-set.jpg)

So for the time being, I can copy from sites like [emojipedia.org](http://emojipedia.org/), and as a user of TextExpander I managed to [mangle some snippets automatically](https://github.com/remy/textexpander-emoji-snippets). So I'm most of the way to solving my initial annoyances 🦄🎉🌈
