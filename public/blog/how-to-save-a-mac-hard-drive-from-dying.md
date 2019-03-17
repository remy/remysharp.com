---
title: How to save a Mac hard drive from dying
date: '2006-09-27 20:14:13'
published: true
tags:
  - code
  - apple
  - fix
  - itunes
  - mac
modified: '2014-09-18 15:07:21'
---
# How to save a Mac hard drive from dying

Recently [Apple](http://www.apple.com) brought out the latest update to iTunes - with the promise of [cool features](/2006/09/12/itunes-first-look/): cover flow, gapless playback and other bits and bobs.

Some users have reported bugs in the new version (I even spotted one<sup>*</sup>), but little did Andrew, an old school friend, realise that the biggest feature he would benefit from would be the bricking<sup>**</sup> of his iBook.  [He was less than impressed](http://cultcollectors.com/blog/index.php/2006/09/13/video-killed-the-radio-star/).

<small>* Whilst playing a shared playlist, and iTunes is in the background - each song will play twice.  Odd.</small>

<small>** The process of nuking a machine so badly that the only thing it's good for is holding paper down on a windy day.</small>

Andrew's machine would boot, but it would hang on the a blank screen and the log in smiley window would never come up.

What's a guy to do?  Save the day of course.


<!--more-->

For this recipe you will the following ingredients:

1. One Mac with a dead drive.
2. One working Mac (if you don't have one, phone a friend) - even better if it's the same OS version.
3. Firewire cable (about 10 notes off ebay).

Cooking time: about 1/2 a day.

Apple machines all have a series of [boot up keys](http://www.jacsoft.co.nz/Tech_Notes/Mac_Keys.shtml) that can be used to launch the machine in different modes.

In particular, target mode (holding 't' on restart) will boot the machine up as a hard drive accessible via the firewire port.

Boot the sad machine up in target mode and the other (happy) machine will see it as an external firewire drive.

## Step 1 - BTFU

Now that you've got the drive available, assume the worst.  The worst outcome is you can't recover the drive, and you'll need to buy a new one.

Back the f\*\*\* up.  Copy anything that you can't recover else where to the happy mac.

If you find that the backup crashes or hangs at any point, **pull the firewire out** and reboot the sad machine.  It'll be fine, it's likely that the bad part of the disk has been accessed and the drive can't be read.

Start the process again and avoid the *area* that caused the backup to hang.  Depending on the severity of the problem, you may find this is only happening on a single file or two.

## Step 2 - Disk Repair

While the sad machine is connected to the happy machine, open Disk Utility (hiding in the Applications -> Utility folder).  You should find the external firewire drive listed.

**Don't, repeat: don't, go and nuke the happy machine's drive.**  You're your own worst enemy if you do!

Select to 'repair' the firewire drive, and let the Disk Utility go about it's business.  It can take quite a while, so go get a coffee, make a sandwich or whatever takes your fancy.

If all has gone well, the bad sectors on your drive have been flagged, and the Disk Utility has told you that some of the disk had errors but they're repaired.  This is good.

Note that from the tests we did, booting the sad machine from the Mac OS installation disks allows you to run the Disk Utility (i.e. it's not connected to another machine), but repair would hang and in fact, not repair :-(

## Step 3 - The Manual Recovery Magic

Once the Disk Utility has done it's job, the disk might be all good to boot with.  It wasn't in our case.  Some system files had been sitting on the corrupted part of the disk, meaning that it still wouldn't boot up.

The Disk Utility had created a handy directory pointing out all the corrupt files.  Take note:

`/Damaged Files/`

Ingeniously named, this directory contains symlinks<sup>*</sup> to the individual files that are corrupted.

<small>* A symlink is a file that *points* to the original file.  Akin to a shortcut, but it's the UNIX name (plus, they're smarter than shortcuts, but that's another conversation).</small>

Caveat: The following all assumes the happy mac is the same OS as the sad mac.  You will need to get these files manually (explained below).

### Step 3 and a half - Manually Getting a Copy of the System Files

Skip this section if the two machines are the same.

You should really both be on the latest OS, but none the less, download the Apple [software update](http://www.apple.com/downloads/macosx/apple/macosxupdate1047comboppc.html) (this may have changed since writing this article, so please do a little checking around).

Download [Pacifist](http://www.charlessoft.com) and install the app.  Use Pacifist to open the Mac OS X Update Installer package file (which ends in .pkg) and extract the files you need to recover.

### Step 3 continued

Using Terminal (you might want to familiarise yourself a little with UNIX type commands via [Google](http://www.google.com/search?q=mac+terminal)) you can show where the symlink points to (the command I use is 'ls -ltr'):

	$ ls -ltr

	drwxr-xr-x     4 root  wheel   136 Jan 14  2006 Versions/
	lrwxr-xr-x     1 root  wheel    26 Jan 14  2006 Resources@ -> Versions/Current/Resources
	lrwxr-xr-x     1 root  wheel    30 Jan 14  2006 BezelServices@ -> Versions/Current/BezelServices

The first item is a directory.  The second and third are symlinks, note the pointer symbol (note the prefix in the permissions, 'd' meaning directory, 'l' meaning link).

**Very carefully**, follow the damaged file symlinks, and copy from the happy mac to the sad mac.  This can also be done via the Terminal tool if you like:

	cp /Library/example.plist /Volumes/Machintosh\ HD\ 1/Library/example.plist

You can also copy directories using 'cp -r SOURCE TARGET'.  If you find you don't have permission (i.e. cp: Permission denied) prefix the entire command with 'sudo' - this will then prompt you for *your* password.

**IMPORTANT**: if the corrupted file is a symlink, i.e. you should 'cd' in to the directory the damaged files symlink is pointing to and check out each file, if it is a symlink, you should create these from scratch - just to be safe.

For example:

	cd /Volumes/Macintosh\ HD/[..shortened..]/Versions/
	[remy@Powerbook Versions]$ ls -ltr
	total 8
	lrwxr-xr-x   1 root  wheel    1 Jan 14  2006 Current@ -> fewkljfw
	drwxr-xr-x   4 root  wheel  136 Sep 15 09:29 A/

In the example above, the 'Current' symlink is corrupted.  It's very easy to fix - but I've used the happy mac to check where is should point to (turns out it points to the 'A' directory in the same directory).

	rm Current
	ln -sf A Current

'ln' creates a new symlink from 'A' called 'Current'.

Once all the files are copied across, you're done.

## Step 4 - Hit and Hope

Reboot the sad mac.  Go through the rigour of updates and let it do it's thing.  We had to leave Andrew's machine for several hours while iTunes poured through the gapless playback processing - though it looked like it had hung.

It **had** managed to boot back in to the OS and programs were running, so we allowed iTunes to get on with it.

The happy couple were reunited and [all was well again](http://cultcollectors.com/blog/index.php/2006/09/22/the-return-of-the-mac/).
