# How tabs should work

Tabs in browsers (not *browser tabs*) are one of the oldest custom UI elements in a browser that I can think of. They've been done to death. But, sadly, the majority of times I come across them, the tabs have been badly, or rather *partially* implemented.

So this post is my definition of how a tabbing system should work, and *one* approach of implementing that.

## Requirements: what makes the perfect tab?

- All content is navigable available without JavaScript (crawler compatible and lo-js compact)
- Aria roles
- The *tabs* are anchor links that are:
  - Clickable.
  - Have block layout.
  - Have their `href` pointing to the `id` of the panel element.
  - Uses correct cursor (ie. `cursor: pointer`).
- Since tabs are clickable, the user can *open in a new tab/window* and the page correctly loads with the right tab open.
- Browser native back/forward button correctly changes the state of the selected tab (think about it working exactly as if there was no JavaScript in place).

## The shitmus test

Like a litmus test, here's a couple of quick ways you can tell if a tabbing systems is poorly implemented:

- Change tab, then use the back button (or keyboard shortcut) and it breaks
- The tab isn't a link, so I can't open it in a new tab

These two basic things are, to me, the most basic of systems that should pass.

## Why is this important?

The people who push their "native" apps on users can't have more reasons why the web sucks. If something as basic as a tab doesn't work, obviously there's more ammo to push a closed native app or platform on your users.

If you're going to be a web developer, one of your responsibilities is to maintain established interactivity paradigms. This doesn't mean "don't innovate". But it *does* mean: stop fucking up my scrolling experience with your poorly executed scroll-jank effects.


## URI fragment, absolute URL or query string?

A URI fragment (aka the `hash` bit) would be using `mysite.com/config#content` to show the *content* panel. A fully addressable URL would be `mysite.com/config/content`. Using a query string (by way of "filtering" the page): `mysite.com/config?tab=content`.

This decision really depends on the context of your tabbing system. Something like Github's tabs to [view a pull request](https://github.com/remy/remysharp.com/pull/6) makes sense that the full URL changes.

For "main" content changes (like the Github example), I'd expect to see a full URL change. For "sub-content", i.e. content that doesn't change the main purpose of the page, I'd choose *not* to update the URL path.

So what then?

I used to be from the school of using the hash to show the right tab, but I'm recently changing my mind on this. The biggest reason is that multiple hashes doesn't work, and comma separated fragments doesn't make sense (since it doesn't actually link to anything).

With that in mind, if there's sub-content that has tabs, I'm leaning towards using a query string. Specifically, using the `id` attribute of the *tabs* with the value of the selected panel (which should match up the `id` of the panel).

## Markup

I'm going to assume sub-content, so my markup would look like this:

```html

```

## Progressive enhancement

Ooh, a controversial phrase! Let's think about this for a moment. If you're like me and have written a dozen dozen tab systems, then it's likely you've out all the tab content in the page then used JavaScript to hide the non-selected panels, then show as appropriate.

The upside, at the least, is you're "SEO friendly" and you're progressively enhancing. The massive downside is the sheer amount of content (and bytes) going over the wire (yes, footprint when you're chucking a tonne of JavaScript to your visitor is always a factor).

So the better approach would be to load only the panel the user is interested on the server side.

But now we have a problem: you can't use a url fragment to identify the panel from the tab link. So you need a full url. Is that really a problem?

On the server you need to be able to handle both regular GET requests and requests that accept `application/json` because the panel in our enhanced version will make an ajax request for just the fragment of content we want.

## URI fragment or addressable URL?

A URI fragment would be using `mysite.com/config#content` to show the *content* panel. a fully addressable URL would be `mysite.com/config/content` *or* using a query string (by way of "filtering" the page): `mysite.com/config?tab=content`.





## HTML and CSS

Easy.

## History API

PE.



