---
title: The "let's just rewrite it" syndrome
date: '2014-08-05 12:00:00'
tags:
  - business
modified: '2014-08-05 11:02:40'
draft: true
---
# The "let's just rewrite it" syndrome

- Apex: would be much easier if it was rewritten
- As a codebase grows it'll always look ugly to new eyes
- We used to have get_date_for_date and get_day_for_date - no idea which did what, but they existed because more and more functions turned up in our date functions and it had become unweildy. Yes, it needed rewritting, but it the new guy would just say "this is crap, here's how it should be written" - not realising the impact of the change - the change that would be required across so much code. And, no, a find and replace wouldn't work because we worked from the same branch and projects would be constantly in flux.
- I saw Douglas Crockford give a talk back in 2009 (or possibly 2010) where at one point he says "all code should be deleted and rewritten". I absolutely agree, but it's a task for the developer to convince the business, and I equally understand the business needing to be able to justify the rewrite. If there's other projects going on, it's near impossible to justify losing resource to a rewrite.
- However, a rewrite just because a new team member has an inclination for a new framework is (to me) definitely does not justify the rewrite. There must be a clear goals of the rewrite. Red flags for me are: why don't we use this X new popular library? I'm not saying you shouldn't, I'm saying there should be a clear benefit that lasts long after the developer has left.
- Christian Heilmann is a one excellent (public) proponent of this idea that you're writing code for that needs to be supported years later - and not by you. This makes me think about the rewrite, and how that looks. Is it rushed with the latest sexiest tech? Or is it a careful rewrite to simplify the code to make it *easy* to maintain and support?
- On replacing HTML: https://plus.google.com/107429617152575897589/posts/SiLdNL9MsFw

# TODO

- Set the scene
- Give examples
- What do you do?
