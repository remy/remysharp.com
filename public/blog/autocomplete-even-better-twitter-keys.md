---
title: Autocomplete & even better twitter keys
date: '2008-09-22 15:23:31'
published: true
tags:
  - greasemonkey
  - project
  - twitter
  - web
modified: '2014-09-03 16:15:12'
---
# Autocomplete & even better twitter keys

So I've been going a bit greasemonkey mad of late, and with the recent release of [Twitter Keys](http://thenextweb.org/2008/09/16/twitterkeys-enhance-your-twitter-conversations/) I quickly found myself wanting something like tab completion for the twitter keys.

A few hours of weekend playing later, I've got automatic Twitter keys (or optionally tab completed).  But I've also decided to take it a little further and pull the autocomplete in to it's own greasemonkey script that can be run on any page.


<!--more-->

There's two versions:

1. Twitter Keys
2. Autocomplete for any site

<div style="padding:53.85% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1787506?h=049fb9e7a2&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Twitter Keys via Greasemonkey"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

For now you'll have to use [Greasemonkey](https://addons.mozilla.org/firefox/addon/748) to install (rather than a straight plugin), and if you want to add more shortcuts, you'll have to edit the script by hand - though I hope to create an interface soon.

[Get the twitter upgrade](/downloads/tweet_upgrade.user.js) or via [userscripts.org](http://userscripts.org/scripts/show/34004)

The autocomplete script (for use on any page) is available here:

[Get the autocomplete script](/downloads/auto_complete.user.js) or [userscripts.org](http://userscripts.org/scripts/show/34248)

Note that with autocomplete, you will need to open the greasemonkey script and add new shortcuts manually.  They only currently trigger on space (or new line).

## List of Twitter key auto completes

You can poke around the code, but here's a list of all the keys:

<div>
<div style="float: left;  width: 30%;">love : â™¥<br />
plane : âœˆ<br />
smile : â˜º<br />
:-) : â˜º<br />
:) : â˜º<br />
music : â™¬<br />
boxtick : â˜‘<br />
spade : â™ <br />
phone : â˜Ž<br />
darksmile : â˜»<br />
song : â™«<br />
box : â˜’<br />
whitespade : â™¤<br />
carrot : â˜¤<br />
sad :  â˜¹<br />
:-( : â˜¹<br />
:( : â˜¹<br />
note : â™ª<br />
female : â™€<br />
star : âœ©<br />
letter : âœ‰<br />
pirate : â˜ <br />
tick : âœ”<br />
male : â™‚<br />
darkstar : â˜…<br />
cross : âœ–</div>
<div style="float: left;  width: 30%;">
cook : â™¨<br />
random1 : â¦<br />
cloud : â˜<br />
peaceout : âœŒ<br />
king : â™›<br />
rose : â<br />
islam : â˜ª<br />
umbrella : â˜‚<br />
pen : âœ<br />
bishop : â™<br />
flower : â€<br />
tools : â˜­<br />
snowman : â˜ƒ<br />
right : â˜›<br />
-&gt; : â˜›<br />
darkknight : â™ž<br />
darkflower : âœ¿<br />
peace : â˜®<br />
sun : â˜¼<br />
left : â˜š<br />
&lt;- : â˜š<br />
knight : â™˜<br />
random2 : âœ¾<br />
ying : â˜¯<br />
christ : âœ</div>
<div style="float: left;  width: 30%;">
moon : â˜¾<br />
up : â˜<br />
rook : â™–<br />
snow : âœ½<br />
comet : â˜„<br />
down : â˜Ÿ<br />
pawn : â™Ÿ<br />
random3 : âœº<br />
prince : â˜¥<br />
cut : âœ‚<br />
write : âœ<br />
queen : â™•<br />
darkstar2 : âœµ<br />
copy : Â©<br />
tm : â„¢<br />
euro : â‚¬<br />
&lt;&lt; : Â«<br />
&gt;&gt; : Â»<br />
yen : Â¥<br />
wheel : âœ‡<br />
recycle : â™º<br />
retweet : â™º<br />
rt : â™º<br />
radioactive : â˜¢</div>
<div class="clear: left;"></div>
</div>
