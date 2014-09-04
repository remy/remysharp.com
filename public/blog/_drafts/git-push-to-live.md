# Git push to live

This post is for the copy and pasters out there just wanting something that'll do the trick. I'm going to walk through a process that gives you *continuous integration*, which simply means: when you `git push` your code goes live. And yeah, it's pretty magical when it works.

## The cost

Sadly, this isn't a quick "install X and boom, you're done". There's a bunch of hoops to jump through:

- Creating a Github account (and installing [git](https://help.github.com/articles/set-up-git))
- Creating a Heroku account (and installing the [toolbelt](https://devcenter.heroku.com/articles/quickstart#step-2-install-the-heroku-toolbelt))
- Installing Ruby
- Creating an encrpyted key for use with travis to deploy automatically

Out of these costs, it's likely that you've already got the first three in the bag. If not, Github and Heroku are extremely easy, and they hold your hand with respect to the applications you need installed.

To be honest, from my own experience, the installation of a decent version of Ruby was the hardest part, and frankly, my install is a mess and I'm assured it should be as hard as I experience it!

One caveat: I only know how to do this for public/open source projects - I've no idea about private repos. Maybe someone can comment.

## The tasks

Since we're going to use Heroku's free hosting, you need to install the [Toolbelt](https://devcenter.heroku.com/articles/quickstart#step-2-install-the-heroku-toolbelt) (obviously don't do this if you've done it already).

The important part of the toolbelt is that it'll sign you in to Heroku in your terminal. This is important for the encrypted key part later.

## Github repo

Firstly, create a [new repository](https://github.com/new) for your project.

Now clone the project to your local machine. I prefer the command line, so I'll copy the SSH clone URL and then run (my commands in bold):

```
**git clone git@github.com:remy/deploy-demo.git**
Cloning into 'deploy-demo'...
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 5 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (5/5), done.
Checking connectivity... done
```
