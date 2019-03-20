---
title: Let's get Dashcode working again
date: '2007-07-30 10:02:28'
published: true
tags:
  - code
  - applescript
  - dashboard-tag
  - dashcode
  - hack
  - mac
  - widget
modified: '2014-09-03 16:15:12'
---
# Let's get Dashcode working again

<div class="update">
    <p><strong>Update:</strong> why is it you always find the solution after you post a work around?  Anyway, you can patch both <a href="http://alex.clst.org/dbd/?p=561">Intel</a> and <a href="http://alex.clst.org/dbd/?p=562">PPC</a> based Dashcode apps using the information found at <a href="http://alex.clst.org/dbd/?p=561">alex.clst.org</a></p>
</div>

Dashcode has expired on time, but Leopard wasn't delivered on time, and now we're left for at least 3 more months without this excellent, free development environment.

Since Apple don't seem to be releasing another beta until Leopard is out it looks like we're forced to look to alternative methods of widget development.  So, either someone needs to get in there and patch Dashcode around the expiry or you can use [my script](http://remysharp.com/2007/07/30/lets-get-dashcode-working-again/#script) to get it going again.


<!--more-->

## Patch around the expiry

Sadly for the time being, I've not too familiar with Objective-C and developing for the Mac.  However programs run on logic, so this is how far I've got:

1. The date we're looking for is **2007-07-15**
2. I've run <code>strings</code> on the Dashcode package and <code>grep</code>'ed for the date to no avail
3. It makes sense to think the expiry is being checked using two [NSCalendarDate](http://developer.apple.com/documentation/Cocoa/Reference/Foundation/Classes/NSCalendarDate_Class/Reference/Reference.html) to compare and continue
4. Running the ObjectAlloc app (/Developer/Applications/Performance Tools/) I can see the NSCalendarDate objects being created, and most importantly, can see one of the objects contains: 2007-07-15 00:00:00 +0100, and the other 'now'.
5. Based on all of this, I have to assume the date is hardcoded in to either the binary or it's resources, therefore it can be changed - it just needs the year leaping forward.

![Dashcode Memory Inspection](/images/dashcode-memory-inspection.png)

If anyone comes up with a patch or hack - that would be superb.

<h2 id="script">Using AppleScript to get around the expiry</h2>

I've managed to knock together a simple AppleScript that will reset the date, run Dashcode and then set the date back.  The only prerequisite is that you set the date and time automatically via the Date & Time System Preference panel.

<a href="applescript://com.apple.scripteditor?action=new&amp;script=set%20username%20to%20%22YOURUSERNAME%22%0Dset%20passwd%20to%20%22YOURPASSWORD%22%0Dset%20bypass_year%20to%20%222007%22%0Dset%20bypass_month%20to%20%2205%22%0Dset%20bypass_day%20to%20%2214%22%0D%0Dset%20date_cmd%20to%20%22date%20%22%20%26%20bypass_month%20%26%20bypass_day%20%26%20%22%60date%20%2B%25H%25M%60%22%20%26%20bypass_year%0D%0Ddo%20shell%20script%20date_cmd%20user%20name%20username%20password%20passwd%20with%20administrator%20privileges%0D%0Dtell%20application%20%22Finder%22%0D%09run%20application%20%22Dashcode%22%0Dend%20tell%0D%0Dtell%20application%20%22System%20Preferences%22%0D%09activate%0D%09set%20current%20pane%20to%20pane%20%22Date%20%26%20Time%22%0D%09quit%20%22System%20Preferences%22%0Dend%20tell%0D%0Dtell%20application%20%22Dashcode%22%0D%09activate%0Dend%20tell">View the AppleScript in your Script Editor</a>

<pre><code>set username to "YOURUSERNAME"
set passwd to "YOURPASSWORD"
set bypass_year to "2007"
set bypass_month to "05"
set bypass_day to "14"

set date_cmd to "date " &amp; bypass_month &amp; bypass_day &amp; "`date +%H%M`" &amp; bypass_year

-- set the date to allow Dashcode to open
do shell script date_cmd user name username password passwd with administrator privileges

tell application "Finder"
	run application "Dashcode"
end tell

tell application "System Preferences"
	activate
	-- forces a reset on the date
	set current pane to pane "Date &amp; Time"
	quit "System Preferences"
end tell

tell application "Dashcode"
	activate
end tell</code></pre>
