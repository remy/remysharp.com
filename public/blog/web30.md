# #Web30

This week marks the 30th _birthday_ of the web. I've had my own involvement in this momentous date in history with being part of the WorldWideWeb restoration team at CERN last month, and having returned from the #Web30 event yesterday (both at CERN and at the London Science Museum), I thought it fitting to pay tribute on my blog too.

<!--more-->

## Because of the web…

I have a career that I have complete control of, met many amazing people, and have dear friends whom I've come to love, access to a seemingly unlimited wealth of knowledge, had my ideas and views challenged and been able to grow (healthily) as a member of society and finally: a place to express myself.

The web not simply connect documents, but, for me, it connects people.

## My first web

I started university in 1997 and all students were given a unix home directory. I think it only towards the end of term (in 1998) that I realised that the home directory was also mapped to a URL on the web.

So technically, my first home was:

`http://infosys.kingston.ac.uk/~K974592/`

I spent summer '98 working on adapting one of my lecturers' Java Applets that showed a map of the borough of Kingston, turning it into a [dancing stick animation](https://web.archive.org/web/20030222010510/http://www.kingston.ac.uk/~ku05883/Animation.html)

I also had an Angelfire page (somehow missing the memo about GeoCities being cool). I can't for the life of me remember the username (or even URL structure) so I can't find an archive copy - though god knows what lies in wait (I suspect it might have been _jedifish_).

## My first web site

Onward to 1999, and thanks to LineOne (later swallowed by BT and later still swallowed up entirely), I had a full web site. A URL I could call home (I'm not ready to share this yet, there's some content that isn't ready to be reanimated in 2019).

I remember buying an Intel 385 (I _think_) from the local computer fair for £50 (a pretty huge amount for a student).

It was a Sunday, which meant that to get a browser on the machine, I'd have to wait until Monday when the newsagent would open, and I could buy a PC magazine that would hopefully include a floppy disk with Internet Explorer 3.

My first web site was coded using partly notepad.exe and partly my own tool I'd written in 1996 (aptly named) HTML Writer v4.

You can marvel at my VBScript and JavaScript combo that made a DHTML filter run (like spotlights on at a hollywood movie):

```html
<script language="VBScript">
<!--
Sub Window_OnLoad()
	call logo.filters.item(0).Apply()
	logo.style.visibility=""
	call logo.filters.item(0).Play()
End Sub
-->
</script>
<script language="JavaScript">
	var x=200;
	var y=110;
	var direction=0;
	window.onload = setlights;


	function setlights()
	{
		litlogo.filters[0].clear();
		litlogo.filters[0].addcone(440,250,05,200,110,250,250,250,60,10);
		litlogo.filters[0].addAmbient(60,60,60,100);
		setTimeout ( "MoveItNow()", 10 );
	}


	function MoveItNow()
	{
		if(direction==1)
		{
			x = x-5;
			y = y+2.5;
			if (y==150)
				{direction=0;}
		}
		else
		{
			x = x+5;
			y = y-2.5;
			if (x==300)
				{direction=1;}
		}
		litlogo.filters[0].movelight(0,x,y,15,1);
		setTimeout ( "MoveItNow()",50 );
	}
</script>
</head>
<body>
<center>
  <div id="litlogo" style="WIDTH:280;HEIGHT:144; visibility:visible; filter:light(enabled=1);">
    <dd><img id="logo" src="/img/Sharq_sm.jpg" style="filter:revealTrans(Duration=3.0, Transition=12);VISIBILITY:hidden" alt="Sharq Banner"></dd>
</div>
</center>
<hr width="90%">
</body>
</html>
```

…and no, I've no idea what the `<dd>` is doing around the `<img>` element…!

## Web 2.0 and me

As part of my university course I was to do a year industrial placement. By some fluke my lecturer visited a company (that already had a placed student the year above me) and recommended the company get in touch with me.

I was invited to an interview, and although apparently I hadn't impressed the boss during the process, there was something I commented on right at the end that landed me the job.

That job was working for a digital consultancy called [Gallio](https://web.archive.org/web/20010401050918/http://www.gallio.com/index.html) (apparently named after a drink…). It was a tiny team that usually hovered around 4 people. The boss, Mark, would mentor me in all aspects of business development. He is probably responsible for the developer and my entrepreneurial skills (or desires) I have and am today.

The entire business was about the web and we exploded through the Web 2.0 era and came out the other side healthy whilst our competitors were supernova'ing all around us.

My long lasting domain come from this era: https://ihatemusic.com (registered in 1999 and put to purpose in 2002).

I registered a number of domains over the early 2000s, some of which I still have, it was a time of ideas and the web was an exciting place to be part of.

## Onwards

Home now is remysharp.com (where you're possibly reading this). It has been since 2006 and I hope to keep the URL and links working for many many years to come.

Most of my livelihood today comes from the web. Both in _how_ people find my business and the business that I produce.

The conference that Julie and I run, ffconf, is outside of the web but exists because of the web and exists to serve the web.

This year, 2019, I was able to give something back to the web in our team work at CERN and the [WorldWideWeb simulator](https://worldwideweb.cern.ch) and lifetime experience, again, down to the existence of the web.

So thank you Sir Tim Berners-Lee. Thank you to the satellite of people who help to realise the web. Thank you to the links that you have created and on occasion connected to me.

Cheers to the web. Cheers to working on bringing _the other half of the world_ to the web. Cheers to the next 30 years.
