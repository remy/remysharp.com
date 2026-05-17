---
title: Progressive Enhancement inside of JavaScript
date: 2026-05-11
tags:
  - web
ad: false
draft: true
---

# Progressive Enhancement inside of JavaScript

Lately I've had the opportunity to travel by train and coach, during which time I also tend to work. It's really only during these periods that I'm [reminded of how web sites fail](https://bsky.app/profile/remysharp.com/post/3ml6yw2gke22i) so terribly over a slow connection.

On the odd occasion I can be guilty of this too. I had a tiny tool that takes markdown and renders it for quick reading (no apps, or split view in VS Code, etc). When I loaded it up on the train, the page asked me to drop the file in to be rendered, which I dutifully did, only for the page to load the source markdown.

It's nothing new, but Progressive Enhancement doesn't only apply to HTML being enhanced with JavaScript. It also applies within JavaScript. Sometimes this was the _[cut the mustard](https://responsivenews.co.uk/post/18948466399/cutting-the-mustard)_ test, but sometimes it's about thinking laterally about JavaScript. In particular, can I capture the user's intent if they try to interact with my page before it's fully ready?

<!-- more -->

Below I've made a visual demonstration of the issue, and the effect after I fixed the logic. It shows the browser throttled to "good 2G" network connectivity, and first I try to drop the markdown file and the browser (naturally) assumes I want to open the file. The result being the browser navigates away from the page to render the raw markdown - not what I wanted.

The second part of the video shows with the same throttled connection, I can drop the file, and the page remains in place with a "Loading" indicator. The browser status shows that more files are being loaded (over the network from esm.sh) and when those settle down after 10 seconds, the fully rendered page loads. It's slow, but it got there in the end.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Hst7eTRfF3w?si=mac4kpBel6KYodJf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The original source code had the JavaScript at the end of the HTML but one of the first tasks was to import the [markdown parsing](https://github.com/markdown-it/markdown-it) module from esm.sh. This is a significant amount of code. Then it imports [highlightjs](https://highlightjs.org/) (which might not even be required). Although this was very much a quickly thrown together project, it does pull 600kB (compressed) - which feels rather heavy and I'd like to optimise if this wasn't just for me.

That 600kB, decompressed to 1.3MB, has to be downloaded and parsed _before_ the browser parses the "author code", i.e. my code, that does the rendering of the markdown file.

---

By prioritising the user interaction and including only the required JavaScript both inline _and_ directly after the source HTML that's going to encourage the user to interact, I'm able to catch the interaction and queue up the work until the prerequisite functionality is loaded.

That means breaking out the event handler binding, queue logic and simple visual feedback from the main body of JavaScript.

The result is that, even over a GPRS connection, the full interactivity still works, even if it takes nearly 2 minutes to complete.

---

This particular project is designed not to have a backend at all (that's just a constraint I set myself). Though I can see how this could actually upload the markdown to a server for rendering. I imagine I can use [Netlify ODB](https://docs.netlify.com/build/configure-builds/on-demand-builders/) - though I haven't measured the timings, I'd bet that it's still faster than 2 minutes over GPRS.

That approach is being the bread and butter of the web _and_ progressive enhancement. However, this post was about the small optimisations I could make _within_ the JavaScript to improve a client-side interactive experience.

---

This is not a new method by any measure at all. I was only reminded of it because I was on a train. Admittedly my daily client work is deep in backend API work, so I don't often get to take a closer look at front end JavaScript so much these days.

Whilst I was on the train, I ran into multiple web sites that had form inputs that either couldn't be submitted or broke the page entirely because of the slow connection and the assumed reliance on _all_ the JavaScript being fully loaded.

*[ODB]: On-demand Builder