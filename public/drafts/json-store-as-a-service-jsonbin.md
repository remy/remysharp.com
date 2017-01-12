# JSON store as a service: jsonbin.org

Last week (over about 4 hours) wrote and released a microservice called [jsonbin.org](https://jsonbin.org). It's a personalised JSON store as a service that you interact with over RESTful URLs.

This type of service has been something I've wanted for many years. I kept bumping up into the desire for a simple service that I could post JSON and deep link that content in a very simply fashion. I had a few hours handy and I was in a post-christmas _I've gotta build something_ mood.

<!--more-->

## The itch

The problem was the same for me each time I needed something like this: I wanted to store some data on the internet somewhere, and I wanted to iterate fast (typically for a personal app or hack project).

Once I've authed with [jsonbin.org](https://jsonbin.org) (confusingly close to jsbin!) I get an API key and I can manage data and deep link data. I've already created my first micro app, a personal (and simplistic) short URL redirect system.

## Usage

Once you've got an API key (let's pretend it's 'xyz' for these example), you `GET`, `POST`, `PATCH` (to merge objects) and `DELETE`.

```
curl -X POST -H'authorization: token xyz' -d'["foo.com","bar.com"]' https://jsonbin.org/remy/urls
curl -X PATCH -H'authorization: token xyz' -d'thud' https://jsonbin.org/remy/urls
curl -X GET -H'authorization: token xyz' https://jsonbin.org/remy/urls

## Learnings

I've had a few recent projects where I've had to delve a deeper understanding of RESTful API design, and I always find that there's subtleties to the API design that makes for a good twitter question.

The first example
