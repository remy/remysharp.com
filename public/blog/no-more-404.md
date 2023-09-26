---
title: 'No more 404'
date: '2023-09-26'
tags:
  - code
---

# No more 404

As with any ageing blog, _some_ of my outbound links are hitting either 404s or domains that are no longer active.

It's understandable given that my blog is around 17 years old (at time of writing) and I know many others that have old blogs. If it's a blog that embraces the _web_ then it will link out. But for the visitor, opening a link that provides more context to what I've written and to be presented with a blank page is a bit of downer.

The archive.org is an amazing resource and I've wondered whether I should _always_ link to the archive for my URLs - but I quickly decide linking to the "real" resource is the right thing to do. But how about when the page is long gone - and the how am I supposed to know _when_ that happens?

<!--more-->

## How I approved this problem

I went through a number of different ideas, but eventually landed on the following:

_When a real user clicks on a link, it's swapped out to be redirected through my own endpoint that checks if the URL is still `OK`, and if so permanently redirects the visitor, otherwise my endpoint checks the Web Archive for the URL and permanently redirects to that instead._

This means that I don't need to re-run any URL parsing and collecting as URLs will be handled on the fly (it could also in theory handle a temporary outage on the target URL's side).

The alternative would have been to regularly parse out _all_ the external URLs from my blog, running through each making requests to all and then swapping out the URL for an Web Archive copy in the source of my blog. As a one off, this isn't so hard, but it becomes a (time) costly process if I'm running this daily.

## In code

The practical side is solved with two scripts. One that runs on the client side as a progressive enhancement. That's to say if the client side script fails - all is well and the link behaves as it always did (either in successfully loading the target or not because it's a 404 or a dead domain).

### Client side

For the client side, I'm using event delegation (so that I only have a single event listener) using `capture` which means that my event fires first allowing me to run my check and swap out the URL right before the actual "click" occurs.

In the event handler, if the URL is relative (i.e. internally linking) then I exit early doing nothing.

Otherwise, the script _also_ checks if the date is in the URL and if it is (i.e. it's a blog post) then I'll also send the date to my server side redirection script. This is so that _if_ I do redirect to the Web Archive, I send you to the version of the page that was around at the time of my blog post (because the target may have been updated to an entirely different page).

```js
// using event delegation
document.body.addEventListener('click', (event) => {
    // work out if the element clicked was a link or if it was
    // inside a link

    /** @type HTMLElement */
    let target = event.target;
    if (target.nodeName !== 'A') {
      // check we're not inside a link
      target = target.closest('a');
    }

    // if we found the actual anchor element
    if (target && target.nodeName === 'A') {
      /** @type String */
      let href = '';

      try {
        // get the "real" href, note that node.href is fully resolved,
        // which I don't want because I want to check if the href is
        // relative or not
        href = encodeURIComponent(target.attributes.href.value);
      } catch (_) {
        // a link without an href, let's bail
        return;
      }

      // ignore internal links
      if (!href.startsWith('http')) {
        return;
      }

      // don't try to redirect archive links
      if (href.includes('archive.org')) {
        return;
      }

      let date = '';

      // my blog includes the full date in the URL, so parse that
      // out if it's present.
      if (location.pathname.startsWith('/2')) {
        date = location.pathname.substr(1, 10).replace(/\//g, '-');
        target.href = `/redirect?url=${href}&date=${date}`;
      } else {
        target.href = `/redirect?url=${href}`;
      }
    }
  },
  // useCapture
  true
);
```

[This is the client side script on github](https://github.com/remy/remysharp.com/blob/b286c85484f753992d38eca5d8c20b514a24403b/public/js/redirect.js).

### Backend / Server side

On the backend, I'm making use of Netlify's Edge functions, but the code could be translated to any other type of server side with relatively small changes.

The process is as follows:

- Receive the URL and an optional date
- Do some basic error checking (see the code for this, such as the URL missing)
- Fetch the headers for the target URL with a timeout of X seconds
- If the request returns a `200 OK` redirect with a `301` so the browser remembers this `/redirect?url…` URL always points to the "real" URL.
- Otherwise, if the request times out, or if anything other than a `200 OK` is returned, make a request to the [Web Archive's CDX API](https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server) sending the URL and optionally the date asking for the last `200 OK` for the given parameters.
- If I get a reply from the Web Archive, I redirect with a `301` to the web.archive URL.
- Otherwise I send a `302` to the original URL meaning "next time you try this /redirect url, please check again".

This will cover a lot of cases, but not all. If the domain has been bought and is responding with a `200 OK` to old URLs, or [if the site is responding](http://code.google.com/p/cocoaasyncsocket/) with `200 OK` when in fact it's a `404`, then the archive redirector won't detect the bad page.

```typescript
import type { Config, Context } from 'https://edge.netlify.com';

const rootUrl = 'https://remysharp.com';

const root = new URL(rootUrl);

export default async function (req: Request, { next }: Context) {
  try {
    // poor security, but just prevent others from hotlinking this script
    if (!req.headers.get('referer')?.startsWith(rootUrl)) {
      return new Response(null, { status: 204 });
    }

    const url = new URL(req.url);

    // start some simply error checking

    // Get the URL from the query string parameter 'url'
    const urlParam = url.searchParams.get('url');
    if (urlParam === null) {
      return new Response(null, { status: 204 });
    }

    // I'm not 100% sure about this, but it's supposed to say:
    // if the visitor already has this cached, then just
    // send them on their way and bail early.
    const res = await next({ sendConditionalRequest: true });
    if (res.status === 304) {
      return res;
    }

    const targetUrl = new URL(urlParam);

    let status = 0;

    try {
      // set a 2s timeout (1s was too tight for some sites)
      const response = await fetchWithTimeout(targetUrl, {}, 2000);
      status = response.status;
    } catch (_) {
      status = 400;
    }

    // Check the status code of the response
    if (status === 200) {
      // the target page is fine, so redirect to it as a perma-redirect
      return Response.redirect(urlParam, 301);
    } else {
      // If the status code is not 200, fetch the Wayback Machine CDX API
      let waybackUrl = `https://web.archive.org/cdx/search/cdx?output=json&filter=statuscode:200&url=${encodeURIComponent(
        urlParam
      )}&`;

      // then add the date of the blog post (if we can from that) to get an
      // good representative of the page at the time
      const date = url.searchParams.get('date');
      if (date) {
        waybackUrl += `from=${date}&limit=1`;
      } else {
        // otherwise just take the last 200
        waybackUrl += `limit=-1`;
      }

      const waybackResponse = await fetch(waybackUrl);
      const waybackData = (await waybackResponse.json()) as [
        String[],
        String[]
      ];

      // check if the Wayback Machine response includes a value of 200
      if (waybackData && waybackData.length > 1 && waybackData[1]) {
        // redirect to the URL from Wayback Machine
        const waybackUrl = new URL(
          `https://web.archive.org/web/${waybackData[1][1]}/${waybackData[1][2]}`
        );
        return Response.redirect(waybackUrl, 301);
      } else {
        // fail: sending 302 to original URL, unknown
        return Response.redirect(targetUrl, 302);
      }
    }
  } catch (error) {
    // Handle any errors that occur during the execution
    console.log('[fail] errored: ' + error.message);
    return Response.redirect(root, 500);
  }
}

export const config: Config = {
  path: '/redirect',
};

async function fetchWithTimeout(uri: URL, options = {}, time = 5000) {
  // see full script for fetch with AbortHandler
}
```

[This is the backend script on github](https://github.com/remy/remysharp.com/blob/b286c85484f753992d38eca5d8c20b514a24403b/netlify/edge-functions/redirect/redirect.ts).

## Some examples

- When I wrote about [tracking "noscript"](https://remysharp.com/2009/10/15/the-missing-stat-noscript) (though I've gone off tracking entirely), the web site "Mint" existed, but doesn't anymore, but you can see how it looked back in 2009.
- I [won an iPod](https://remysharp.com/2006/12/19/css-mastery-ipod-giveaway) in Andy Budd's Christmas competition which was cited in the post, but Andy did a bit of a purge of his blog post (I suspect: making the content more focused around the topics he wants to be associated with). This meant the context was lost.
- In a (relatively recent) blog post where I described how I built a [hardware hack for the ZX Spectrum Next](https://remysharp.com/2021/10/31/midi-controller-to-ps2-part-2), I linked to a store referencing a specific component and the schematic PDF, both of which are now 404'ing, but through my redirector, I successfully land on the archive copies and get the real context.
