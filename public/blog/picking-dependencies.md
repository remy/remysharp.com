---
title: Picking dependencies
tags:
  - code
date: "2020-05-20 10:00:00"
summary: My methods for selecting one dependency over another
---

# Picking dependencies

Every web developer has faced this conundrum: which dependency should I pick? Why did we select jQuery over Prototype, or Prototype over Mootools, or Vue over React, or Angular over Ember, or Lodash over underscore and so on a forever for unlimited combinations for unlimited dependencies.

My own process is internal and so fast that I'll often have arrived at my decision with what might appear as no thought. But this isn't so, and I thought it was about time I document some of my own process, least of all to allow myself to review it and adjust over time.

<!--more-->

## Types of dependency

When I'm looking for new dependencies I'm usually in one of two mindsets: looking for a framework level project or looking for a specific solution (a plugin, mini library, or the like). This also factors into what I consider important when I'm reviewing the options.

What follows is a list that is generally in priority order when I'm considering a new dependency for my project.

## 1. Is the project actively maintained?

This is particularly important for smaller projects as they'll usually have a single individual working on the code. It's far from a deal breaker to visit an idle repository but I also need to consider the potential inherited technical dept from a new dependency.

Two data points I'll look at are:

- Recency of commit activity - usually a scan over github's project landing page does the job here
- Age of any open pull requests - long held pull requests that have no activity on them might suggest the maintainer isn't around (I've certainly been this person with nodemon in the past).

## 2. Is the project used?

Popularity isn't a decider for me, but it does mean that the more the software is used, the more that bugs are found in the wild.

In this case, I'm looking at:

- Total issues
- Open issues - high open issues is not a negative factor
- Number of closed issues

The speed in which the issues are closed, for me, isn't particularly important, particularly with a project that gets a lot of issues - what matters is that there's discussion going on.

## 3. Full depth of dependencies

In the land of Node and npm there's a running joke that the heaviest object in the universe, beyond the Sun, a neutron star and even beyond a black hole is: `node_modules`.

This is a huge area of risk that somehow we web devs just take on the chin, thank goodness Deno is coming to the scene (Deno tries to solve by providing a stdlib which causes the dependency graph to stop spreading).

So importantly this is not the count of dependencies (that you might see on sites like npmjs), but the full depth. Oddly I've only seen this available on Snyk.io - ie. [nodemon's dependencies](https://snyk.io/test/npm/nodemon?tab=dependencies)

## 4. Supply of live examples

Relevant to client side libraries, I want to see working interactive examples of the code running and be able to see enough of the code to recreate the demo myself.

This offers immediate insight into answering the question: _"does this do what I want"_.

## 5. Documentation and complexity

Secondary to actually seeing code is, for me, documentation. Smaller projects I would expect to see example code in the readme document. Larger projects I'd hope to find multiple pages dedicated to docs.

When I look at documents I'm looking for the starting examples and specifically asking: _does this require some additional build tools?_

Many projects I've come across have assumptions in the documentation, and the level of those assumptions add to complexity, particularly if I'm not familiar with the systems the project is referring to.

For example, for me personally, nearly every Python project I've come across assumes knowledge of how to install a dependency - which I fall into the category of not being able to.

## 6. Version numbers

If a project isn't using semver this tends to be a red flag as there's a good amount of information that can be ascertained from a version number.

As a reminder, [semver](https://semver.org/) uses major versions as an indicator of a breaking change, minor versions as a feature change and patch versions as bug fixes.

There's a grey area that lives around documentation and refactoring (when the API remains exactly the same, but the inner workings are different, you have to release, but this doesn't align to any semver change).

However, a high major version suggests high frequency of breaking changes - possibly risk to my project maintenance.

A high minor number (such as Snyk's command line tool, currently at 1.323.0) suggests _lots_ of features, possible a new release per feature.

A high patch suggests, to me, stability and running in maintenance mode.

## 7. Age

This would be ageism in "real life" but in software project age can tell some important stories.

An "old" project shows potential maturity or might even be a potential early signs of abandonment. What is old? If Node is 11 years old (in 2020) then anything around the decade mark is pretty old.

I'd generally avoid an extremely young project (months old).

---

A lot of this advice goes a long way towards: should the dependencies be created and owned by the project I'm working on?

This is a question I tend to always ask myself, and if the specific problem I'm trying to solve is distinct enough, I might even pull the code in, copy in the license and a citation for the source and have it as a completely frozen dependency.

If you're a web developer are there any other things you look for in your own auditing process?