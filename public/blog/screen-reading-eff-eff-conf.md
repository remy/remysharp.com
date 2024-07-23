---
title: 'Screen reading eff eff conf'
date: '2024-07-23'
tags:
  - web
---

# Screen reading eff eff conf

In a recent (personal) audit of accessibility and continued struggle to get my head around Voice Over (for macos), I remembered that the spoken sound of "ffconf" (as I'll usually display it) is "ef-conf" all sounded out in two syllables (it's hard to explain). So I wanted to revisit if it was possible to have a screen reader pronounce it the way _I wanted_ and keep the visual style (as it's a brand as lowercase).

<!--more-->

## Testing

Thanks to kind people on Mastodon I was pointed in the right direction of testing. Pairing Safari with Voice Over (when I was originally trying to use Firefox), and then JAWS and Firefox on Windows I was able to test a number of different iterations.

The original "ffconf" sounds like this:

<audio preload controls src="/images/bad-ffconf.mp3"></audio>

An extremely soft "f" at the start and then it peaks in to "Conf". Which isn't ideal.

The pronunciation I was after was "F F Conf" (which also looks terrible written down). This is what it should sound like:

<audio preload controls src="/images/good-ffconf.mp3"></audio>

I also tried a number of variations on the text (along with some gracious help from [Adrian Roselli](https://adrianroselli.com/)):

- Mixed case: `FFConf` - this works perfectly (when read out), but visually doesn't match what I needed.
- Using aria-label: `<span aria-label="FF Conf">ffconf</span>` - made no difference, but actually broke the reading up of the sentence so the screen reader would stop before the span, then read the span, then continue.
- Using ABBR: `<abbr title="FF Conf">ffconf</abbr>` - the abbreviation element isn't used by the screen reader in this case.
- Using space and CSS: close
- Using `aria-labelledby`: `<span aria-labelledby="Ref Rest"><span aria-hidden="true">ffconf</span><span id="Rest"></span><span id="Ref">f f conf</span>` - works well but still breaks up the reading

I also tried a number of joiners - none of which made a difference, it resulted in the same original "fConf" sound.

- Zero non joiner: `f&zwnj;f&zwnj;conf`
- Zero joiner: `f&zwj;f&zwj;conf`
- Zero width: `f&#65279;f&#65279;conf`
- Zero width no break space: `f&#8203;f&#8203;conf`

Here's a video with the audio of Voice Over and Safari:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/xtCsS1ITd-g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

If that doesn't work, am I just doing it wrong?

## Am I doing it wrong?

Adrian has an excellent post entitled [Don't Override Screen Reader Pronunciation](https://adrianroselli.com/2023/04/dont-override-screen-reader-pronunciation.html), and this made me think a lot about someone who is using a screen reader is going to (I suspect, or hope) hear the "f-conf" and either assume it's the screen reader falling a little short, or that the event is actually called that (which… does it even matter)?

There's also how other people write FFConf and how that might appear on blog posts or social media - areas that I can't control.

Should I just keep it as "ffconf" and accept it _sounds_ weird, or normalise on FFConf which pronounces correctly, but (to my eye) looks weird (like it's FFC and some other text).

…or is there one last trick in the bag?

## Probably overkill, but I'm happy with it

What if I used font ligatures? Sort of like the text is akin to HTML and ligatures are akin to CSS; the structure remains the same, but visual design has flourishes.

I could create a ligature for the sequence "FFC" and (simply) show the "ffc" glyphs.

The web tool [Glyphr Studio](https://www.glyphrstudio.com/app/) was perfect for this. I could upload my font, create a new ligature in the tool, carefully lay it out (and importantly ensuring the ligature's width is correct).

![Screenshot of Glyphr Studio and editing a single ligature](/images/glyphstudio.png)

As someone who had never really messed around with fonts, I found this tool particularly easy to use to get the result I needed. Once I'd downloaded the `otf` file, I then converted it to the `woff` and `woff2` I needed and it's now up on the web site.

The end result, I think, is perfect:

![A screenshot of the FFConf web site and the DOM inspector open showing the text verses the visual representation of the text](/images/ffconf-spoken-good.png)

It correctly reads as "FFConf" and visually it's "ffconf".

Though I did later spot that when I had written "FFCONF" (usually linking to other people's posts), the text then appeared as "ffcONF" which was double weird! So I also have an "FFCONF" ligature that maps to "ffconf" to solve this too (a bit whack-a-mole, but hopefully that's the only mole).

## What about other places?

Such as the `title` tag, or even the event sites like this [year's ffconf](https://2024.ffconf.org/)?

Well, I've just had to accept that it doesn't need to be… whatever "pixel perfect" is in the audible world! In fact, some places we use CSS to transform to uppercase, which Voice Over will sometimes read as "f-conf" and sometimes read as "F F C O N F".

It's the little battles that are fun.