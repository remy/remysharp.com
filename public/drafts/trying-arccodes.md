# Trying arc.codes

- The docs are good, but the getting started guide doesn't hold my hand quite as much as I'd like, but Brian's got me with viewsource.codes - a full workshop of material for using Arc, and the [3rd section walks me carefully through](https://viewsource.codes/02-intro-to-web) with what I need to do.
- The AWS policy required is `AdministratorAccess` - i.e. everything since Arc (I understand) is managing everything for me
- Domain: a bit of a faff, but it's _easier_ if the domain is purchased on AWS so it's in the account that the AWS profile can manage. There is a [workaround if you own the domain already](https://arc.codes/guides/custom-dns). For me, although I had the domain already, it was a .net domain and I had already considered buying the .io domain - and in fact the price was industry standard (I had half expected to pay over the odds).
- On first run of `npm run create` I got a load of `TooManyRequestsException: Too Many Requests` exceptions. Apparently this is just AWS rate limiting my API access, and it's fine to just re-run, and Arc (thankfully) recognises that some parts of the process had been completed already. It ran fine the second time around.

Once `npm run create` was complete, I was left with two live URLs (staging and prod) and a directory structure like this:

```text
 1 .
 2 ├── src
 3 │   └── html
 4 │       ├── get-docs-000page
 5 │       │   ├── index.js
 6 │       │   ├── package-lock.json
 7 │       │   └── package.json
 8 │       └── get-index
 9 │           ├── index.js
10 │           ├── package-lock.json
11 │           └── package.json
12 ├── .arc
13 ├── npm-debug.log
14 ├── package-lock.json
15 └── package.json
16
17 4 directories, 10 files
```

## Gotchas

- Make sure you're running node@6.10 in development for parity when going live. A simple example of how you can be caught out: node 6 `req.headers` are untouched from the original socket, whereas node > 6 ensures all headers are lowercase for consistent access. This meant that offline I was trying to access `req.headers.cookie` but it was failing in the AWS cloud function (because it was actually `req.headers.Cookie`).
- Remove all async/await - you'll save yourself a massive headache of build scripts, but also be able to avoid things like the babel runtime in your live code - thus reducing the size of the cloud function _and_ the boot time.

---

## DNS

As I bought my domain on AWS, the next step was to run `npm run dns`, but this failed immediately with:

```
Certificates pending verification
Check your email and follow the instructions to verify the certificates and then rerun npm run dns to continue.
```

But in my case, I hadn't had any email. Here is the chicken and egg problem: I bought a new domain, but to verify the domain I needed to accept an email to @domain.io - which I didn't have setup. Fortunately, I had a workflow for this problem.

1. Launch a micro EC2 instance (or any machine) that you have root access to (this is important)
2. Clone/unzip my [node email repo](https://github.com/remy/email) into a directory
3. Run `npm install && sudo node index.js | grep certificates.amazon.com` - this will listen to port 25 for incoming email
4. Add an MX record to the new domain, pointing to the IP of the machine launched in step 1 above: `10 123.654.789.1`
5. From the `us-east-1` (N. Virginia) region (this is **important**) head to Certificate Manager
6. Either re-issue the cert, or delete the cert and recreate the certificate for: my-domain.com *and* *.my-domain.com
7. The running node process should now dump out the HTML and plain text email - scroll through the text until you find a URL that looks like `https://us-east-1.certificates.amazon.com/approvals?code…`

If running the `npm run dns` throws with:

```
TypeError: Cannot read property 'CertificateArn' of undefined
```

It means the certificates for *.my-domain.com and my-domain.com haven't been fully issued yet.

Finally, the tutorial includes:

> Remember DNS can take time to propagate.

Which, I suspect, is why when I visited my domain, it failed to resolve it.

Once all that was done, I found that the API gateway initialising the certificate against the API took _quite a long time_ (certainly wasn't completed within 30 minutes).

---

## Deploying

There's something weird when I deploy to staging, it seems to completely lose the staging API.

...

Chrome handles content encoding problems differently to Firefox. It turns out that the content encoding was being hosed on delivery. By adding support for individual encoding types in the Gateway API, it solved the rendering:

![/images/aws-types.png](/images/aws-types.png)
