# Versioning: the chicken & egg

When I originally created this post I was working on a project where I kept running into the constraints of versioning a package that I was pushing to npm. I'll explain the problem, but now I have a near perfect workflow that completely mitigates the entire issue of versioning.

<!--more-->


## Background

I have a (node based) project that I want to publish to npm, and I want to follow [semver](http://semver.io/) for versioning.

That's fine, I know when I'm adding features (minor) and fixes (patched) and I rarely, if ever, commit breaking changes (major).

In the last year, I've moved to standardised structure for commit messages (instead of whatever I fancy). I'm using the [Angular commit style](https://github.com/angular/angular.js/blob/5afd54514d670d13783f51926d827c34223bb505/CONTRIBUTING.md#commit) (though I don't write any Angular code) which prefixes with `fix:` or `feature:` and subjects are limited to 50 characters with more detail in the body.

The commit history now, to me, looks so clear and so much easier to scan through. Then I run `npm version patch` which creates a new commit and a new tag. Finally, I is push changes and tags to GitHub and push to npm.

There's **two problems with this process**. The first is aesthetic. The history contains the version anomaly that just doesn't quite look right, and when we look at that tag on the project, it only *ever* contains the single commit that changed the package version:

![version in history](/images/version-in-history.png)

The second is much more serious: what if I distribute a compiled (either minified or transpiled) copy of the code and I want the `version` string to appear in the build?

To reiterate, the workflow is:

- fix: removed that bug
- feat: added that awesome thing
- chore: do some stuff
- chore: generate build *⬅ the version here is 3.35.8*
- 3.36.0

The tagged build of version 3.36.0 now has a version string *inside of it* that says 3.35.8. This is wrong, and indeed **bad**.

## Chicken and egg

In the situation I describe above, I need to include the version in the build otherwise I can't debug what other people are seeing (and can't narrow down to a specific version of code). One alternative would be to build *after* the tag, and deploy the package, but now if I look at the git history, the version tag is the commit *before* the distribution build.

I did write a `postversion` script that went through a insane amount of backtracking and git juggling to revert commits and rewrite them. It doesn't scale well, and frankly it's brittle as hell. All of these individual steps were triggered on the post version life cycle:

```bash
# build the dist output using babel
npm run build &&
# then add it to git
git add dist/* &&
# amend the last commit(!!!) inline and use the version as the commit
git commit --amend -m"$npm_package_version" &&
# delete the old tag(!!!)
git tag -d v$npm_package_version &&
# then re-tag :-\
git tag -a v$npm_package_version -m "chore: release $npm_package_version"
```

Originally this post was going to stop here. What on earth do you do? How do other developers get around this issue, if at all?

But then thanks to [Stephan Bönnemann](https://github.com/boennemann) (the Author), Semantic Release found its way into my development life ❤

## Versioning solution: Semantic Release

Semantic release is a tool that will read your commits and do the following automatically for me if there's a fix or feature:

1. Work out the next semver version, and push that to npm
2. Add a new release to GitHub and include full release notes (pointing to commits and related issues from the commits)

This is huge, because I don't need to worry about versioning myself (which if I'm honest, could be occasionally missed), it builds that ever illusive changelog and there's no nasty `v1.0.4` commits in my history.

One huge benefit to me is that semantic release will generate and publish the release notes automatically for me in GitHub.

The process has evolved over time so if you've heard of it and had a bad experience, bear with me.

You want to use the [CLI tool](https://github.com/semantic-release/cli) when setting up your projects each time. You can't just copy and paste the changes to each project because the CLI tool is also configuring Travis with specific environment values that allow Semantic Release to read your git commit history and also ensure that the final publish step to npm is under your account.

To get started install the CLI and run it in your project directory and answer the questions:

```bash
npm install -g semantic-release-cli
```

One gotcha that I'm sure will be fixed eventually, semantic release will *overwrite* your `.travis.yml` file, so I always make sure to manually edit and resolve the changes by hand.

## Fixing the distribution problem

The crux of how semantic release works is that there's a life cycle that runs the preconditions, then executes the user code (unusually just `npm publish `) then runs the post release process (adding changelog and tags to GitHub).

Semantic release does have a plugin architecture so you can add your own preconditions, but what interests me is the middle step, the "let's do this" part.

Here is where I can run the build process and generate the `dist` directory. Since the `npm publish` step takes everything in the directory, the distribution files will be included in the npm release - and in fact don't even have to live in GitHub (which IMHO is ideal).

## Will this create a release for every change I commit?

Good question (if I do say so myself). It depends entirely on your release workflow.

If you're commuting directly into master and pushing every individual commit to GitHub, then yes, you'll get a release for every fix and feature.

However, as soon as you stop pushing every commit, semantic release will bundle together all your commits since the last release, and calculate the correct version change.

This is then amplified when you're working off a `develop` (for instance) branch and merging a group of changes at once (the type of GitFlow workflow).

It's also worth remembering that by default semantic release is only running on master, and comparing to your last release in npm.

## "But what if I want to show the version?"

One question I got stuck on very early on was being able to echo out the version number (since I write a lot of CLI tools). I would rely on the `package.json` to hold the version, and with a semantic release set up, you *don't* have a version property in the package.

So, as it turns out, this isn't an issue at all. It *only* affects me during development. Once the users of my CLI tool have installed, they have the copy that *does* have the version property (as semantic release adds it right before the `npm publish` step).

## Other concerns

There's a couple of extra notes I wanted to share: firstly if you're maintaining "maintenance releases" (ie. previous major versions), you can do this, but you need to follow [specific](https://gist.github.com/boennemann/54042374e49c7ade8910) directions.

Then also you can use semantic release to do some funkier stuff. For instance, I use it to deploy this static blog! But how I do that, is for another post, another day 😉
