---
title: Grid Tools
date: '2008-07-25 15:40:10'
published: true
tags:
  - bookmarklet
  - code
  - css
  - framework
  - grid
modified: '2014-09-03 16:15:12'
---
# Grid Tools

I've recently been doing more and more cutting from mocks to HTML & CSS and one particular job required me to work to a specific grid layout.

In working to these grid layouts, I've created a couple of tools to make generating and working with the grids a little easier.


<!--more-->

## Generating the Grid

There's a few tools for generating PSDs and calculations for grid, but since I'm a real lazy guy - I actually want something to generate the CSS for me.

I use [29digital's grid calculator](http://www.29digital.net/grid/ "Grid Calculator") to work out the details of the grid.  Then once the right grid is configured, I'll use the following bookmarklet to generate the CSS required:

<a style="font-size: 150%;" href="javascript:(function(){function%20g(f){return%20parseInt(document.getElementById(f).value)}var%20a=g('columnsvalue'),b=g('columnwidthvalue'),c=g('gutterwidthvalue'),d='',i;d=%22.column%20{%20margin:%200%20%22+c+%22px%20%22+c+%22px%200;%20float:%20left;%20}\n.last%20{%20margin:%200%200%20%22+c+%22px%200;%20}\n%22;for(i=0;i<a;i++){d+=%22.span%22+(i+1)+%22%20{%20width:%20%22+((b*(i+1))+(c*i))+%22px;%20}\n%22}alert(d)})();">Grid CSS</a>

This gives me a CSS grid layout such as the following for a 6 column 66px wide grid layout with 14px gutter:

<pre><code>.column { margin: 0 14px 14px 0; float: left; }
.last { margin: 0 0 14px 0; }
.span1 { width: 66px; }
.span2 { width: 146px; }
.span3 { width: 226px; }
.span4 { width: 306px; }
.span5 { width: 386px; }
.span6 { width: 466px; }</code></pre>

## Working with the Grid

The next step I'll take when working up the markup, is to include the code from <a href="http://gridlayouts.com/" title="Grid Layout">ctrl+shift+g</a>.

The default way of interacting with this code is to use ctrl+shift+g - but this triggers the find function both in Safari and Firefox 3 - and in Firefox it triggers the grid and find at once, then you're stuck in the find box not being able turn the grid back off easily.

So, another little bookmarklet to toggle the grid:

<a style="font-size: 150%;" href="javascript:(function(){$('#GridLayout').toggle();})();">Toggle grid</a>

All simple stuff, but makes getting a simple grid layout working quicker and easier for the lazy developer :-)
