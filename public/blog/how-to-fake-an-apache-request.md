---
title: How to fake an apache request
date: '2007-01-25 15:20:22'
published: true
tags:
  - code
  - mod-perl
  - perl
  - tips
modified: '2014-09-03 16:15:12'
---
# How to fake an apache request

I wrote a little tool to help me command line test URLs in my mod\_perl dev environment.  It lets me pass ful URLs + query strings via the command line, and see, or more importantly, debug the output.

Apache is running with [mod\_perl](http://perl.apache.org/) and we are using the [PerlHandler](http://perl.apache.org/docs/1.0/guide/config.html#Perl_Handlers) to forward requests to.

There's really nothing to the script, but I couldn't find a simple example on the Internet when I first needed it.


<!--more-->

<pre><code>#!/usr/local/bin/perl
use strict;
use Apache::FakeRequest;
use URI;
my $uri = URI->new($ARGV[0]);
$ENV{'REQUEST\_METHOD'} = 'GET';
$ENV{'QUERY\_STRING'} = $uri->query;
my $r = Apache::FakeRequest->new(
    uri => $uri->as\_string, 
    args => $uri->query, 
    method => 'GET');
handler($r);</code></pre>

You need to import the Perl module that contains the 'handler' function from the command line during execution.

If you call the script 'test\_url' you can run it from the command line like this:

`perl -MControllers::MyURLHandler test_url "http://mywebsite.com/search?query=code&filter=recent"`

Of course if you only have one handler, you can include this in test\_url script itself and not need to bother with the '-M' part.

Hope this is of some help to anyone!
