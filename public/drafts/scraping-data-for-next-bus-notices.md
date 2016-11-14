# Scraping data for 'next bus' notices

I recently purchased a LaMetric toy/clock/thing. It's an internet connected array of LEDs which (it turns out) a fairly simple to use API.

A short while ago, I had a few minutes in the morning before I had to head out, and inside of 60 minutes, I had managed to get the display to show me, in real-time, when my next bus was due to leave. Here it is in all it's glory:

![LaMetric LEDs with bus time](/images/lametric.jpg)

This post is a tutorial with the concepts and methods to release so you can make your own, or repurpose for your own project.

<!--more-->

## Components

If you want to build something similar, here are the components required:

1. [LaMetric "smart clock"](http://lametric.com/) - a bit pricy for a clock and I bought mine on eBay as a treat-yo-self moment.
2. Either an API consumer (from your transport website) or HTML scraper (which I used) to extract timings (I couldn't easily work out how to use Google's directions API sadly).
3. Format the data in the LaMetric data structure (and either draw your own icon, or re-use an icon from their library as I did)
4. Publish both the server code to get the times, and publish to the LaMetric's app store (privately) – both will be free to use.

## Extracting due times

You *could* write some super-reusable code that could be turned into a library that other people could use…or, since it's a tonne easier, just scrape data direclty out of HTML pages since the actual application is for private use (plus, there's so many different providers for bus times that even if I publish my code, it's only useful to people who live in Brighton & Hove).

### Scraping

For this, I'm going to use my local bus website buses.co.uk. I just need to find where the bus times are shown, and here I can see there's an Ajax request being made in the background. You'll have to dig around your own service to find how to get the next due time. The key is to find a URL that you request that doesn't rely on any session data (i.e. you can `curl` the URL and you get the same result).

![Brighton bus XHR request](/images/bus-xhr.png)










