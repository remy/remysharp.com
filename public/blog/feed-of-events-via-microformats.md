# Feed of Events via Microformats

A friend and colleague, Chris, has recently launched a gaming network site: [Thumbslap](http://thumbslap.com) which allows friends and the like to organise game meet ups online (or offline if they wish).

Pretty early on I could see how [Microformats](http://microformats.org/ "Microformats"), particularly the [hCalendar](http://microformats.org/wiki/hcalendar) should be applied, but what Chris really wanted to do the job was an automatic feed that your calendar software could subscribe to, and that would automatically updates, then, time permitting, Microformats could be added.

Ah ha! The solution lied entirely in Microformats!


<!--more-->

I'm not sure how I missed this nugget because it's been there for a good while now, *and* it helps build exactly the functionality that Chris needed:

[http://feeds.technorati.com/events/](http://feeds.technorati.com/events/)

Technorati offer the solution in two forms: one off download, and live subscribe, the difference being the protocol - http and webcal respectively.

By passing in my URL with hCalendar marked up Microformats, Technorati will parse the page and return it in an iCal format.

By linking to:

[webcal://feeds.technorati.com/events/http://2008.dconstruct.org/schedule/](webcal://feeds.technorati.com/events/http://2008.dconstruct.org/schedule/)

I will have a live calendar in iCal of the [dConstruct](http://2008.dconstruct.org) event schedule (which is actually where I spotted the webcal subscription method).  Alternatively I can add it manually (the URL) in my Google Calendar app.

No doubt Chris will be updating [Thumbslap](http://thumbslap.com) to include the Microformats via the user's homepage shortly!