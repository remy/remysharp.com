---
title: 'Removing "shows" from Spotify'
date: '2021-08-17'
image: /images/spotify-social-card.jpg
tags:
  - web
  - code
---

# Removing "shows" from Spotify

For some reason Spotify has increasingly been pushing shows and podcasts as a thing I might want to listen to. I don't. I'm happily paying for Spotify so I don't have to listen to ads, so instead I seem to get them in the podcast form.

I asked Spotify's support how to turn this off, and they said:

> We're afraid that it's not currently possible to remove these recommendations. Rest assured, we'll let the right folks know this is something you'd like to see soon.

So yeah… I won't be holding my breath.

This to me, falls within the right to repair (which I really don't understand or agree with the push back) - so I **fixed** it myself.

<!--more-->

## TL;DR

***Updated 2022-02-22*** - Spotify changed their process, so I've updated the code to strip episodes and shows as of version 1.1.79.763.x.

I only know how to do this on macOS. I've dug a little into Windows, and maybe you might find a way or use something from this post that might help - but I can't see it from the paths I've taken.

First close Spotify, then in a terminal, run the following commands. Note that if any one command breaks/errors, then it's wise to stop and look at the error. The possibilities of error could be location of Spotify being different, or tools having slightly different versions (I'm using zip, unzip and sed - but these for me are all the pre-installed macOS flavours):

```
$ cd /Applications/Spotify.app/Contents/Resources/Apps/
$ cp xpui.spa ~/Desktop/xpui-backup.spa # backups are good
unzip -p xpui.spa xpui.js | sed 's/withQueryParameters(e){return this.queryParameters=e,this}/withQueryParameters(e){return this.queryParameters=(e.types?{...e, types: e.types.split(",").filter(_ => !["episode","show"].includes(_)).join(",")}:e),this}/' > xpui.js
$ zip xpui.spa xpui.js
```

You can also download this as a shell script: [spotify-fix](/downloads/spotify-fix) so you can re-run every time Spotify updates (make sure to `chmod u+x spotify-fix` and move to a directory in your `$PATH`).

Now starting Spotify should be completely void of shows and podcasts on the home screen. You can still find them and still play them, but they just won't be vying for your attention.

If this doesn't work for you, or your system is different, look for the `withQueryParameters` method in the `xpui.js` file and modify the `e` object being returned, stripping values from `e.type`.

## What's actually happening?

Using [Charles Proxy](https://www.charlesproxy.com/) I was able to identify the Spotify API call that _looked_ like it was asking for shows (along with playlists, etc). Specifically this request stood out:

```{.wrap}
GET https://api.spotify.com/v1/views/personalized-recommendations?timestamp=2021-08-16T21%3A38%3A38.352Z&platform=web&content_limit=10&limit=20&types=album%2Cplaylist%2Cshow%2Cartist%2Cstation%2Cepisode&image_style=gradient_overlay&country=GB&locale=en&market=from_token
```

Looking at the query I can see:

```
types: album,playlist,show,artist,station,episode
timestamp: 2021-08-16T21:40:01.499Z
platform: web
content_limit: 10
limit: 20
image_style: gradient_overlay
country: GB
locale: en
market: from_token
```

Taking that request, and removing the `show,` from the `types` property and then composing the request in Charles Proxy (a handy feature) - I could confirm that the shows and podcasts vanish from the response.

The next step is to find the query and edit it in the source code.

Using grep and [ripgrep](https://github.com/BurntSushi/ripgrep) didn't gt me anywhere. I could find partial mentions of the URL in the binary Spotify app but not enough that it would actually make the API call.

I can't remember exactly _how_ I landed on it, but this [github issue comment](https://github.com/mrpond/BlockTheSpot/issues/83#issuecomment-888522465) gave me the clue I was looking for. There's a file called **xpui.spa** that is a zip file that contains CSS. If there's CSS tucked away in that file, there's bound to be JavaScript too.

Renaming and unzipping yielded 188 files and grepping the files gets me closer:

```sh
$ rg "personalized-recommendations"
xpui.js
```

One single file. My screenshot below isn't great, but it looked like, initially, I was looking for the `a` variable…which proved…useless!

![A screenshot of compressed code](/images/spotify-xpui.png)

However, looking for some of the other parameters (specifically "station") _did_ yield results and right there was a string looking mostly like the query string I was hunting for:

```
types:"album,playlist,artist,show,station,episode"
```

So using vim (rather than VS Code as it would try to reformat and I didn't want that), I removed the `show,` and `,episode` part, saved the file and put it back into the `xpui.spa` file using hacking through their `withQueryParameters` method:

```sh
$ zip xpui.spa xpui.js
```

Now loading Spotify on the desktop had no annoying shows 🎉

What was mostly fluke too is that I'd only listened to one podcasts in my most recent listening and the API request does have a little more than the six shows (on my desktop certainly) so when the podcast was removed, a suggestion that was normally hidden then appeared.

The "before" Spotify is at the top and "after" at the bottom.

![](/images/spotify-desktop.jpg)

But, could I do the same for mobile?

## Mobile Spotify (for Android)

In truth my mobile usage is very different. I rarely see the interface to Spotify as I'm either listening in the car, or I'm switching what playlist I was listening to on my desktop to the mobile phone.

However, I wondered if I could do the same.

The short answer is yes, but not using the same method, but also it's limited to the Wifi network I'm on.

Using Charles Proxy to run a "Map Remote" I could redirect the API requests to my local machine, intercept and rewrite the response - effectively a attack-in-the-middle.

_Finding_ the URL to intercept was the hard part. Charles Proxy can proxy mobile devices and you need to enable SSL proxying. Except that installed/native apps on Android (sorry, didn't look at iOS - but I'd bet the outcome is the same), those native HTTPS requests can't be configured to trust Charles Proxy's certificate.

To achieve this you need to _build_ the installable app with a specific permission enabled (I'm guessing it's debug permission). So do I have the source code to Spotify for mobile? Nope.

So…

Hack the app!

It turns out that patching this specific bit of functionality isn't so hard, or at least it's squarely in "copy-and-paste-land". I found this very detailed article on [Intercepting HTTPS on Android](https://httptoolkit.tech/blog/intercepting-android-https/) and tucked away, right at the end, was the gold:

> That can be quite complicated, but fortunately there's a tool called [apk-mitm](https://github.com/shroudedcode/apk-mitm#apk-mitm) that can do all of this for you!

```sh
$ npx apk-mitm ./downloaded-app.apk
```

The article suggests [apkpure](https://apkpure.com/), I needed a copy of the APK app, in fact I specifically needs the **xapk** file (which I did find) and using the command line above was able to modify the APK so that I could then inspect the traffic from Spotify on my mobile phone to find the API call.

Frustratingly it was a totally different location:

```{.wrap}
GET https://spclient.wg.spotify.com/homeview/v1/home?platform=android&client-timezone=Europe%2FLondon&locale=en&salt=<removed>&video=true&podcast=true&is_car_connected=false
```

Once I had that part, I inspected the JSON being returned and established that it would need a transform to pull out the unwanted shows. There _was_ a query string that looked to include podcasts (aka shows?), but setting it to `false` didn't remove them as I wanted so I'd have to run with the transform.

I've [posted the code in a github gist](https://gist.github.com/remy/0aee145a71044f07e822c36894ef52bb) as it's rather long (for this post) and rather bespoke and I suspect that in time Spotify will modify their structures so it might not last.

The final part is to configure Charles Proxy on the Android with this particular Wifi.

The whole process is a lot of hoop jumping - and then if my local machine sleeps whilst I'm still proxying, my wifi borks (since it's expecting Charles running on a sleeping machine to proxy all traffic).

I thought about whether I could install something on my home router, but this would require some of the specialist work that Charles does to both send a custom SSL cert but also proxy manually and I figured this was good enough.

## Wrap up

I'm sure I could automate the desktop process - I just wanted to get this post written. I don't think my mobile solution is particularly useful beyond experimentation and learning.

Ultimately though, I'd like Spotify to keep doing a good job of music and just leave podcasts alone - _stay in their lane_ as a friend put it to me. Or certainly provide a UI option to turn this off, since it's clearly baked into the API in the first place.
