# Trimming the release/test/fail/repeat cycle

Sometimes I find myself in the _tweaking_ phase of a project and to test some specific aspects of it, the project will need a public URL.

My latest instance of this particular cycle was testing a Twitter Card was rendering properly. The first few times it wasn't, and getting it right felt like wasted time. Of course, there's smarter way I could work.

<!--more-->

My process to test, tweak and fix this was to:

1. Make the change locally
- Release to a public URL *(this is "dead time")*
- Validate the card using Twitter's tools
- Find it still didn't work
- Return to step (1) until it was fixed

At first the image wasn't loading. Then I realised that I needed a `robots.txt` file, then I realised the `twitter:title` was wrong. In total, I released 5 new instances of my project and it took just over an hour. For something that should have really been about 10 minutes tops.

The releae might be fast as a one off event, but when repeated over and over again for tiny tweaks (perhaps I needed to use an absolute URL instead of a relative one in `twitter:image`), it feels wasteful and it's frustrating.

I've been in other situations when the process is a lot more complicated and eats up a lot of time whilst I wait for each cycle to complete.

However, there is hope and I can completely remove the **entire** release/test cycle by using [ngrok](https://ngrok.com/).

What ngrok gives me is a public (and secure) URL that tunnels directly to my local project. The steps to circumvent my existing release/test cycle is to:

1. Run ngrok locally using `ngrok http 3003` (so that I'm mapping to port `3003` which is where my local server is running)
- Make the change locally
- Validate the card using Twitter's tools
- Find it still didn't work
- Return to step **(2)** until it was fixed

Importantly, I'm skipping the release process entirely which is the part where I spend the most amount of time sitting and waiting.

Using ngrok to expose my project locally skips a large part of the release/test cycle and keeps me doing the interesting (and productive) part of my work.
