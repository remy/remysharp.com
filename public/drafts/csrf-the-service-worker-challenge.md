---
title: 'csrf: the service worker challenge'
date: '2016-07-10 12:24:34'
modified: '2016-07-10 12:43:47'
complete: false
inprogress: true
tags:
  - web
draft: true
---
# csrf: the service worker challenge

## Background: what is csrf?

Pronounced *sea-surf*, it stands for Cross-Site Request Forgery. It allows a malicious user to make requests (usually changing or stealing data) on behalf of an unsuspecting user.

One solution is to give the user (via code) a csrf token (sometimes in a `meta` tag, but always in the source of the HTML somewhere) which is then used for all `POST` (and updating) form actions.

The csrf token is _also_ included as an http-only cookie value, so the server then compares the csrf from the POSTed body and the csrf in the cookie, and if the two match, then it's okay.

This works, because a malicious user can POST arbitrary data to our server endpoint, but they can't set http-only cookies, so a crsf token prevents this attack. [The OWASP resource is great for further reading](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29).

## The crux of the problem

The reason that csrf tokens become a problem with a service worker implementation is due to the offline nature of the application.

Here is the scenario:

1. The user visits the SW enabled site, and the main page (that contains the csrf token) is cached locally.
2. The user revisits the site, and the local copy is restored (the csrf token is now stale).
3. When a POST is received the cookie has a fresh csrf token, but the body contains a stale token and the result (in my case) is a `403 unauthorized`.
