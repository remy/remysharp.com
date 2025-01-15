---
title: What is good web design, and bad web design?
date: 2025-01-15
tags:
  - web
---

# What is good web design, and bad web design?

My son, aged 13, was given this question for his homework recently. As someone (me!) having worked on the web professionally since 1999, I felt a connection to this particular bit of homework. Obviously we clashed (homework sucks, both for kids, parents _and_ teachers) - but I thought it would be a good exercise for me to try to answer.

I will add that I don't consider myself the authority on this answer, [but](https://remysharp.com/2017/08/12/but) I have been attending design, user experience and developer conferences for over 15 years - so hopefully I've learnt a thing or two.

<!-- more -->

## There's no one measure

When I consider what's good or bad about a web site, there's quite a few different tests I'm considering.

It's also worth adding that this list is non exhaustive and I think you'll agree quickly that there's _a lot_ of factors that go into weighing whether a web site is good or bad in their design.

**Can I find what I'm looking to do?** This means landmarks are clear, I'm not being pulled away by distracting content (like overlays) and I can find the navigation easily.

For example: if I'm on Brighton council refuse web pages, can I easily and quickly find when my next collection dates are? Or if I'm on a hotel web site, can I find the address (or map), contact details and booking dates?

**Do the pages work on mobile?** Much to my frustration, my mobile phone is pretty much always on me, so when I go to look up some information, I'll usually use my phone first.

A bad design is going to have the page jumping all over the place when it's loading (i.e. I'm about to tap a link, then something loads and the link moves away from under my finger). A bad design is one that I have to scroll vertically because the page hasn't zoomed to the phone.

I think it's pretty straightforward to get the feel for a bad mobile design, because it's often immediately unusable, forget about the actual looks.

**Does the site load?** Although whether a web site loads or not isn't immediately down to it's design, usually the cause of a blank page, or half broken page will be down to the design decisions and interactions loaded into the page.

For example: if I'm travelling by train, often the connection is spotty at best - i.e. loading a page with lots of assets (images and JavaScript) or loading a page with _large_ assets can and **will** fail. If the result is a log in form that doesn't work, or an article that refers to images that haven't loaded - then that's a bad design.

(Yes, this is me calling out those using JavaScript to load images _and_ gently suggesting that progressive enhancement is (still) the way.)

**Is the main content the *main* content item?** Put another way, is the content hidden (or fighting) clutter on the page?

For example: a lot of indie bloggers put their blog content front and centre. Strong simple fonts, with sensible line heights leaving me with _very_ legible content. On the flip side are pages that are sandwiched between navigation and other articles (that I'm likely not interested in) and the actual content is a thin column of content where the text just doesn't have room to breathe.

Or is the content blocked behind a wall of popups and overlays? Such as (when signed out of twitter) you visit (for example) [twitter/lingscars](https://twitter.com/lingscars). This is bad design (and a bad experience).

**Does this web site work for all people?** Specifically I'm thinking about accessibility. I'm fortunate that I don't have any impairments that affect how I surf the web, but being the liberal equality chasing flower that I am, a "good web design" means it works just as well for me as it does for anyone else.

For example: are input fields properly labelled? Do images have appropriate alternative text? Is the focus of a screen reader considered (and not hijacked)? Is there confusing sentences (like "if you don't want to receive our newsletter, then don't click on the checkbox").

**How are images used?** Text for images is a super no-no. It might be something that suits the aesthetic of the web page, but not being able to select text (such as a phone number or a business name) is a huge failure on the web site's part.

Bad design, potentially invisible on initial viewing, would use images for text.

**Aesthetics** Generally speaking, for a western user, we're going to have an idea of whether something is pleasing or … displeasing to the eye. Taste can be quite personal, and full on, excited, animated and in your face might suit one person (ala the days of My Space and can be seen on [LINGsCARS](https://www.lingscars.com/)), and that person might not like the brutalist styles (like those of [Heydon Pickering](https://heydonworks.com/)'s web site), or perhaps simple and straight forward (like the [GOV.UK sites](https://www.gov.uk/)).

I'd argue that a good web site design puts this last in the priorities, and a bad web site design puts aesthetics above all else.

## Some things that I've not mentioned, but think of from a developer's perspective

- I always look at a web site and catch inaccessible aspects, be it form fields, colour contrast, keyboard support. If any of these are lacking, it's a notch towards "bad web site"
- Use of JavaScript. I'm often browsing the web with JavaScript either completely disabled, or with all 3rd party JavaScript disabled. In the later case, if the site doesn't function (Amazon product listings being one), it frustrates me that I would even need to load resources from many different origins. Even more so when a web page uses JavaScript to create elements such as images, or take over the scroll bar - these are failings in my opinion
- Use of semantic mark up. I didn't mention it earlier, because every day users aren't going to think about how that impacts them. But good mark up goes towards good accessibility (such for a screen reader to navigate) or for search engines to pull out the pertinent content (or even to allow for a "reader" mode, something I use on Firefox both on desktop and mobile)

There's more I'm sure. Maybe this is useful (or incomplete!?) to you, but I'm fairly certain it's useful for my son!