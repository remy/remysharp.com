# Versioning: the chicken & egg

When I originally created this post I was working on a project where I kept running into the constraints of versioning a package that I was pushing to npm. I'll explain the problem, but now I have a near perfect workflow that completely mitigates the entire issue of versioning.

<!--more-->


## Background

I have a (node based) project that I want to publish to npm, and I want to follow semver for versioning.

That's fine, I know when I'm adding features (minor) and fixes (patched) and I rarely, if ever, commit breaking changes (major).

In my (old) workflow I've finished commuting all my changes and I'm using clear and structured commit messages (prefixed with `fix:` or `feature:` and subjects are limited to 50 characters with more detail in the body).

The commit history is a thing of beauty. Then I run `npm version patch` and then I've got a nasty looking commit in my history.

The last thing I'd do is push changes and tags to github and push to npm.

The *big* problem I have is with distribution builds - where the code is bundled up and contains the version in the code (or the filename).

## Chicken and egg

I can't have a distribution build with it's version without having the version build. So I would tag the version, *then* do the build. But now the tag is in the commit *before* the distribution build.

I did write a `post-version` script that went through a insane amount of backtracking and git juggling to revert commits and rewrite them. It doesn't scale well, and frankly it's brittle as hell.

Originally this post was going to stop here. What on earth do you do? How do other developers get around this issue, if at all?

But then Semantic Release found its way into my development life ❤

## Versioning solution: Semantic Release

Semantic release is a tool that will read your commits and do the following automatically for me if there's a fix or feature:

1. Work out the next semver version, and push that to npm
2. Add a new release to github and include full release notes (pointing to commits and related issues from the commits)

This is huge, because I don't need to worry about versioning myself (which if I'm honest, could be occasionally missed), it builds that ever illusive changelog and there's no nasty `v1.0.4` commits in my history.

To add semantic release to your  projects, get the [CLI]()

## Fixing the distribution problem

Semantic release has been built with a plugable nature. This means I can have pre and post release scripts.

So whenever there's a released change to my code, I can use a post semantic release scripts to run the build (inside of Travis for instance) and then let Semantic Release push the full directory contents for me.

## "But what if I want to show the version?"



