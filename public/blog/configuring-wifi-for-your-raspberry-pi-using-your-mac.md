---
title: Configuring wifi for your Raspberry Pi using your Mac
date: '2013-05-27 17:30:05'
published: true
tags:
  - code
  - hardware
  - raspberrypi
modified: '2014-09-03 16:15:12'
---
# Configuring wifi for your Raspberry Pi using your Mac

This walkthrough assumes a pretty simple set up - and in my case I just grabbed a "latest wheezy SD card" [off Amazon](http://www.amazon.co.uk/gp/product/B008IU78EK/ref=oh_details_o00_s01_i00?ie=UTF8&psc=1). I booted once with an ethernet connection so I could do the initial `Raspi-config` steps.

**Caveat: backup your files!**

Next I powered down, plugged in the [wifi usb dongle](http://www.amazon.co.uk/gp/product/B003MTTJOY/ref=oh_details_o00_s00_i00?ie=UTF8&psc=1) - but then how do I tell the Pi which network to connect to?

I know that my Raspberry Pi won't always connect to the same wifi connection, so I wanted a simple way to quickly add a new SSID and credentials using my Mac. Ideally I could swap the SD card in to my mac, make a small change, then drop it back to the Pi. This is a short walkthrough explaining how to do just that.

**Note** *there is an alternative process that doesn't require Fuse which I've included in the footer of this post.*

## Alternatively...

I've decided to put this solution up first since it's the least destructive! If you can avoid using Fuse, then it's worth it.

If you don't like the idea of messing with the main partition that the Pi runs with on your mac, you can just make a simple change during your initial setup. Edit `/etc/network/interfaces` and change the `wpa-roam` to point to a location no your `/boot` partition, ie.:

    wpa-roam /boot/wpa_supplicant.conf

The `/boot` partition is the one that's read and writable by default *without needing Fuse*. Now you can put your `wpa_supplicant.conf` file in the root of this directory, and you can quickly add new networks for your Pi to connect to.

## 1. Install Fuse

[Fuse for OSX](http://osxfuse.github.io/) with the MacFuse compatibiltiy layer enabled during installation.

You also need to install [fuse-ext2](http://sourceforge.net/projects/fuse-ext2/) - which doesn't come with Fuse for OSX.

## 2. Change fuse mount to read/write

By default (I found), the SD card's 2nd mounted drive (i.e. the Pi drive) would have read-only permissions set (you can see this if you cmd+i on the drive - mine was called "disk1s2").

This means we can't modify anything, but let's change that. On your Mac, in the terminal, run:

    sudo sed -e 's/OPTIONS="auto_xattr,defer_permissions"/OPTIONS="auto_xattr,defer_permissions,rw+"/' -i .orig /System/Library/Filesystems/fuse-ext2.fs/fuse-ext2.util

This tip comes from [Google Groups](https://groups.google.com/d/msg/osxfuse-group/fQec4k0bJVw/QPqq_IuSWDcJ) which also explains how to revert that change. Note that you're now forcing all mounted drives with Fuse to be read/write.

**Important** you could (like I did) *slightly* corrupt the drive by mounting it on the Mac. I had to run a `fsck -y /dev/root` to fix it - but it had to be attached to my TV and with my backup usb keyboard (which frankly I could have thrown away years ago). Equally, you can edit `/etc/default/rcS` and set `FSCKFIX=yes` so it'll fix itself in headless mode (via [ask Ubuntu](http://askubuntu.com/a/151742)).

## 3. Edit wpa_suppliment

Now, from your Mac you can edit the Pi drive, which means write access to `/etc`. So (again, I had a default set up, you *may* need a few more steps than this - Google is your friend).

Append the network you want to connect to the file `/etc/wpa_supplicant/wpa_supplicant.conf`.

    network={
       ssid="<MY_SSID>"
       proto=RSN
       key_mgmt=WPA-PSK
       pairwise=CCMP TKIP
       group=CCMP TKIP
       psk="<MY_SSID_PASSWORD>"
    }

## 4. Boot your Pi

If the Pi can see the network you specified, it should be able to connect to it.

Now the question is how do you get the IP address of your Pi to connect over ssh. I'm thinking about having it automatically email me it's IP which can be determined using:

    /sbin/ifconfig wlan0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'

Then (and this isn't tested...yet), I can add a script to `/etc/network/if-up.d/` to email me the address:

    #!/bin/bash

    # Ignore the loopback
    [ "$IFACE" != "lo" ] || exit 0

    /sbin/ifconfig wlan0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}' | mail -s 'Pi online' me@example.com

Mailing isn't quite as easy as that, but that's your problem to solve. I did it with [nodemailer](https://github.com/andris9/Nodemailer) and some JavaScript (which was basically the example code).
