---
title: 'IP to Timezone - the hard, but fast way'
date: '2023-06-29'
tags:
  - code
---

# IP to Timezone - the hard, but fast way

This week I decided it was time to try to revive some of the casualties from my recent [Vercel incident](https://remysharp.com/2023/01/30/on-vercel-if-some-of-my-sites-are-down), and though webmentions.app is the more useful, I though I'd start with the, so I thought, low hanging fruit - "how many days to Christmas".

It turned into 3 days of complicated problem solving and working against systems that just didn't want to work the way I needed.

<!-- more -->

## The context

I have a little app that runs on a internet connected clock that shows the days to Christmas. A little while ago, during December and Jan, the traffic (along with traffic on webmentions.app) spiked hard enough to cause Vercel to block my entire account.

So for the short term, I disabled the countdown app. Christmas, at the time, was a full year away, so I figured it wouldn't be missed.

I then started getting regular, weekly, support emails saying that the Christmas countdown is stuck 50 days (the default I'd set when the app boots) and that it hasn't been working for a while.

_Who is counting the days to Christmas in JUNE?! (apart from every kid…) 🤷‍♀️_

Still, I thought it was time to fix it. However, the app itself relies on _either_ the user entering their timezone into a rather fiddly little bit of UI (that's entirely outside of my control), and even then they have to type their timezone exactly to the format. Or… I do some helpful magic and take their IP address and look up against a database to find their timezone.

Since the timezone lookup web site's traffic tends to match that of the *Is it Christmas* requests, I wanted to refactor that code too - specifically to remove it from Vercel hosting.

## The requirements

Being the cheapskate when it comes to running software, I absolutely did not want to be running a hosted database to hole the data required for the look up.

Originally the service relied on [Maxmind's geo dataset](https://www.maxmind.com/en/locate-my-ip-address), but it was 67MB. Although the database and it's respective library are optimised to work quickly, I've seen it does try to load up a large file and I wanted to see if I could improve that.

Since the data was also entirely read-only, I could, in theory, use a simple database structure.

## The failed attempts

I wanted to start with this [dataset from IP 2 Location](https://lite.ip2location.com/database/db11-ip-country-region-city-latitude-longitude-zipcode-timezone) and I figured the "simple" solution would be to bung it all in an sqlite database and query away.

My first hurdle was that the sqlite database came up at 365MB. Part of the problem here was now tracking and deploying the file with GitHub. I've never used the Large File Storage (LFS) system before and I wasn't sure how it would work. It turned out to be reasonably simple (to copy and paste commands) locally, but since I wanted to deploy into Netlify, it seemed (accord to their [limitation docs](https://docs.netlify.com/large-media/requirements-and-limitations/#limitations)) that Large File Media (their version) was intended for files _upto_ 100MB.

Okay, so maybe I can host the sqlite database on something like S3 and read it from there. No, no dice. It's really not that simple (understandably). You need the file system to allow for SQLite to jump around in the file via IO operations to get to where it needs to be.

This is where a virtual file system would be useful. SQLite does have support for this concept, and it's been proven to work - even [directly inside the browser](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/) - but I just couldn't get anywhere (many of the useful examples were either from the browser directly, or in Python and assumed some extra prerequisite of knowledge).

I asked [Simon Willison](https://simonwillison.net/) who has been playing _a lot_ in SQLite-land and he suggested [duckdb](https://duckdb.org/) using a Parquet database/structure/something.

Porting the the sqlite database to this new parquet data structure was relatively straightforward, and I figured out how to properly _type_ my columns to help with the lookup:

```
csv2parquet -o output.db -t "ip_from=int32" -t "ip_to=int32" input.csv
```

Now I "just" needed to read the parquet file with the duckdb library.

…let's take a quick breather, and then back to it…

Deploying to Netlify (node) functions resulted with:

```
Error - /lib64/libm.so.6: version `GLIBC_2.29' not found (required by /var/task/node_modules/duckdb/lib/binding/duckdb.node)
```

Deploying to AWS (using [arc.codes](https://arc.codes/docs/en/get-started/quickstart) - which coding-wise was really easy), resulted in:

```
Error: /var/task/node_modules/duckdb/lib/binding/duckdb.node: invalid ELF header
```

Both of these errors are related to the runtime not being compatible with the duckdb binary that's included in the module.

Running on Netlify's edge functions didn't suffer this problem, but threw in different issue. To use the parquet file, the Duckdb query included `read_parquet` call, which _looks_ read only but due to a [specific line](https://github.com/denosaurs/plug/blob/9e38c65af6c9d66fea6f826e68fc0a0abc0848c4/mod.ts) in duckdb's dependencies, it asked for _write_ access, and Deno in Netlify's edge functions (so far as I could see) don't allow write access.

Never fear, duckdb has been [ported to wasm](https://github.com/duckdb/duckdb-wasm)!

The wasm version requires access to `globalThis` (which I _thought_ Deno had but it definitely didn't want to work), but I could get it working in Node. It also needed some web workers, but there's libraries in npm for web workers and finally it looked like I was able to deploy.

(Spoiler: this is the fail section of the post)

Every time I tried to make a request, the function would time out. I'm not absolutely sure why, but the code was definitely nasty looking and I'd guess it was trying to load in the wasm files into memory or some such thing and it just wasn't getting there fast enough.

At this point, after two days, I was about set on giving up. But I slept on it.

## A different approach

I considered whether I could create a bespoke data structure that allowed me to run a binary search (the simplest way I know to quickly pick a record out of a dataset).

The original data structure included two fields `ip_from` and `ip_to` with the expectation that you would query where your IP address (once normalised to a number) was between those values.

The maths to get the IP as a number is `16777216 * a + 65536 * b + 256 * c + d` (where a, b, c, d represent the values separated by periods).

The min and max `ip_from` were also within the 32bit range. The only data I really needed from the lookup was the timezone adjustment, and even then I didn't need to store `+05:45` in the database. I could read every unique timezone and map it to an array, then only store the array index using a single byte.

This meant for a single `ip_from` + the `timezone_index` I needed 40bits which was just 5 bytes.

Once I reduced the data down to series of 5 bytes per record, I noticed that the timezone index would repeat across some ranges of IP address, so I optimised the data and removed any running sequence of records where the timezone was the same.

That's to say if IP A and IP B and IP C all had timezone X, but IP D had timezone Y, the data would contain IP A-X, IP D-Y - allowing me to drop a lot of redundant data.

The final file size ended up at 2.7MB.

I compared two methods for finding my IP address in the dataset:

1. Open and read the binary dataset into memory and loop through 5 byte block at a time and exit once the right range was found.

The downside to this is that the data is immediately buffered into memory (and I can't continue with logic until that's done) but also if there's a common block of IP addresses towards the end of the dataset, it'll always take longer.

2. Get a file handle to the dataset and using a binary search method, use IO seek to read out only 5 bytes at a time, recursively calling until I have my data point.

The downside to this is that it's a little more complicated to code (though it's really 60 lines of code) and possibly more suspectable to errors (from my coding).

The upside is that the file isn't buffered, and from CPU usage testing, it's faster than the "loop through all the data" version. So this is the method I went with.

## Up to Netlify - and the gotchas

The biggest problem I ran into time and time again was the code running perfectly find locally (using `netlify dev`) but once it had deployed, either the build or the runtime would fail (examples above with the binary for duckdb being incompatible).

The other gotcha I struggled with was trying to load the dataset (or databases) I had created.

Locally I was able to correctly refer to files in the working directory, but nearly every time I deployed to Netlify either file couldn't be loaded or it was missing. One example early on was although I had LFS support in place for a large sqlite database, only the "pointer" to the file had landed in Netlify and I needed to add some extra layer of Netlify knowledge to let them know the file existed.

The problem often cited to solve this particular issue is to use the "zip-it and ship-it" bundler - which, honestly I couldn't get a good handle on how to do it. I wanted baby steps.

But then sometimes it would work… ¯\\_(ツ)_/¯ - I was going round in circles so many times I lost track of what was working and what wasn't…

However, only right at the end of this entire process did I finally discover a blog post that explains how to [manually include files into serverless functions](https://www.netlify.com/blog/2021/08/12/how-to-include-files-in-netlify-serverless-functions/).

The syntax is added to your `netlify.toml` file as (for example):

```yml
# Include all .db in all functions
[functions]
  included_files = ["*.db"]
```

So I finally have restored just one part of the "How many days to Christmas", since I need to know whether it's Christmas where *you* are, and not the server.

You can see the response in all it's glory here: https://ip2tz.isthe.link/?ip=1.1.1.1 (or remove the `ip` query for it to detect).

## A final comparison

I did manage to restore the old Maxmind version whilst writing this post, and it took the days of coding failures to make the process simpler for me, but by comparison, the maxmind database driven solution, on a warm serverless function reported the following usage in Netlify:

```
Duration: 4.93 ms	Memory Usage: 234 MB
```

Compared to my bespoke solution using the binary tree and custom dataset:

```
Duration: 2.67 ms	Memory Usage: 71 MB
```

So overall I'm happy where I landed. Now I'm off to carry on with restoring some more of my sites.
