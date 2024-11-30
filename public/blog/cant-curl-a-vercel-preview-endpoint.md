---
title: "Can't curl a vercel preview endpoint"
date: '2024-06-07'
draft: true
tags:
  - web
---

# Can't curl a Vercel preview endpoint

For work we use Vercel for certain bits of the architecture. I was a huge fan of Vercel's early iterations. Lately/last few years they're kind of everywhere and all of a sudden looking to cement themselves as The Platform, and though Next.js is pitched as a separate thing, it's pretty clear that it's undoubtedly intertwined with Vercel's hosting.

Still, ignoring the politics for a second, I recently ran into an issue with preview/branch deploys and testing.

We were trying to debug a RESTful API I was working on and Vercel adds a layer in front of preview deploys, so this is how to get around that.

<!-- more -->

Short version is: tucked away in their docs is [Protection Bypass for Automation](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation).

