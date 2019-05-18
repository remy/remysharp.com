---
title: How I got AWS running inside Netlify
date: 2019-05-18
tags:
  - code
---

# How I got AWS running inside Netlify

In a recent attempt to move _away_ from Google analytics I wanted to be able to run the AWS command line tool from _inside_ of Netlify's build process. Except it turns out it wasn't so easy to get AWS's environment variables in Netlify because Netlify have some undocumented reserved environment variables:

![AWS env value error](/images/netlify-aws.png)

<!--more-->

## Constraints

The [AWS command line tool](https://aws.amazon.com/cli/) will only read your credentials from two very defined locations:

1. From carefully named environment variables
2. From a credentials file store at `~/.aws/credentials`

The arguments to the tool are very limited, and don't offer options to pass in the credentials. This is understandable as it would the expose secret tokens in the history of the shell (or shell logs).

The second constraint is that, in my case, I *had* to use the AWS command line tool. If I were using Node.js or Python or Ruby and including the AWS library as a dependency, then I could name the environment values as I please. However I was using `aws` from Bash so I was constrained by the two options I mention earlier for authorisation.

## My solution

I tried many different ways to get this to work and [failed many (many) times](https://twitter.com/rem/status/1129462220876931072). I think I can see one other way to solve this problem, but the solution that follows worked for me.

### Step 1: alternatively named env values

In Netlify's deploy/environment panel I add the following three environment values:

- `ENV_ACCESS_KEY_ID`
- `ENV_DEFAULT_REGION`
- `ENV_SECRET_ACCESS_KEY`

### Step 2: during build, generate credentials

My project uses a Bash script during the build phase. So the first thing I do is to generate a credentials file substituting the environment values in:

```bash{data-plain=true}
cat > ./aws <<EOL
[netlify]
region = $ENV_DEFAULT_REGION
aws_secret_access_key = $ENV_SECRET_ACCESS_KEY
aws_access_key_id = $ENV_ACCESS_KEY_ID
EOL
```

This uses a [here document](https://stackoverflow.com/a/2500451) to save multiple lines to a file which also substitutes my custom AWS environment values.

Since Netlify's build contents is private, no one has access to read my secret values. I can also test this worked (or understand what failed) by download the build which is tucked away in Netlify's UI:

![Netlify download](/images/netlify-download.png)

### Step 3: change credentials source

Tucked away inside of AWS's [environment values](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) that it reads, is a value that defines where the credentials is read. Why this isn't an argument on the command line, I've no idea.

```bash{data-plain=true}
AWS_SHARED_CREDENTIALS_FILE=./aws aws --profile netlify …
```

Now the correct credentials are loaded into the `aws` tool and I'm able to run the commands I need. In my case, I was calling `aws s3 sync`, but that's for another blog post.
