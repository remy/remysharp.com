# Fonts, Third Parties and Scripts

Last night I was searching for some information and found a DigitalOcean help article. Except, instead of being exactly what I needed (as the Google search suggested), I was greeted by a blank page...and a long wait...

My internet was fine, but for a short time, TypeKit's CDN was having outages, but what has that got to do with DigitalOcean?

<!--more-->

Here's what I saw (note that this effect is emulated by re-routing TypeKit):

<iframe width="1280" height="720" src="https://www.youtube.com/embed/G0hVryUchA8" frameborder="0" allowfullscreen></iframe>

## What is the issue

What you're looking at is a blank page, for as long as it takes for the third-party to return.

The reason it's blocking rendering is because the fonts are loaded using a `script` tag in the `head` element. Scripts in the head have been