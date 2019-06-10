---
title: 'Slide Show Karaoke'
date: 2019-06-10
tags:
  - code
---

# Slide Show Karaoke

During a jsconf.eu break as I attempted to lighten [Katie Fenn](https://mobile.twitter.com/katie_fenn) of her npm stickers, I was unwittingly co-opted into presenting to a series of animals.

This was in fact for [Global Diversity CFP](https://www.globaldiversitycfpday.com/) which I'm probably (or certainly) not the target audience, but it was fun all the same. So then when I travelled back home I thought it would be fun to make my own Slide Show Karaoke - which is effectively what I was doing.

<!--more-->

## The spec

I figured on some basic and specific requirements:

- Images would be loaded from [Unsplash](https://unsplash.com/)
- Slides would auto progress
- A timer would show you how long you had
- Optionally: some configuration for timings and slides

I also decided that I would live code the solution (in my 1 hour [Twitch session](https://www.twitch.tv/remysharp)) and I would use [Vue.js](https://vuejs.org/) - as I'm not that familiar with the framework.

## The final product

If you've got an hour to kill, you can watch the stream on [YouTube](https://youtu.be/JedMhuaKA4g). The final version is online now and turned out pretty much exactly as I wanted.

[![Slide show karaoke](/images/karaoke.jpg)](https://karaoke.isthe.link/)

So here's the _how_.

## Tech stack

For no particular reason other that I've not played with it much, I decided to code this using Vue.js, and [Nuxt.js](https://nuxtjs.org) in particular.

I've used Nuxt on a single project before and what I like about it is that it's very specific about directory structure. For this project I'd need to install Nuxt and I'd need a `pages` directory.

```bash
$ npm init -f
$ npm i next
$ mkdir pages
$ npx nuxt # start the server
```

I'm a big fan of Next.js for React - so much so I even have [my own course](https://next.training.leftlogic.com) on it - and the appeal is the zero configuration. Nuxt runs in the same vein: no configuration.

This software doesn't need a dynamic backend, so I'll use Nuxt to generate a fully static site (and drop to [Netlify](https://app.netlify.com/drop) or [Now](https://zeit.co/now)).

## Sourcing images

Originally I thought I'd need to use the Unsplash API and require a developer key, but apparently not. Unsplash has source.unsplash.com which provides a URL to a random image.

This can narrowed by user, collection or search term.

Originally I went with search terms, starting with "cat" then trying to mix it up with "cat, business" but I became wary of potentially inappropriate imagery (which is fine for art, but less fine for events with no warning).

In the end, I [curated a collection](https://unsplash.com/collections/1816930/images-for-slide-karaoke) of images so that pool of images the slide show karaoke will choose from is pre-vetted.

When the slide show starts, I need to collect 5 (or a variable number) of images to render as slides.

## Ensuring random images

Loading 5 random images from source.unsplash.com is straight forward enough, but knowing whether they're all different requires a bit of extra code.

My process is this:

```js
const baseURL = "https://source.unsplash.com/collection/1816930/800x600?";
function getImage() {
  const url = baseURL + Math.random();
  return fetch(url).then(res => res.url);
}
```

This function's main purpose is to return the `res.url` which is the _result_ of the redirect that Unsplash is giving me. Now in my `start` method, I will initialise an array of `getImage()` promises, wait for them to settle, then check whether there's any duplicate URLs and replace those with a new request.

```js
async start() {
  this.images = await Promise.all(
    Array.from({ length: 5 }, getImage)
  );

  // quickly check and replace if there's any dupes
  const dupes = [];
  this.images.forEach((_, i) => {
    if (this.images.lastIndexOf(_) !== i) {
      dupes.push(i);
    }
  });

  if (dupes.length) {
    await Promise.all(
      dupes.map(i => {
        return getImage().then(url => (this.images[i] = url));
      })
    );
  }
}
```

_Post-code side note: re-reading this logic, I'm [not entirely convince](https://mobile.twitter.com/rem/status/1137690933376557057) it makes any difference to the success of unique images…but that's mostly because I'm easily confused._

The trick here is the array generates promises right away. I can also attach on to the end of the promise to give real-time feedback as to when images are loaded:

```js
this.images = await Promise.all(
  Array.from({ length: 5 }, () => getImage().then(url => {
    this.loadCount++; // show the user how many images are resolved
    return url;
  }))
);
```

## Animating the timeout bar

There's a timing bar that runs across the bottom. I'm not the best person at animations and though I used CSS transitions, the original code would fire a `setTimeout` every one second and change the width of the bar. This would animate smoothly over a one second period, but it would still slow down and accelerate in an odd way between each second. I wanted the total time to be smooth process.

Again, because I'm new to Vue, I've probably over engineered my progress bar timing logic, but what's important is that it works with the code I provided (which should probably be any developers' motto).

Using the [WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Web_Animations_API_Concepts) (and lots of [tutorial help](https://css-tricks.com/css-animations-vs-web-animations-api/)), I grab a reference to the DOM node, apply an animation for the `ttl` (time to live value, i.e. the slide should show for 20 seconds), and when the `finish` event fires, I pass this up to the component which tells the slide show to progress to the next image.

```js
// usage: <Progress ttl="20" v-on:finish="showNextSlide" />
export default {
  props: { ttl: Number },
  mounted() {
    const el = this.$refs.progress;
    const animation = el.animate(
      [{ transform: "translateX(0vw)" }, { transform: "translateX(-100vw)" }],
      this.ttl * 1000
    );

    animation.onfinish = () => {
      this.$emit("finish");
    };
  }
};
```

I didn't use CSS animation syntax here because I wanted some programmatic control over the duration, and I couldn't quite pull that off with pre-configured CSS animations.

## Have a play

That's it, or certainly the interesting inners of the slide show. I'm hoping to somehow roll this into [ffconf](https://ffconf.org) this year (though I'm not totally sure where), but I've even played it with my kids which I think helps them with imagination and playful ideas (where they made up a story for the pictures rather than just describing what they see).

Here's the link: **https://karaoke.isthe.link**<br>
Here's the code: https://github.com/remy/karaoke

*[CFP]: call for papers
*[WAAPI]: Web Animation Application Programming Interface
