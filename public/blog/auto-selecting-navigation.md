---
title: Auto-selecting navigation
date: '2006-06-17 14:00:52'
published: true
tags:
  - code
modified: '2015-05-17 09:22:04'
---
# Auto-selecting navigation

This article offers an alternative to the laborious task of coding up which `<li>` or `<a>` navigation tags need the 'selected' class (or however you concoct the solution).

<!--more-->

## The Problem

Any web developer, or designer that wants to offer some visual indication which page the we are on, they will probably use a combination of 'selected' and possibly 'unselected' classed on the link or tab.

The developer's task is to ensure that the right link or tab is highlighted when we are viewing the page.

## The Old Solution

The way that I have solved this problem in the past (being a developer), either using Perl or <abbr title="PHP: Hypertext Preprocessor">PHP</abbr>, would be to use a hash to track which page is selected, and when I print each link or tab, I would reference the hash with the key value of the current element name.

For example (in PHP):

    $selected = Array('articles' => ' class="selected"');

    foreach ($links as $link)
    {
      echo '<a href="' . $link->href . '" ' .
        $selected[$link->name] . '>' .
        $link->name . '</a>';
    }


## The New Solution

The new solution really comes about, because as a developer I really want to avoid doing the dull work, and separating the layout code from the application code is what we all really want to do.

In this solution, you create all the <abbr title="Hyper Text Markup Language">HTML</abbr>, either through static files, or as you like, and add some JavaScript seasoning to make the the navigation automatically highlight itself.

### Prerequisites

1.  You are happy that when we don't have JavaScript enabled, the navigation doesn't highlight. I justify this by the simple fact as users, we're more interested in the page content, than which page link is highlighted.
2.  The navigation sits cleanly in one DIV under one ID.

### The Code

Notice that this is we've done away with our backend solution altogether.

    <h3>Info</h3>
    <ul id="sidebar_content">
      <li><a href="/info/news">News</a></li>
      <li><a href="/info/articles">Articles</a></li>
      <li><a href="/info/resources">Resources</a></li>
      <li><a href="/info/about">About</a></li>
    </ul>

Now we add our dash of JavaScript spice...

    function select_nav() {
      var nav_links = document.getElementById('sidebar_content').getElementsByTagName('a');
      var selected = location.pathname;

      for (var i = 0; i < nav_links.length; i++) {
        var link = nav_links[i].pathname;
        if (link.substring(0, 1) != '/') link = '/' + link; // fiddle IE's view of the link
        if (link == selected) nav_links[i].setAttribute(cattr, 'selected');
      }
    }

    window.onload = function() {
      select_nav();
    };

...and Bob's your father's brother. The link will automatically select itself.

For those of you using [jQuery](http://www.jquery.com), here's the same solution, but on a lot less lines (you've got hand it to those jQuery chaps):

    $(function(){ if (location.pathname.substring(1))
      $('#sidebar_content a[@href$="' + location.pathname.substring(1) + '"]')
        .attr('class', 'selected')
    });

Updated 25th Sep '06 - with thanks to Kevin, Fallo and Steve.

Note: the `a[@href$=` part is saying that any anchor tag whose "href" attribute value ends exactly with the string `location.pathname.substring(1)`.

Feel free to add comments, suggestions, ask questions, point out any errors or suggest a better alternative.

<small>Originally posted on leftlogic.com and restored from <a href="https://web.archive.org/web/20061018170852/http://leftlogic.com/info/articles/auto-selecting_navigation">The Internet Archive</a></small>
