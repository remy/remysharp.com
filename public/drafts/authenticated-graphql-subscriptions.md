---
title: Authenticated GraphQL Subscriptions
date: 2019-04-24
tags:
- code
---

# Authenticated GraphQL Subscriptions

An interesting feature of GraphQL (to me) is the real-time subscriptions against a dataset. It's relatively pain free to add (assuming you've managed to get _everything else_ configured!).

The problem I recently faced was authentication over subscriptions, and how to ensure the user connected via a web socket was authenticated or not. When I eventually solved it, there were a number of specific code changes that I figured would be useful to catalogue and record here.

<!--more-->

## Tech stack

In my particular case I'm using the following tech stack though this post should be useful if you're not using _all_ the same parts:

- [graphql-yoga](https://github.com/prisma/graphql-yoga)
- [next.js](https://github.com/zeit/next.js)
- [next-with-apollo](https://github.com/lfades/next-with-apollo#readme)
- [apollo-boost](https://github.com/apollographql/apollo-client#readme)

The changes are split across the backend GraphQL server and the client code (which in the case of Next.js is frontend and backend in the form of SSR).

* [SSR]: server side rendering