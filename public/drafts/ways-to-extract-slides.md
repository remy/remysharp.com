# Ways to extract slides

When you run events, once everything is over, it's nice to be able to share the slides both as a single link but also for the video production.

I've personally seen a huge range of slide decks, platforms and delivery formats and with ffconf over last week I had to collect and normalise all the speakers' presentations into a format our video editor could work with.

So this post is reminder for my future self on how to do that.

<!--more-->

## Tools required

Keynote, Speakerdeck, Powerpoint, Google Slides and more export directly to PDF. This is worth doing because firstly it gives me a single downloadable that visitors can use, but it's also a great format for extracting individual image slides.

Along with these PDFs, I'll need the following command line tools (on my mac, installed using `brew install …`):

- `ghostscript`
- `imagemagick` (provides `convert`)
- `wget`
- potentially `jq`

## Images to PDF



## PDF to images

```bash
$ convert slides.pdf slides.png
```

## HTML slides to images

Using the Puppetter project and a relatively small amount of code, it's possible to grab screenshots of each stage of an HTML deck and save those as images.

