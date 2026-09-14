---
title: 'AI for alt text?'
date: '2026-09-12'
draft: true
tags:
  - web
  - a11y
  - ai
---

# AI for alt text?

I'm in not doubt this topic has been covered to within an inch of it's life, but I _am_ going to throw my hat in and talk about my recent experience comparing Big Tech AI to locally and ethically sourced^† image recognition, and share my mental process.

<!-- more -->

On social media I've always included hand written alt text for images that I've attached to posts. Even back in the days of Twitter. I do like that there's an option on BlueSky and our Mastodon instance that _requires_ alt text before posting.

I'm sure many of you know, but alt text is _alternative_ text that a screen reader would use in place of being able to see the image.

For me personally, I'm always thinking of an individual whom I know uses a screen reader. Whether they even read what I write is inconsequential. This is why I'd been adding alt text to my social posts for many years.

## A new perspective

It was during [Léonie Watson's talk at FFConf in 2024](https://ffconf.org/talks/2024_l%C3%A9onie/) that she described an example of where AI as an assistive technology really shone.

> ...include real example

I hadn't considered how something that I'd read as verbose is actually rich and useful.

Even though I'd been adding (what I'd consider "rich") alt text on social post, I absolutely wasn't doing that historically on my own blog, not the FFConf.org articles (where posts will often include images).

So earlier this year, for the FFConf articles and newsletters I'd been dropping any images into Google Gemini to ask for alt text. Read on.

## AI for alt text

When I've used the AI service for alt text, I'd rarely paste it verbatim into the content of the post. I'm not sure I ever have - but I'm not 100% certain.

One import part of why I wouldn't use it without editing is that the AI doesn't have the context that I have. I'm not sure how I'd give the context to the AI, but it's not needed. It doesn't take much for me to make changes or use the text as the starting point for the alt text.

By context, I'm always (mostly on autopilot) thinking: why have I added an image? What purpose does it serve? Why _this_ image?

Equally this allows me to ask: should it have alt text or should it be empty - ie. it adds nothing to the content and it's purely decorative (though in our newsletters this never applies).

But should I backfill all my posts to add alt text? [Jeremy's excellent post on his approach](https://adactio.com/journal/22657) to adding alt text to thesession.org helped me take the next step in approaching this problem.

## An local approach to AI

Allow me a mini side note: I really don't like using "AI" as a term, it's reductive and mostly horseshit. If I'm using an LLM, I'll say so.

So when I dropped the image into Gemini I know there's an LLM parsing my input text, but then there's image recognition and categorisation, which, to my mind doesn't carry the same baggage as a Big Tech large language model. Except, of course, they did go ahead and slurp up images without permission or credit, the same way they have done with text.

Which brings us to local models which explain and disclose their training data.

Jeremy did the hard work in identifying models that were [trained on Creative Commons images from Flickr](https://aiwiki.ai/wiki/coco_dataset#image-collection) images.

The next step is to run the models locally including the text generation. This puts the energy usage squarely in my control (and there are [some frightening articles](https://www.politico.com/news/2026/09/10/sam-altman-pitches-utilities-on-ai-grid-defense-01070425) on energy usage from AI companies).

With that, I wanted to share and compare the output for an image I'd used recently.

![](Image of the kid)

Gemini gave:

> Silhouette of a long-haired person stepping across rocky tidal flats along a coastline under a vivid orange sunset sky

[GIT](https://huggingface.co/microsoft/git-base) gave:

> A woman running along the beach at sunset

As a different test, I tried [Florence-2 (detailed)](https://huggingface.co/microsoft/Florence-2-base). This model though uses LLM for the categorisation (if I managed to understand correctly), that's to say, the provenance of the data is a closed box (again, if I understood correctly):

> The image shows a woman walking on the beach at sunset, with the water lapping against the shore and the hills in the background. The sky is a beautiful mix of oranges, pinks, and purples, and the sun is setting in the distance.

Obviously more models are going to give different types of results, but I was more interested in trying to move to something close to an "ethical source".

The problem is that ethical and AI (or rather, what we colloquially refer to as AI) don't sit cleanly or clearly at all.

Even the GIT mixes is in sources for training - which means (again, if I understood) that COCO is one part, but there are other sources that aren't from Flickr CC licensed trained data.

I'm reminded of a quote from [The Good Place](https://en.wikipedia.org/wiki/The_Good_Place):

> Your Honour, I once stood in front of you and said I thought there was something wrong with the points system.
>
> I finally know what it is. Life now is so complicated, it's impossible for anyone to be good enough for the Good Place.
>
> I know you don't like to learn too much about life on Earth to remain impartial, but these days just buying a tomato at a grocery store means that you are unwittingly supporting toxic pesticides, exploiting labour, contributing to global warming.
>
> Humans think that they're making one choice, but they're actually making dozens of choices they don't even know they're making.
>
> [citation: Michael from the Good Place](https://tvquot.es/the-good-place/quote/1eu9e8phm/)

What's funny is that I know there are some people who will read this post and respond with "just don't use AI" because it's not ethical. By the explanation above you'd be right to say _any_ AI would affect your points getting in to The Good Place.

But so are so many other things…like, everything (spoiler: it's why people weren't getting into The Good Place).

---

Returning from that tangent, I do think that local generative text from images is a viable solution to backfill images on a large site. Indeed, very much what Jeremy was trying to do (after also calling to his community for help).

On the macro scale, such as our weekly newsletter, I think I'm personally better off using my own composed descriptions - I enjoy writing the alt text for social posts, so there's nothing much different in writing it for newsletters.

Whether I go and backfill alt text on this site… I'm unsure. I'm not sure it's worthwhile (based on traffic), but instead I look at posts that still get traffic, review if they use images and review if the alt text can be improved (quite likely).

This post was originally supposed to be a simple comparison between hosted AI and local models, but I ended up spending hours trying to wrap my head around how models were trained and if there was such thing as an ethical source for image to text - purely from an academic perspective.

It also doesn't help that writing about AI, in a balanced fashion is such a minefield - many of our community are divided over where they stand and taking hard perspectives (you're going to be jobless if you don't use AI, you're a fascist if you do use AI) is doing no help to new people coming to the community.

Still, writing this out has helped _me_ and clarified how I feel about alt text and how I'll approach it.