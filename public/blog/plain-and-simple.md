---
title: Plain and simple
date: '2007-09-25 16:07:00'
published: true
tags:
  - bookmarklet
  - css
  - dconstruct
  - typography
  - web
modified: '2014-09-03 16:15:12'
---
# Plain and simple

<p><a href="http://cameronmoll.com/" title="Authentic Boredom ~ Delivered weekly by Cameron Moll">Cameron Moll</a> gave <a href="http://cameronmoll.com/speaking/goodgreat/">a presentation</a> at <a href="http://2007.dconstruct.org/" title="dConstruct 2007: User Experience Design Conference">dConstruct 2007</a>.</p>

<p>At one point during the presentation, he demonstrated how he checked that the typography still held the weight on the National Gazette front page redesign (pg. 42).</p>

<p>Since they're fun nuggets of code, I've written a simple bookmarklet that strips colour, images and background decoration from the page, leaving you just the content and typography.</p>

<p><a style="font-size: 150%; text-align: center;" href="javascript:(function(){var c=function(e){if(this==window)return new c(el);var a=/*@cc_on!*/0;var o={};if(a){o=e.getBoundingClientRect()}else if(document.getBoxObjectFor){o=document.getBoxObjectFor(e)}else{o={height:e.height,width:e.width}}return o};var f=document.getElementsByTagName('*');var i=f.length;var d=el=el2=s=null;var g='data:image/gif;base64,R0lGODlhAQABAIAAAMJ0IgAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';var b=document.body;var h='height';var w='width';while(i--){el=f[i];s=el.style;s.background='#fff';s.backgroundImage='none';s.border='0';var j=el.nodeName;if(j=='IMG'||(j=='INPUT'&amp;&amp;el.type.toLowerCase()=='image')){d=c(el);el.height=d[h];el.width=d[w];el.src=g}else if(j=='OBJECT'||j=='EMBED'||j=='IFRAME'){el2=document.createElement('img');el2.src=g;if(el[h]||el[w]){el2[h]=el[h];el2[w]=el[w]}else if(typeof el!='function'){d=c(el);el2[h]=d[h];el2[w]=d[w]}el.parentNode.replaceChild(el2,el)}else{s.color='#000'}}})();">Plainify</a></p>

<p>Drag and drop the 'plainify' link to your bookmark bar to install.</p>
