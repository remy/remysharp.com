---
title: 'Timezone offsets from an IP address'
date: '2023-07-18'
tags:
  - web
---

# Timezone offsets from an IP address

Following on from my [hard](/2023/06/29/ip-to-timezone-the-hard-but-fast-way) and [easy way](/2023/07/03/ip-to-timezone-the-30-second-way) of getting timezone from an IP address, having the timezone (as text) is one thing, now finding the actual offset is entirely a different problem.

<!-- more -->

TL:DR; jump to the [spoiler](#temporal-api-working-with-dates-and-times) if you can't be bothered to read/listen to me ramble!

## The problem isn't timezones, it's day light saving

It's all very well knowing what timezone a particularly location is sitting on. We can show the user the UTC time, but when it doesn't match the wall clock because they're currently observing DST, then it's just…weird.

So now we need to know if the location is observing DST, or not. Or if perhaps they never observe DST (like Hawaii).

## The long hard way

There is the [IANA timezone dataset](https://www.iana.org/time-zones) which has custom data structures that describe the location and how time is observed in that location for that particular date. Which is very cool because you can say: for the Ukraine, in 1921 on Thursday 5th July - were they observing DST or not.

There's a library in Python that does read this data straight off the shelf, but I couldn't find anything for JavaScript, so I went about parsing it myself.

The documentation is generally pretty useful, describing the structures:

**From the source file**

```text
#Rule NAME    FROM TO    -   IN  ON      AT   SAVE LETTER
Rule  Chicago 1920 only  -   Jun 13      2:00 1:00 D
Rule  Chicago 1920 1921  -   Oct lastSun 2:00 0    S
Rule  Chicago 1921 only  -   Mar lastSun 2:00 1:00 D
Rule  Chicago 1922 1966  -   Apr lastSun 2:00 1:00 D
Rule  Chicago 1922 1954  -   Sep lastSun 2:00 0    S
Rule  Chicago 1955 1966  -   Oct lastSun 2:00 0    S
```

**Reformatted**

<table class="smaller">
<tr>
  <th>From</th>
  <th>To</th>
  <th colspan="2">On</th>
  <th>At</th>
  <th>Action</th>
</tr>
<tr>
  <td colspan="2">1920 only</td>
  <td colspan="2">June 13<small><sup>th</sup></small></td>
  <td rowspan="6">02:00 local</td>
  <td>go to daylight saving time</td>
</tr>
<tr>
  <td>1920</td>
  <td>1921</td>
  <td rowspan="5">last Sunday</td>
  <td>in October</td>
  <td>return to standard time</td>
</tr>
<tr>
  <td colspan="2">1921 only</td>
  <td>in March</td>
  <td rowspan="2">go to daylight saving time</td>
</tr>
<tr>
  <td rowspan="2">1922</td>
  <td>1966</td>
  <td>in April</td>
</tr>
<tr>
  <td>1954</td>
  <td>in September</td>
  <td rowspan="2">return to standard time</td>
</tr>
<tr>
  <td>1955</td>
  <td>1966</td>
  <td>in October</td>
</tr>
</table>

I got fairly far, but hadn't implemented the `lastSun`, `firstMon`, `Sun>=8` syntax (do drop a comment if you think this library might be useful).

The reason I stopped was because I remembered there was a way in literally a single line of code: [Temporals](https://github.com/tc39/proposal-temporal).

## Temporal API: working with dates and times

The JavaScript `Date` API is, in my own opinion, one of the worst parts of JavaScript. The temporal API does a massive overhaul of date and time processing, and, it so happens, it can give me whether a datetime is in DST for a given timezone.

```js
Temporal.Now.instant().toZonedDateTimeISO("Europe/London").offset;
// => "+01:00"
```

Just like that, I've got my timezone offset lookup. Although, since both Node and Deno (since I was using [Netlify Edge functions](https://docs.netlify.com/edge-functions/overview/) which use Deno) doesn't have the API natively, I need to load the polyfill first:

```js
import { Temporal } from 'https://esm.sh/@js-temporal/polyfill';
```

And that was it. Two extra lines gave me the timezone offset: [days-to-xmas](https://days-to-xmas.isthe.link/) ([source](https://github.com/remy/days-to-christmas/blob/4ce75316795d890a21b55e663f71ab753c312e4d/netlify/edge-functions/days/days.js)).



*[UTC]: Coordinated Universal Time
*[DST]: Daylight Saving Time
