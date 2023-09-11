---
title: 'IP to timezone, the 30 second way'
date: '2023-07-03'
tags:
  - code
---

# IP to timezone, the 30 second way

After my wrangle with getting a timezone from an IP address by reducing large databases down from several hundred megabytes down to only a few, then discovering IPv6 didn't work (so I then applied my same logic to get 700MB to 10MB), the ever lovely [Phil Hawksworth](https://www.hawksworx.com/) pointed out that (of course) Netlify has this data available in their edge functions.

I totally overlooked the feature (maybe I didn't even look!). So let's implement that and then discover the glaring bug in _all_ of the code so far.

<!--more-->

## Netlify edge function's geo prop

Phil kindly sent me a direct message on Space Karen's website pointing me to [the `geo` property](https://docs.netlify.com/edge-functions/api/#netlify-specific-context-object) provided in edge function calls.

This (of course 🤦‍♂️) means the code for the function is (for me) stupid simple:

```
export default async (request, context) => {
  return new Response(
    JSON.stringify({
      ...context.geo,
      ip: context.ip,
    }),
    { headers: { 'content-type': 'application/json' } }
  );
};
```

That's it. The result is:

```
{
  "city": "Brighton",
  "country": {
    "code": "GB",
    "name": "United Kingdom"
  },
  "subdivision": {
    "code": "ENG",
    "name": "England"
  },
  "timezone": "Europe/London",
  "latitude": 50.86,
  "longitude": -0.11,
  "ip": "82.23.40.xx"
}
```

That did the job perfectly. It's currently sitting on [ip2tz.isthe.link/v2](https://ip2tz.isthe.link/v2) (though this still isn't perfect/useful because of the issue I'll describe).

The initial downside is that I can't specify an IP address, whereas with my entirely bespoke version, I can pass the IP as an argument: https://ip2tz.isthe.link/v1/?ip=1.1.1.1

In reality though, I don't often need to use a passed in IP address. It does mean I can't use the ip2tz as micro-service within another system, but it's much simpler to make _direct_ use of the `geo` property in the edge function (double-though, it does mean being a bit tied to Netlify…🤔 definitely something to consider).

But there is a bug, or rather, a problem: DST.

## Timezone isn't enough

The United Kingdom timezone (or at least, "Brighton") is (according to the result above), `Europe/London`. That's all very well, but useless for time maths.

There's lots of timezone to UTC, in this case, `Europe/London` maps to `+0:00`. Which is correct, but in reality, that's not the time here because we don't use UTC as a basis for our time. Put simply, UTC (right now) is 10am, and UK time is BST (which is silly British Summer Time, which just means Daylight Saving Time) so it's actually 11am.

What my API results _actually_ need is the timezone, the offset _and_ whether the location is observing DST. Which, really isn't as easy as it should be.

Since my datasets from last week have the timezone offset directly in the data itself, and I'm _not_ refreshing the data, I know for a fact that the offsets will be wrong at least half of the year.

Then there's the zones that don't observe DST (which has happened) and the zones that delay observing DST (which, again, has happened). Equally, DST doesn't happen at the same time for all countries (which should be obvious, but I'm not sure it immediately is).

So, in short: time maths is hard. And I've not solved this part yet.

My plan now is to find a dataset that represents DST observation times and logic for each timezone and somehow parse that and use it to provide the right offset. Or… ideally, find the library that _someone_ else already wrote.

Stay tuned for more timezone shenanigans.

*[UTC]: Coordinated Universal Time
*[DST]: Daylight Saving Time
