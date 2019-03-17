---
title: A Public MIT License Resource
date: '2011-10-18 13:00:19'
published: true
tags:
  - code
  - development
  - project
modified: '2014-09-03 16:15:12'
---
# A Public MIT License Resource

Pretty much every personal project I work on I try to make it publicly available - usually under an MIT license - but I pretty much always forget to include an MIT license file.

There's an [Open Source Initiative](http://www.opensource.org/licenses/mit-license.php) with the license, but it doesn't have the date, nor the license holder.  So I've released [mit-license.org](http://mit-license.org) - a public, open source permanent resource for MIT license for *you*.

<!--more-->

I am now pointing all of my new projects at [http://rem.mit-license.org](http://rem.mit-license.org).

The [mit-license project](https://github.com/remy/mit-license) works by looking at the CNAME on the host, and if a matching user JSON file is found, it will serve up the MIT license for that individual.

For instance, the file `users/rem.json` contains:

    {
      "copyright": "Remy Sharp, http://remysharp.com",
      "url": "http://remysharp.com"
    }

So [http://rem.mit-license.org](http://rem.mit-license.org) works and displays the correct information (note that the year shown will always update to the current year too).

The project is up on GitHub and can be forked to add your own information and to reserve your own host. Just send a pull request along and I'll pull it in and you're sorted - no more remembering to include the MIT file in your projects.

## Version targeting

If you're worried that the license content might change in future versions, you can also target a specific version committed in the git repository.

This can either be done directly on the url using the commit SHA or you can include the version in your JSON file (which would probably be easier).

For example, [http://rem.mit-license.org/a526bf7ad1](http://rem.mit-license.org/a526bf7ad1) is the same as having a `users/rem.json` file that contains:

    {
      "copyright": "Remy Sharp, http://remysharp.com",
      "url": "http://remysharp.com",
      "version": "a526bf7ad1"
    }

Of course without the SHA you'll always be on the latest license file (which I doubt will change).

## Fork and send a pull request

The project is sitting on GitHub here: [https://github.com/remy/mit-license](https://github.com/remy/mit-license) and I'm trying to merge in pull requests as quickly as they come in so your url becomes live right away.

There's also a few more details on the readme in the [GitHub project](https://github.com/remy/mit-license) too.
