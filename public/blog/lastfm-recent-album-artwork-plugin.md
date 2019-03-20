---
title: Last.fm Recent Album Artwork Plugin
date: '2007-07-26 00:41:40'
published: true
tags:
  - code
  - last-fm
  - plugin
  - wordpress
modified: '2014-09-03 16:15:12'
---
# Last.fm Recent Album Artwork Plugin

My blog is now running a WordPress plugin that shows the album covers from [Last.fm](http://last.fm) of songs I've recently listened to.  There's a lot of plugins [out there](http://www.google.com/search?q=wordpress+recent+album+plugin), but none that I found that did the job of getting the artwork, and certainly not for the most recent albums.

[Download the Last.fm recent album artwork plugin](/downloads/lastfm_albums_artwork.php)


<!--more-->

## Last.fm Integration

You'll need a [Last.fm](http://last.fm) account and the [iScrobbler](http://www.last.fm/group/iScrobbler) running to store the recent tracks at Last.fm.  To check, you can view the [recent tracks feed](http://ws.audioscrobbler.com/1.0/user/remysharp/recenttracks.xml) changing *remysharp* to your Last.fm username.

## Installing

[Download the Last.fm recent album artwork plugin](/downloads/lastfm_albums_artwork.php) and save it in your <code>plugins</code> directory (usually located in <code>wp-content</code>).

Then activate the plugin from the Plugins tab in your WordPress admin tools.

## Setup

Through the *Options* -> *Last.fm Recent Albums* tab fill out the required fields.

### Album Art Cache Settings

You must ensure the directory that you point the plugin to is writable.  You can use either full or relative paths for the album artwork.

For example, my album artwork is located at /albums/, so my URL is set to:

<pre><code>/albums/</code></pre>

Within my WordPress set up, this is physically located in <code>/home/remy/remysharp.com/htdocs/albums/</code>, but I've set the path to be relative in the settings, so it reads:

<pre><code>albums/</code></pre>

Since the root of my WordPress installation is <code>/home/remy/remysharp.com/htdocs/</code> this works just fine.

## Adding to your Blog

Once the setup is complete, use the <code>get\_lastFM\_album\_artwork()</code> function to add the album artwork to you blog.  My blog adds the code as follows (with the setup wrapping the elements with <code>li</code>)

<pre><code>&lt;?php if (function_exists(&apos;get_lastFM_album_artwork&apos;)) { ?&gt;
&lt;div class=&quot;lastfm&quot;&gt;
&lt;h3&gt;Recent Albums&lt;/h3&gt;
    &lt;ul&gt;
    &lt;?php
        get_lastFM_album_artwork();
    ?&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;?php } ?&gt;</code></pre>

## Behind the Scenes

Behind the scenes the code will only show album artwork if Last.fm have the album associated (there's a number of tracks that don't have that information linked).  If there's not enough [recent tracks from the feed](http://ws.audioscrobbler.com/1.0/user/remysharp/recenttracks.xml), the plugin will fill the rest of the albums based on the recently played albums (using timestamps from the artwork files).

The plugin will also avoid showing the same album cover twice.

## Problems?

If you have any problems or suggestions or questions about the plugin, please let me know and I'll do my best to help.
