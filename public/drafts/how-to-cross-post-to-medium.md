# How to cross post to Medium

At some point during 2017, Medium decided to pull their <abbr title="If This, Then That">IFTTT</abbr> applets that allows content to be posted _into_ Medium. Which I think is a pretty shitty move since there was no notification that the applet was pulled (I only noticed after Medium just didn't contain a few of my posts), and it smacks of "Medium should be the original source"…which may be fine for some people, but I'm expecting my own content to outlast the Medium web site.

Anyway. I got this working again with a bit of knowledge of the Medium API and working IFTTT (RSS) applets, and it would seem this would be useful to others too.

<!--more-->

## TL;DR

It's tricky to do a TL;DR as there's some setup required, but if you're comfortable:

1. Create an IFTTT webhook applet that reads a feed (your RSS feed)
2. Make a `POST` web request to [https://medium-poster.glitch.me](https://medium-poster.glitch.me)
3. Post the body of the article, and include your Medium publication Id and your Medium API token.

Full detail on each part follows (in particular, the exact format of the `POST` or how to host your own copy).

## Required tokens

To complete this process, you need your publication Id and API token from Medium.

Firstly, head over to your [Medium settings](https://medium.com/me/settings) and generate a new integration token (use any name you like):

![Medium integration screenshot](/images/medium-integrations.png)

Next you need a publication Id. To get this, you need a [new (or existing) publication](https://medium.com/me/publications) (…le-sigh). Once this is setup, you can [get your publication Id](https://help.medium.com/hc/en-us/articles/226875507-How-to-find-your-publication-ID-for-IFTTT-) by visiting your publication, and adding `?format=json` and you'll find your id under the path: `.payload.collection.id`.

Keep these values handy.

## Medium Poster Service

I've set this [up on glitch](https://glitch.com/edit/#!/medium-poster) (which also means you can peruse the code), so it means you can either reuse my version, or you can [remix your own version](https://glitch.com/remix/#!/medium-poster).

This service does two things:

1. Allows you to POST to the service, and it will forward the content to Medium (as a new draft - but you can change this too).
2. Provides a (very basic looking) UI to load an RSS feed and submit to Medium manually.

I'm going to assume you want to automate the process in a way that when you publish on your own site, and a new RSS feed item is created, it automatically posts to Medium (i.e. not the manual way described in step 2 above).

**Important:** note that my version of the glitch service will post to Medium in **draft** form. If you want this to publish, remix the code, and [edit the publish status](https://glitch.com/edit/#!/medium-poster?path=medium.js:18:29) to read:

```js
publishStatus: "public",
```

The `publishStatus` can take the following values: `public`, `draft`, or `unlisted`.

## Triggering the post from IFTTT

When a new post is published, and it hits your RSS feed, IFTTT will pick up the feed item, and post it across to our medium poster service.

Start by [creating a new applet](https://ifttt.com/create), click "this" and search for the *RSS Feed* service. Select the "New feed item" (or the other trigger if appropriate to your needs), and enter the URL to your RSS feed.

Next click "that" and search for *Webhook* action service. Then select the "Make a web request" action.

Here are the values I used for each field (note that if you're hosting your own Medium poster service, you'll want to update the URL):

* **URL:** https://medium-poster.glitch.me/draft
* **Method:** POST
* **Content-type:** application/json
* **Body:**

```json
{
  "title": "<<<{{EntryTitle}}>>>",
  "url": "<<<{{EntryUrl}}>>>",
  "content": "<<<{{EntryContent}}>>>",
  "token": "YOUR_INTEGRATION_TOKEN",
  "pubId": "YOUR_PUBLICATION_TOKEN"
}
```

A few important notes about the body request. Firstly, make sure to swap out the `YOUR_…` values with your *real* tokens you created [earlier](#required-tokens). Secondly, notice the IFTTT values have *three* angle brackets around them - this makes sure the content is correctly escaped.

Remember that my glitch service will post the Medium article in a *draft* status (so that I can manually schedule the post), but if you want to publish it automatically from IFTTT, add the following line into the body:

```json
{
  "title": "<<<{{EntryTitle}}>>>",
  …
  "pubId": "YOUR_PUBLICATION_TOKEN",
  "publishStatus": "public"
}
```

Lastly, save the applet and go ahead and post on your web site.

## Odd caveat

This entire workflow is solid, but I've noticed on the very odd occasion that glitch sometimes doesn't respond to IFTTT quickly enough, and I've read somewhere that glitch has rate limits (though I very much doubt I've hit these).

If you're seeing problems with posts being dropped, you may want to look at another hosted platform ([Zeit](https://zeit.co), [Heroku](https://heroku.com), [etc](https://www.google.co.uk/search?q=hosted+node.js+server)).

Good luck, and if you're reading this on Medium, you now know how the post got there 👋
