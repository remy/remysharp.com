---
title: Using travis with private npm deps
date: '2015-10-26 12:58:38'
tags:
  - code
published: true
modified: '2017-02-04 18:01:43'
---
# Using travis with private npm deps

I've recently been working on a project that requires [privately scoped npm modules](https://www.npmjs.com/private-modules). The problem I encountered was: when Travis ran tests that depended on @scoped modules, it would fail:

```
npm ERR! 404 Not found : @remy/super-awesome-private-mod
```

This post fixes that issue (and is mostly here when I forget, I can "google myself"!).

<!--more-->

## 1. Capture your token

If you're using [semantic-release cli](https://github.com/semantic-release/cli) (which you should, it's awesome), then you'll already have the `NPM_TOKEN` as an environment value in Travis.

If not, you'll need to find your npm token. This is found in your home directory, in the `.npmrc` file. The token is everything after `_authToken=`. Your file should contain a line like this:

```
//registry.npmjs.org/:_authToken=00000000-0000-0000-0000-000000000000
```

Note that where I've put zeros, you'll see letters and numbers. Once you've copied the token, you'll need to create a new env value in your Travis setting (on the individual build pages):

![Travis settings](/images/travis-settings.png)

Then under the "Environment Values" add a new value (keep "display value in build log" off):

```
NPM_TOKEN = 00000000-0000-0000-0000-000000000000
```

Then hit "add".

## 2. npmrc

You have two options here. The first option is to dynamically create an `.npmrc` ([more about npmrc](https://docs.npmjs.com/files/npmrc)) in the `.travis.yml` setup. The second option is to add the file to your repo, but it also requires a change to your shell environment. I'll cover both.

Note that if you change your npm password, then you'll need to update your `NPM_TOKEN`, otherwise it shouldn't need changing in the future.

### Dynamic

In your `.travis.yml` you'll create an `.npmrc` file on the fly. You'll need to do this in the `before_install` section, as per:

```
before_install:
  - echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
```

Note that the escaped `\$` is important. This will ensure that your private npm token is not echoed out in your Travis logs. That's it. With this method, you're ready.

I personally like this method because it keeps the `.npmrc` file out of my git repo and it means I don't have to remember to fiddle with my shell environment variables as we'll see next.

### File based

Create a `.npmrc` file and put it in the root of the directory that Travis will run (i.e. the root of the git repo typically).

Have the file contain (at least) this:

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

Now push this to your repo and let Travis run it's test. Travis will now have access to install your privately scoped npm packages.

Now you build will work, but `npm install` *won't* work locally until you add the `NPM_TOKEN=00000...` to your local shell environment variables.

You might need to tweak these directions depending on your shell, but if you're using bash, add the following line to your `.bash_profile` and after run `source ~/.bash_profile`:

```bash
$ export NPM_TOKEN="00000000-0000-0000-0000-000000000000"
```

The downside of this method (once you've got your shell sorted) is that if you're working in a team, each team member will have to add this line to their shell too, as the `.npmrc` file in the root of your project directory will require a valid token.

---

Now your private modules will install in Travis. If you need this in an environment like Heroku, I found [this](http://blog.getpiggybank.com/npm-private-modules-with-heroku/) article very useful (and the basis of this post).
