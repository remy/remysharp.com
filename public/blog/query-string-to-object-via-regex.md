---
title: Query String to Object via regex
date: '2008-06-24 08:41:12'
published: true
tags:
  - code
  - code
  - regex
modified: '2014-09-03 16:15:12'
---
# Query String to Object via regex

Just sharing a nice little code snippet that makes use of regular expressions instead of loops for converting.

<!--more-->

    function getQuery(s) {
      var query = {};
      
      s.replace(/\b([^&=]*)=([^&=]*)\b/g, function (m, a, d) {
        if (typeof query[a] != 'undefined') {
          query[a] += ',' + d;
        } else {
          query[a] = d;
        }
      });
      
      return query;
    }

    // usage:
    // var o = getQuery('maps.google.co.uk/maps?f=q&q=brighton&ie=UTF8&iwloc=addr');
    // console.dir(o);

Note that if a query string key is found more than once, it's value is appended.  If you don't want this functionality, remove the test for `undefined`.
