---
title: How to default a variable in XSLT
date: '2008-08-15 20:58:18'
published: true
tags:
  - code
  - code
  - xml
  - xslt
modified: '2014-09-03 16:15:12'
---
# How to default a variable in XSLT

Since I couldn't find this anywhere on the web, and I'm working on a project that has had me *very* quickly learn XSLT, here's how to default a value in XSLT - useful if you're looking to grab a variable via the query string, and it may not be there in the first place.


<!--more-->

<pre><code>&lt;xsl:variable name=&quot;show_comments&quot;&gt;
  &lt;xsl:choose&gt;
    &lt;xsl:when test=&quot;//QUERY_STRING/show_comments&quot;&gt;&lt;xsl:value-of select=&quot;//QUERY_STRING/show_comments&quot;/&gt;&lt;/xsl:when&gt;
    &lt;xsl:otherwise&gt;0&lt;/xsl:otherwise&gt; &lt;!-- default value --&gt;
  &lt;/xsl:choose&gt;
&lt;/xsl:variable&gt;</code></pre>

<small>Note: <code>//QUERY_STRING</code> is a made up variable</small>

I know XSLT might be a bit random for me, but client wants: client gets :-)
