---
title: 'JSON store as a service: jsonbin'
date: '2017-01-31 17:45:04'
modified: '2017-02-04 17:55:01'
tags:
  - web
published: true
---
# JSON store as a service: jsonbin.org

Early on at the start of 2017, over a short 4 hour hack, I wrote and released a microservice called [jsonbin.org](https://jsonbin.org). It's a personalised JSON store as a service that you interact with over RESTful URLs.

This type of service has been something I've wanted for many years. I kept bumping up into the desire for a simple service that I could post JSON and deep link that content in a very simply fashion. I had a few hours handy and I was in a post-christmas _I've gotta build something_ mood.

<!--more-->

## Why

I've repetitively run into a simple problem: I just wanted to store a (small) bit data on the internet somewhere, and I wanted to iterate fast (typically for a personal app or hack project).

I also knew that I wanted it to be a simple JSON key/value store, that I could say: "store X against foo.bar.value" and it was just store the value to be later retrieved with `foo.bar.value` or `foo.bar` or even just `foo`.

It would be perfect for little <abbr title="internet of things">IOT</abbr> projects, or quick hacks that only needed to store a single value or so. Rather than having to start up a new database, do all the database work, I could `GET` and `POST` to this microservice.

And indeed it works exactly as I intended, I've already created my first micro app, a personal (and simplistic) [short URL redirect system](https://github.com/remy/rem.io/blob/cee812a73a9d95c2edc8a4ed5740c7b01cd64d4b/index.js#L12-L32).

## Usage

Once you've got an API key (let's say it's 'xyz' for these examples), you can start using jsonbin.org.

Since the main interface is a RESTful API, it means that you can `curl` straight to the API, or use packages like [request.js](https://github.com/request/request) (as I did in the my URL shortener) or you can use simple abstractions (which I'll include below).

With your API key you can `GET`, `POST`, `PATCH` (to merge objects) and `DELETE` (just remember to send the right headers):

```bash
$ curl -X POST -d'["foo.com","bar.com"]' https://jsonbin.org/remy/urls -H'authorization: token xyz' -H'content-type: application/json'
$ curl -X PATCH -d'thud' https://jsonbin.org/remy/urls -H'authorization: token xyz' -H'content-type: application/json'
$ curl -X GET https://jsonbin.org/remy/urls -H'authorization: token xyz' -H'content-type: application/json'
```

I've also written a CLI tool *and* a node package to simplify the work: [jsonbin](https://www.npmjs.com/package/jsonbin) (installed via `npm install [--global] jsonbin`). From the CLI:

```bash
$ jsonbin blog.url=https://…
```

As a required module which returns a promise:

```js
const jsonbin = require('jsonbin')(TOKEN);

jsonbin.set('blog.url', 'https://…');
// jsonbin.get('blog.url').then(url => console.log(url));
```

The node package isn't fully fleshed out, and I'll welcome an PRs if there's missing functionality someone needs.

## Innards

One of the main components of the service is being able to deep link into JavaScript objects, and for that I'm using [undefsafe](https://www.npmjs.com/package/undefsafe), a small library I wrote for safely accessing JavaScript objects via a path without getting `"Cannot read property 'X' of undefined"`.

With undefsafe, I'm able to reach into the user's JSON store using the request pathname and return the matched property (or update it if required).

## Custom body parsing

One of the most interesting problems I came to solve with jsonbin was parsing the payload. I knew that the endpoints would support `application/json` content types, but when you run a curl .

Firstly, by default, if you do a `curl -X POST -d"[]"`, the header is set automatically to `application/x-www-form-urlencoded`. This means that by default Express will parse the `req.body` to `{ 0: '' }`. Cute eh?

Most of the time Express will put the body of the post as the key in `req.body` and the value is set to an empty string, with the exception of when the body is the string `[]`, then the `req.body` will take the form I was seeing (a zero keyed object).

Luckily for me, I've got some memory of weirdness in JavaScript, and this one comes from [jsfuck](http://www.jsfuck.com/), specifically that `[]` can have [a value of](https://jsconsole.com/?%2B%5B%5D) `0`, so there's some [testing around](https://github.com/remy/jsonbin/blob/da0355727ed48a33c2eb22670f7d9b9e446a6830/lib/custom-body-parser.js#L16-L41) whether the result of the parsed JSON is a number or not.

## Enjoy

The project is currently in "beta" mode so please go ahead and try it out. Let me know if you use it for any of your own projects (since writing this I've already used it in a second project).





