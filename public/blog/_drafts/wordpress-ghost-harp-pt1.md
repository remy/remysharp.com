# WordPress to Ghost to Harp

I've been running my "b:log" on WordPress since late 2006, but today I give you the node backed blog.

<!--more-->

Over the years I've had all the injections of Viagra adverts and the like over and over and over. Whenever I want to change anything, I'd tend to give up, and for a few years now, I've really wanted the source of my blog posts available in (something like) github.

This post is about the move and how I run my blog now. 

# Ghost

I knew that I wanted to move to a node backed platform. Ghost seemed like the best fit, and I've had the pleasure of meeting and listening to John O'Nolan and Hannah Wolfe speak about Ghost, and I complete buy into the philosophy. 

Exporting WordPress posts (and pages) to Ghost was actually very simple (I used the developer version of Ghost locally).

The only bump in the road was the error messaging during the Ghost import was pretty vague. But checking the devtools console yielded the answer, a 324 from my server during the upload process. So I tweaked nginx to allow for larger files to be uploaded and bosh. Fixed. 

The next trick was the comments - which Disqus seemed like the default that everyone moves to. Obviously nothing to do with Ghost, but this process was tricky. The best advice I can give if you're doing this and keep hitting failed imports is: validate the XML (w3c validator is just fine), and hand-fix the invalid XML.

## Why I didn't stick with Ghost

For the record, I think Ghost is an excellent platform for most users, particularly if they're coming to blogging for the first time or wanting to shift away from WordPress. 

However, being a developer I wanted to add a few custom tweaks, specifically I wanted an archive page, a handful of URL rewrite rules and a few of the Ghost ways of doing things weren't quite what I wanted.

One particular example is all my old WordPress posts had split markers in them which Ghost doesn't support. They do have support for creating excepts, but if you want HTML you can't (at time of writing) append a read more to the link. 

I tried to contribute to the Ghost project, but I ended up going down a rabbit hole for what was effectively a tiny change (submitting a pull request to a Ghost dependency Downsize). 

The (understandable) problem is that Hannah and the Ghost team are producing code that works in a great deal of environments and so a quick PR here and there are great, but I can understand why they're not merged in right away if at all: there's a much bigger picture to consider. 

I thought about just forking Ghost and permanently running my own version, but there's a fairly big system to inherit when all I'm doing is serving pages...which I had done with Harp.js before. 

So I made the jump to Harp.

## Ghost to Harp

