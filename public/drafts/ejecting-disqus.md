---
title: "Ejecting Disqus"
date: 2019-06-10
tags:
- web
- code
---

# Ejecting Disqus

- Disqus includes facebook script and tracking on my site, regardless of whether a user comments (and unbeknownst to me)
- Export my comments
- Move to commento.io - except I'm close to their 50K monthly cap (there's 4 months in the last 12 that I've gone well above that)

**Exacting all the avatars from my disqus comments**

```bash
ack '<username>' ~/Sites/remysharp.com/tmp/remysharp-2019-06-10T16:15:12.407186-all.xml -B 2 | egrep -v '^--$' | command paste -d' ' - - -  | sort | uniq | grep -v "'" | awk -F'[<>]' '{ print "wget -q https://disqus.com/api/users/avatars/" $11 ".jpg -O \\\"" $3 ".jpg\\\" &" }' | xargs -I CMD sh -c CMD
```

Note that I'm dropping the names that have single quotes in them (sorry), but I couldn't work out how to escape this properly.

## More justification

https://mobile.twitter.com/autiomaa/status/1138118026103070720

> Disqus is even worse when you realise that their main product (link: https://data.disqus.com/) data.disqus.com is their own tracking dataset.
>
> "The Web's Largest First-Party Data Set"

Not cool.

---

## Testing commento offline & adjusting urls

The commento.js script will read the `location` object for the host and the path to the comments. This presents two problems:

1. Testing offline isn't possible as the host is `localhost`
2. When I migrated from one platform to another (back from wordpress to my own code), my URLs [dropped the slash](https://remysharp.com/2019/03/25/slashed-uri) - this means that no comments are found for the page

The solution is to trick the Commento script. The JavaScript is reading a `parent` object - this is another name that the global `window` lives under (along with `top`, `self` and depending on the context, `this`).

So we'll override the `parent`:

```js
window.parent = { location: { host: 'remysharp.com', pathname: '/2019/04/04/how-i-failed-the-a/' }};
```

Now when the commento.js script runs, both works locally for testing, but also loads the right path (in my case I'm actually using a variable for everything right before the trailing `/`).

**Caveat:** messing with the `parent` value at the global scope could mess with other libraries. Hopefully that don't rely on these globals anyway.

### Alternative self hosted solution

Another methods is to downloade the open source [version of commento.js](https://gitlab.com/commento/commento/blob/master/frontend/js/commento.js) front end library, and made a few changes.

Firstly, I created two new variables: `var DOMAIN, PATH` and when the code read the `data-*` attributes off the script, I also support reading the domain and reading the page:

```js
noFonts = attrGet(scripts[i], 'data-no-fonts');
DOMAIN = attrGet(scripts[i], 'data-domain') || parent.location.host;
PATH = attrGet(scripts[i], 'data-path') || parent.location.pathname;
```

I'm using the commento.js script as:

```html
<script data-no-fonts="true" data-path=`${url}/` data-domain="remysharp.com" src="/js/commento.js" defer async></script>
```

It's important that the self-hosted version lives in `/js/commento.js` as it's hard coded in the commento.js file.

## Ordered by most recent comment

With the help of flex box and some nice selectors, I can reverse all the comments and their sub-comments using:

```css
#commento-comments-area > div,
div[id^="commento-comment-children-"] {
  display: flex;
  flex-direction: column-reverse;
}
```
