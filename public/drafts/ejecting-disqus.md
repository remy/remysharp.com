---
title: "Ejecting Disqus"
date: 2019-06-10
tags:
- web
- code
---

# Ejecting Disqus

Running a routing performance check on my blog I noticed that in the list of domains being accessed included facebook\.com. Except, I don't have anything to do with Facebook on my blog and I certainly don't want to be adding to their tracking.

- Disqus includes facebook script and tracking on my site, regardless of whether a user comments (and unbeknownst to me)
- Export my comments
- Move to commento.io - except I'm close to their 50K monthly cap (there's 4 months in the last 12 that I've gone well above that)

## More justification

https://mobile.twitter.com/autiomaa/status/1138118026103070720

> Disqus is even worse when you realise that their main product data.disqus.com is their own tracking dataset.
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
window.parent = {
  location: {
    host: 'remysharp.com',
    pathname: '/2019/04/04/how-i-failed-the-a/'
  }
};
```

Now when the commento.js script runs, both works locally for testing, but also loads the right path (in my case I'm actually using a variable for everything right before the trailing `/`).

**Caveat:** messing with the `parent` value at the global scope could mess with other libraries. Hopefully that don't rely on these globals anyway.

### Alternative self hosted solution

Another methods is to download the open source [version of commento.js](https://gitlab.com/commento/commento/blob/master/frontend/js/commento.js) front end library, and made a few changes.

Firstly, I created two new variables: `var DOMAIN, PATH` and when the code read the `data-*` attributes off the script, I also support reading the domain and reading the page:

```js
noFonts = attrGet(scripts[i], 'data-no-fonts');
DOMAIN = attrGet(scripts[i], 'data-domain') || parent.location.host;
PATH = attrGet(scripts[i], 'data-path') || parent.location.pathname;
```

I'm using the commento.js script with data attributes, which in the long run is probably safer than messing with `parent`:

```html
<script defer async
  data-path="/2019/04/04/how-i-failed-the-a/"
  data-domain="remysharp.com"
  src="/js/commento.js"></script>
```

It's important that the self-hosted version lives in `/js/commento.js` as it's hard coded in the commento.js file.

## Ordered by most recent comment

By default, Commento shows the first comment first, so the newest comments are at the end. I prefer most recent at the top.

With the help of flex box and some nice selectors, I can reverse all the comments and their sub-comments using:

```css
#commento-comments-area > div,
div[id^="commento-comment-children-"] {
  display: flex;
  flex-direction: column-reverse;
}
```

## Preserving avatars

During the import process from disqus to commento, the avatars are lost. Avatars add a nice feeling of ownership and a reminder that there's (usually) a human behind the comment, so I wanted to bring these back.

This required a little extra mile. The first step is to capture all the avatars from disqus and upload them to my own server. Using the exported disqus XML file, I'm going to grep for the username and real name, download the avatar from disqus [using their API](https://disqus.com/api/docs/images/) and save the filename under the real name.

I have to save under the real name as that's the only value that's exposed by commento (though in the longer run, I could self-host commento and update the database avatar field accordingly). It's a bit gnarly, but it works.

This can all be done in single line of execution joining up unix tools:

```bash
$ grep '<username>' remysharp-2019-06-10T16:15:12.407186-all.xml -B 2 |
  egrep -v '^--$' |
  paste -d' ' - - -  |
  sort |
  uniq |
  grep -v "'" |
  awk -F'[<>]' '{ print "wget -q https://disqus.com/api/users/avatars/" $11 ".jpg -O \\\"" $3 ".jpg\\\" &" }' |
  xargs -I CMD sh -c CMD
```

You might get away with a copy and paste, but it's worth explaining what's going on at each stage in case it goes wrong so hopefully you're able to adjust if you want to follow my lead. Or if that worked, you can [skip to the JavaScript](#javascript-to-load-these-avatars) to load these avatars.

### How the combined commands work

In little steps:

#### `grep '<username>' {file} -B 2`

Find the instance of `<username>` but include the 2 previous lines (which will catch the user's name too).

#### `egrep -v '^--$'`

When using `-B` in grep, it'll separate the matches with a single line of `--`, which we don't want, so this line removes it. `egrep` is a "regexp grep" and `-v` means remove matches, then I'm using a pattern "line starts with - and ends with another -".

#### `paste -d' ' - - -`

This will join lines (determined by the number of `-`s I use) and join them using the delimiter `' '` (space).

#### `sort | uniq`

When getting unique lines, you have to sort first.

#### `grep -v "'"`

I'm removing names that have a dash (like `O'Connel`) because I couldn't escape them in the next command and it would break the entire command. An acceptable edge case for my work.

#### `awk -F'[<>]' …`

This is the magic. `awk` will split the input line on `<` and `>` (the input looking like `<name>Remy</name><isAnonymous>false</isAnonymous><username>rem</username>` which came from the original `grep`). Then using the `{ print "wget …" }` I'm constructing a `wget` command that will request the URL and save the jpeg under the user's full name. Importantly I must wrap the name in quotes (to allow for spaces) and escape those quotes before passing to the next command.

#### `xargs -I CMD sh -c CMD`

This means "take the line from input and execute it wholesale" - which triggers (in my case, 807) `wget` requests as background threads.

If you want learn more about the command line, you can check out [my online course](https://terminal.training/?coupon=READERS-DISCOUNT) (which has a reader's discount applied 😉).

The whole thing runs for a few seconds, then it's done. In my case, I included these in my images directory on my blog, so I can access them via https://download.remysharp.com/comments/avatars/rem.jpg

### JavaScript to load these avatars

Inside the commento.js file, when the commenter doesn't have a photo, the original code will create a `div`, colour it and use the first letter of their name to make it look unique.

I've gone ahead and changed that logic so that it reads:

If there's no photo, and the user is not anonymous, create an image tag with a data-src attribute pointing to _my_ copy of the avatar. Then set the image source to my "no-user" avatar (I'll come on to why in a moment) and apply the correct classes for an image.

If and only if, the image fires the error event, I then create the originally Commento element and replace the failed image with the div.

Then, once Commento has finished loading, I apply an `IntersectionObserver` to load as required (rather than hammering my visitors network with avatar images that they may never scroll to) thanks to [Zach Leat's tip this week](https://www.zachleat.com/web/facepile/).

```js
avatar = create('img');
avatar.setAttribute(
  'data-src',
  `https://download.remysharp.com/comments/avatars/${
    commenter.name
  }.jpg`
);
classAdd(avatar, 'avatar-img');
avatar.src = '/images/no-user.svg';
avatar.onerror = () => {
  var div = create('div');
  div.style['background'] = color;
  div.innerHTML = commenter.name[0].toUpperCase();
  classAdd(div, 'avatar');
  avatar.parentNode.replaceChild(div, avatar);
};
```

As I mentioned before, I'm using the IntersectionObserver API to track when the avatars are in the viewport, then the real image is loaded - reducing the toll on my visitor. However, I can only apply the observer once the images exist in the DOM.

To do this I need to [configure](https://docs.commento.io/configuration/frontend/#configuration-settings) Commento to let me do a manual boot using the `data-auto-init="false"` attribute on the script tag.

Once the script is loaded, in an inline deferred script I use this bit of nasty code, that keeps checking for the `commento` property, and once it's there, it'll call the main function - which takes a callback that I'll use to _then_ apply my observer:

```js
function loadCommento() {
  if (window.commento && window.commento.main) {
    window.commento.main(() => observerImages());
  } else {
    setTimeout(loadCommento, 10);
  }
}
setTimeout(loadCommento, 10);
```

Note that this JavaScript only ever comes after the script tag with `commento.js` included. However, I had to make _another_ change to the commento.js to ensure

*[DOM]: Document Object Model
