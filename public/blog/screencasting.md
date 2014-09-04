# Screencasting

I've been doing screencasts for [jQuery for designers](http://jqueryfordesigners.com) for almost 6 months now, and I'm a big fan of peer learning/teaching - which I hope to achieve through screencasts.

I'd like to share some tips that I've come to use in each session I run that might be helpful for budding screencasters.  Apologies as I'm coming from a Mac direction, though the concepts should be the same for a PC.


<!--more-->

## The Screen

You need to decide what resolution you want to run your screencasts at, and specifically if this should be full screen or not.

I prefer full screen screencasts because you get a complete view of the computer.

### Partial Screen

If you choose to only show a small area of the screen, you next need to decide whether the screen is going to follow the mouse or not.  If you decide to follow the mouse, make sure the follow speed is as low as possible.  This makes it much easier for the view to follow your movement, rather than the jarring effect it can have to the smallest movement.

You also need to be conscious of mouse usage.  For example, I'm forever using the mouse to highlight the lines I'm reading - you definitely want to avoid that if you're following the mouse.

### Full Screen

If you go for full screen, the first thing you need to ask is resized/compressed resolution or not.  I personally don't like the compression effect you get with 1024 screencasts compressed in to 640 - so I record and play back at 800x600.

The way I organise it is to have a separate user account running at 800x600.  It's faster than switching the resolution for my active user, because of the resulting cleanup process.

## Technical Settings

If you're not planning on embedding a video self portrait, then these settings have worked very well for me, and they also keep the file size down:

* Audio: medium, 20Khz AAC mono
* Normal frame rate: 12
* Quality: 4/6 (on the slider)
* Compression: H.264

Since I use iShowU, I've also set it to automatically hide (via the prefs) when recording starts, and I usually allow 2 seconds lead in and lead out to ensure everything is captured.

## Applications

### Recording

I use [iShowU](http://www.shinywhitebox.com/home/home.html "iShowU").  There's been a lot of fuss over [ScreenFlow](http://www.varasoftware.com/products/screenflow/ "Vara Software : ScreenFlow - Professional Screencasting Studio") and it definitely looks like hot stuff, but iShowU comes in at around Â£20 odd - which makes it a good starting app.  I think the decision depends on the contents of your screencasts.

Key logging - I occasionally use [KeyCastr](http://stephendeken.net/wiki/software/keycastr/ "stephendeken.net"), it's free and helps when you're using control keys.

Mouse highlighting - since I don't use ScreenFlow, I've got a tiny app that does that for me if ever required.  [Mousepos&#233;](http://www.boinx.com/mousepose/overview/ "Boinx Software - Mousepos&#233;"), admittedly I got it for from via MacHeist, but it does the job nicely - though I've never used it in a full screencast.

### Conversion

I convert my videos to flash and to iPhone compatible formats (the latest being resized to 640x480).  I tried doing this through QuickTime before and a couple of other apps, and often the file size would be too big, or there were quality issues.

I now exclusively use [VisualHub](http://www.techspansion.com/visualhub/ "VisualHub: The Universal Video Converter for Mac.") which is exceptionally cheap and you drag and drop your video in for conversion.

### General Apps

On the whole, I reduce what applications are running for the screencast, because it reduces the margin for error (and thus having to start again).  I shutdown any app not required, and close all the system menu apps I can (i.e. Twitterific, etc).  A good trick is to go through everything across the menu you don't need and remove is from the System Preferencee.  For example, the date or time isn't required in your screencast, so remove it.

## Presentation

### Brand

I started off with a plain text document showing the title for the screencast and showing that it was covered under Creative Commons.  I've since created desktop image that has the title of the site slap bang in the middle, along with license and links at the bottom of the image.  I think it makes for a good strong starting image, and I've seen it work very well on other screencasts.

### Rehearse

Rehearse, rehearse, rehearse.  In fact, I often fluff my screencasts 3 or 4 times before I get in to the flow of things.  If you can make it in one take: superb. If not, make sure you know how to pause the screencast - but be very wary that when you resume, you're the same distance from the mic as when you stopped - as this will be noticeable in the play back.

### Hardware

If you can get yourself a good mic, then I'd recommend the [Samson C01U](http://www.samsontech.com/products/productpage.cfm?prodID=1810).  The sound is much better than the internal mic, but you'll have to boost the sound a bit, since the internal mics are really sensitive.  The Samson costs about Â£60, on top of which I've got a pop filter, and because I don't have a proper boom to hold the mic, it's all a bit precarious when recording!

## Hosting

[Vimeo](http://www.vimeo.com/ "Vimeo, Video Sharing For You") is a good starting point for hosting.  I prefer to have control over the files and I host from S3 (I'll be posting shortly on how to do this and track downloads through Google).

I strongly recommend you don't host on your primary web server. If you do, and there's a rush of traffic, all the web server processes get caught up with serving your 20Mb screencast, the knock on effect is that pending traffic queues up, and eventually your machine hits the dirt.

## Have Fun!

If it's fun for you, it'll keep your viewers interested.  Don't worry about messing things up - if it's small, your viewers will forgive you, and it gives your screencast a more human touch.