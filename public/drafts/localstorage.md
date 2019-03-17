---
title: Proposal for Async Web Storage API
date: '2013-09-23 12:00:00'
tags:
  - code
modified: '2013-09-23 20:54:38'
draft: true
---
# Proposal for Async Web Storage API

Web Storage implementations `localStorage` and `sessionStorage` have, in the
past, been labelled as outlaws as they are synchonous APIs. So getting large
amounts in and out *could* be costly (though we're talking milliseconds - but
still important).

A simple upgrade to the API would solve this problem, and developers could
easily move to a an async API: **add a callback argument**.

## Syntax

Currently the API for storage is via methods on the storage object *and* through
setter/getter methods. We can't do anything about the setter, getter and
deletter

## Support

## Discussion
