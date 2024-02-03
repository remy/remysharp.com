---
title: 'Removing episodes, audiobooks and more from Spotify'
date: '2024-02-02'
image: /images/blocking-spotify.jpg
tags:
  - code
---

# Removing episodes, audiobooks and more from Spotify

I've removed [shows from Spotify](https://remysharp.com/2021/08/17/removing-shows-from-spotify) in the past, but the change was to find the specific request and modify what was being sent. Eventually it would, and did fail.

So I've gone one step higher and now I'm intercepting every request Spotify makes and I can modify the content as I wish.

<!--more-->

## TL;DR

If you just want to remove episodes and so on from the homepage, you to:

1. Extract xpui.js from the xpui.spa (this is a zip file with .spa extension)
2. Prepend the code found here
3. Add the xpui.js back into the zip xpui.spa

If you're on a Mac or *nix-like OS, then [this script](https://remysharp.com/downloads/spotify-fix) will do the trick fairly easily:

```sh
cd /Applications/Spotify.app/Contents/Resources/Apps # where spotify lives
cp xpui.spa xpui.spa.bak # backup the source
unzip xpui.spa xpui.js # extract the guts
curl https://gist.githubusercontent.com/remy/f7a1941a90ea3404a9a6a7384d420fd1/raw/spotify-rewrite.js -o spotify-rewrite.js
cat spotify-rewrite.js xpui.js > xpui.tmp.js # add the patch to the top
mv xpui.tmp.js xpui.js # rename
zip xpui.spa xpui.js # put back in spotify
```

**You can download the script from here: [spotify-fix](https://remysharp.com/downloads/spotify-fix)**

You'll need to re-run every time Spotify updates (make sure to `chmod u+x spotify-fix` and move to a directory in your `$PATH`).

## Under the hood

What's happening is that I'm including a complete patch of the `fetch` method so that we can intercept requests and modify the response.

I've written a (mostly) fully fledge library for an "in the middle patch" for `fetch` that allows intercepting requests by characteristics but also sending the request to different endpoints (thought this isn't required by the Spotify fix at all). This library is available on [github/fetch-rewrite](https://github.com/remy/fetch-rewrite/) and [npm/fetch-rewrite](https://www.npmjs.com/package/fetch-rewrite).

The intention is that it makes it easier for you to modify what you filter. Perhaps you do want podcasts in Spotify, the code that does the patching looks like this:

```js
rewriteFetch([
  {
    url: "/pathfinder/v1/query",
    query: /operationName=home&/,
    modify: {
      json(data) {
        const block = ["episodes", "audiobooks", "podcasts", "shows"];
        data.data.home.sectionContainer.sections.items =
          data.data.home.sectionContainer.sections.items.filter((res) => {
            if (!res.data.title) return true;
            if (!res.data.title.text) return true;
            const needle = res.data.title.text.toLowerCase();
            return !block.find((item) => needle.includes(item));
          });
        return data;
      },
    },
  },
]);
```

It might look unwieldy, but hopefully you can see that to _include_ podcasts, you'd remove the word "podcast" from the block list.

## Going forward

For Spotify in particular, this makes updating the requests much easier. If Spotify changes their format and the filter breaks, then the fetch rewrite silently fails, and returns the original data (so you'll see shows, etc reappear).

In the longer term, I actually want to run a proxy on my local machine _and_ my mobile phone. Then I can intercept Spotify requests in the same way and rewrite the result - but I can also shut off their rubbish on my phone. This would also be impervious to software updates (as this patch needs to be run on each update).

I'd approach this with the [mitmproxy](https://mitmproxy.org/) project and have to write the logic in Python (I was thinking to use [jq](https://jqlang.github.io/jq/) to do the rewrite logic - which I'm a big fan of but I think would also be easier to read). This should also port to mobile relatively simply (though I've yet to jump into builds for mobile).

