---
title: Setting up Simon's TIL
tags:
- code
date: 2020-05-02
---

# Setting up Simon's TIL

I've followed [Simon Willison's blog](https://simonwillison.net/) for long, long time and in my [latest RSS](https://feedbin.com) catchup I saw his post about [capturing his TIL](https://simonwillison.net/2020/Apr/20/self-rewriting-readme/).

I immediately earmarked it as something to follow and do myself (which I've now done but want to somehow pull across to my blog), and though Simon's post was excellent, it's not written as a set of instructions for doing yourself, so Today I Learned how to copy and tweak Simon's TIL repo.

<!--more-->

## Overview of how it works

Simon's post goes into the technical detail, but for a brief understanding this is what happens (assuming all the prerequisite files are in place):

- All commits _except_ on the README trigger the workflow (I wonder if this can be ignored though…)
- The `build_database.py` file runs looking only at `*/*.md` files (so one directory deep) and generates an sqlite database
- The records in the sqlite database use the directory as the topic name (so one topic per TIL) and generates create and update times for the record based on the commit against each markdown file
- Then `update_readme.py` runs to modify the repo readme inline, looking for `<!-- index start -->` and `<!-- index end -->` and inserts the table of contents (the good bit)
- The `README.md` is committed under `README-bot` back into your repo
- Finally the project is deployed to Now

## Initial files

For this to work, you need your own github repo (since this uses github actions) and you need to specifically include the following files:

```
.
├── .github
│   └── workflows
│      └── build.yml
├── README.md
├── build_database.py
├── metadata.json
├── requirements.txt
├── templates
│   ├── index.html
│   ├── query-til-search.html
│   └── row.html
└── update_readme.py
```

I've pulled all the files into a single template repo here [remy/simonw-til-template](https://github.com/remy/simonw-til-template) (which is a bit weird…) but it's a clean slate to work from.

Put these in your own github repo and leave the default [action permissions](https://github.com/YOUR-USERNAME/YOUR-REPO/settings/actions) as "Enable local and third party Actions for this repository".

## Changes you need

If you look for `USERNAME` throughout the code, you can change this to your own github username (or your real name when used in the index page).

If you want to deploy to Vercel (formally Zeit) Now (which the action does by default), then you need to [generate a new Now token](https://vercel.com/account/tokens) and create a new token in the github repo under [https://github.com/[YOUR-USERNAME]/[YOUR-REPO]/settings/secrets](https://github.com/[YOUR-USERNAME]/[YOUR-REPO]/settings/secrets). The token needs to be called `NOW_TOKEN`.

If you _don't_ want to deploy to Now, in the `.github/workflows/build.yml` remove the entire section starting at `name: Deploy Datasette using Zeit Now`.

## Changes from Simon's original post and repo

If you used the template repo I made, you won't need these, but if you're skimming Simon's post a couple of things to be aware of:

- He uses `datasette publish now2 til.db` but `now2` (for us) should be `now` - it's using his [datasette-publish-now](https://github.com/simonw/datasette-publish-now) project.
- You'll need the `templates` directory (which initially I thought was a TIL), which is used by datasette to build the actual web pages you'll host on Now
- If you're copying files one by one, the `README.md` needs to have the following template _somewhere_ in the file: `<!-- index starts -->\n<!-- index ends -->`

## Possible changes

For my [own version](https://github.com/remy/til/) I think I might migrate it to my own blog but follow the structure that's already there. That way I can reuse my own existing system for RSS so it's a little more similar to [my links](/links).

*[TIL]: Today I Learned
