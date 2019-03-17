---
title: Ways to extract slides
date: '2018-11-29 10:02:20'
modified: '2018-11-29 10:01:32'
tags:
  - code
published: true
---
# Ways to extract slides

When you run events, once everything is over, it's nice to be able to share the slides both as a single link but also for the video production.

I've personally seen a huge range of slide decks, platforms and delivery formats and with ffconf over last week I had to collect and normalise all the speakers' presentations into a format our video editor could work with.

So this post is reminder for my future self on how to do that.

<!--more-->

## Tools required

Keynote, Speakerdeck, Powerpoint, Google Slides and more export directly to PDF. This is worth doing because firstly it gives me a single downloadable that visitors can use, but it's also a great format for extracting individual image slides.

Along with these PDFs, I'll need the following command line tools (on my mac, installed using `brew install …`):

- `curl`
- `ghostscript`
- `imagemagick` (provides `convert`)
- potentially `jq`
- `node` (and npm which comes with node)
- Puppeteer

If you have [brew](https://brew.sh/), you can install some of the tools using:

```bash
$ brew install ghostscript imagemagick jq
```

If you have another package manager, you'll need to check how to install these yourself (I think Window's [Chocolatey has most of these packages](https://chocolatey.org/search?q=ghostscript+imagemagick+jq)).

[Node](https://nodejs.org) can be directly downloaded, and I'll explain how to get Puppeteer later in this post.

## Target output

I've had two different target file types that I've needed to generate: PDF and separate images. As such, I've listed how to generate each.

So far in my experience, it's always use to go _through_ a PDF format - this is because software like PowerPoint, KeyNote and Google Presentation all export to PDF, and the PDF also ensures a consistent frame size (i.e. if you want all your slides to be 1280x720).

## Online slide sites

There's a few hosted offerings for slides, so it's useful to know how to extract slides.

### slideshare.net

Slideshare _used_ to be the place to host slides. Then it got super gross with a tonne of ads on a single page (I think it was up to 10 and it was really hard to find the content!). Since then the site has been bought by LinkedIn and has cleaned up.

Each [slide deck](https://www.slideshare.net/remy.sharp/is-html5-ready-workshop?from_action=save) includes a direct download link. You'll need a LinkedIn account (which we all know it's technically [impossible](https://twitter.com/rem/status/623409255647969280) to not have) though.

### speakerdeck.com

This site is my personal favourite, acquired by Github (I _think_) that also allows [direct download](https://speakerdeck.com/rem/the-art-of-debugging) of a PDF from slides at the bottom of the slides.

Speakerdeck's original author is also responsible for [Grim](https://github.com/jonmagic/grim) - a ruby gem that extracts images *and text* from PDFs. I've not used it personally, but I can see how text extraction could be useful (and Slideshare also publishes their text).

### noti.st

The newest to the party, and beautifully presented. Notist gives the author the option as to whether they want to provide a PDF download of their slides.

So if it's been turned on, you can download the PDF (under the heart shaped icon), [if not](https://noti.st/jensimmons/h0XWcf/everything-you-know-about-web-design-just-changed), you'll need to download the individual slide images manually.

I'm using [jq]() to process the JSON API that Notist (brilliantly) provides:

```bash
$ curl https://noti.st/jensimmons/h0XWcf.json | jq '.data[0].attributes.slidedeck.data[0].slides | map(.image)[]' -r  | xargs -n1 curl -O
```

I'm doing a number of things here:

1. Downloading and outputting the JSON for the slides
2. Processing the JSON through jq and [transforming to a plain list of URLs](https://jqterm.com/ab24bd7da0f8d2a99f13db2cbf1807bd?query=.data%5B0%5D.attributes.slidedeck.data%5B0%5D.slides%20%7C%20map%28.image%29%5B%5D&raw=true)
3. Saving each individual URL locally using `curl -O`

Now we have an image for each slide. If the target format is PDF, we'll need to combine these into a single PDF, which I'll show you how to do next.

## Images to PDF

The `convert` tool is required. The images that were downloaded from Notist have the name format of `large-[number].jpg`. Your filenames might be slightly different, but the hope is that there's a sequential numbering.

It's not enough to pass `large-*.jpg` to `convert` as the slides can be out of order. We'll need to order the filenames numerically.

To achieve this, we'll use the unix program `seq` that generates a sequence of numbers:

```bash
$ convert $(seq -f "large-%g.*" 0 141) slides.pdf
```

The `seq` command is helping us with a few things:

1. It will generate a sequence from zero to 141 - since Notist starts their slides at slide 0.
2. The output is formatted (using `-f`), `%g` is the default number (with no leading zeros), and prints the string `large-0.*`
3. Since Notist provides both JPG and PNGs in their slides, it's important to use the `.*` glob to capture either file type before it's passed to `convert`.

The result will now be a file called `slides.pdf` with 142 pages.

## PDF to images

If however you need images from PDF, `convert` can also be used. The command is a lot simpler:

```bash
$ convert slides.pdf slides.png
```

Again, you'll need `ghostscript` installed for this to work. The 2nd argument, the `slides.png` is a template. It tells `convert` to generate PNG (and changing the filename to `slides.jpg` will generate JPGs). It also tells convert to _prefix_ the images with `slides-` (the dash `-` is automatically added).

Now running this command (assuming I've used the generated PDF from the earlier step) will give me 142 images starting at `slides-0.png`.

## HTML slides to images

HTML to static images is the trickiest conversion, as we'll need to program some JavaScript and there's a lot more moving parts - in particular any `iframes` in the HTML slides may need some preparation on your side.

None the less, we can use the [Puppetter project](https://github.com/GoogleChrome/puppeteer) and a relatively small amount of code to grab _screenshots_ of each stage of an HTML deck and save those as images.

Puppeteer requires [node](https://nodejs.org) (at least node 8, or above), once installed, node comes with `npm`. Create a new directory, and in the terminal run the following commands:

```bash
$ mkdir html-slides
$ cd html-slides
$ npm init -f
$ npm i puppeteer
```

Now create a new file called `index.js` and paste in the [following code](https://gist.github.com/remy/3c4c9f2de6a95ea83ade57fc444e672f) which I've commented to help:

```js
const puppeteer = require('puppeteer');

const content = `
/* this injected CSS allows me to hide elememts on the page */
`;

const total = 142; // total number of slides

// pages is an array of numbers, unless you need
// a single page, which can be passed through on
// the command line, ie. node index.js 120
// otherwise pages will be an array [0 ... 141]
const pages = process.argv[2]
  ? [parseInt(process.argv[2], 10)]
  : [...Array(total).keys()];

// generate the url for the slide number, in this
// case, the slides start at index 1 so I'm
// returning the correct url for the slide.
const url = n => `https://talks.zx.isthe.link/#${n + 1}`;

const getPage = async (page, n) => {
  await page.goto(url(n), {
    waitUntil: ['load', 'domcontentloaded', 'networkidle2'],
  });
  await page.addStyleTag({ content }); // add the CSS
  console.log('capture #%s', n);
  await page.screenshot({
    path: `slides-${n}.jpg`,
    type: 'jpeg',
    quality: 100,
  });
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 2,
  });

  // a promise waterfall, will get one page
  // at a time, waiting for the promise to
  // settle before running the next
  await pages.reduce((acc, curr) => {
    return acc.then(async () => await getPage(page, curr))
  }, Promise.resolve());

  await browser.close();
})();
```

Importantly, the generation process _may_ happened before the slide is fully rendered. I've told Puppeter to wait until the network has settled and the DOM is ready, but from experience this sometimes leaves one or two slides with half loaded images.

In these cases, I'll request that same slide again, using the named slide argument (i.e. `node index.js 120` to regenerate the single slide).

---

That's it. I'm sure there's other ways to generate other formats, but this is what I've used for the videos for [ffconf](https://ffconf.org) which you can see [on YouTube](https://www.youtube.com/watch?v=eiHxns7e6EI&list=PLXmT1r4krsTo5KtThq4dATD_ctsV8mdJQ) and more are being released these coming weeks.
