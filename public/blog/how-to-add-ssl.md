# Adding an (SHA256 signed) SSL certificate

I've had to update the SSL certificate quite a few times on [jsbin.com](http://jsbin.com) in the last 6 months, and I keep a cheatsheet of SSL steps on my machine. So it's about time I publish it somewhere that I can *google* too!

<!--more-->

This walkthrough explains how to add an SSL certificate to your server. This is based on using a linux based machine (in my case Ubuntu) and nginx as the server.

I registered my SSL certificate via [namecheap](https://namecheap.com) from RapidSSL which is actually a shell for GeoTrust.

If you're reissuing a certificate to upgrade to SHA256 (from SHA-1) (because [SHA-1 is being ditched](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1)) from RapidSSL **you must** reissue directly from them. See [this comment](https://github.com/konklone/shaaaaaaaaaaaaa/issues/24#issuecomment-54021941) for full details.

Assuming my site is example.com, I'm using `example` as the main filename.

```nohighlight
openssl genrsa -aes256 -out example-encrypted.key 2048
openssl rsa -in example-encrypted.key -out example-decrypted.key
openssl req -new -sha256 -key example-decrypted.key -out example.csr
```

The last command will generate the CSR which will go off to your SSL issuer. I have this a cheatsheet for the prompts (if you're based in the UK, since `Locality` might not mean much):

- Country name: `GB`, a country code, not name
- State: `East Sussex`, county if you're in the UK
- Locality: `Brighton`, your city
- Organisation: `My Company Ltd`
- Org unit: leave empty
- Common name: `www.example.com`, the full domain for the cert
- Leave the rest blank (email, challenge password & company name)

**Note:** if you have a wildcard certificate, then the common name is `*.example.com`.

Send `example.csr` contents to reissued SSL cert, and agree to all the emails.

You should get an email from the SSL issue with the certificate. Save the contents of 'certificate' in `example.crt`.

Now get the intermediate certificate (I'm using [RapidSSL's SHA256 cert](https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&actp=CROSSLINK&id=SO26459)) and combine into a single bundled file - note that the order is important:

```nohighlight
cat example.crt intermediate.crt > bundle.crt
```
---

*RapidSSL specific note*: I found that the GeoTrust certificate (part of the intermediate certificate that I downloaded above) was still SHA-1 signed. So I dropped it, only bundling my own certificate and the rapidSSL certificate (so less certificates) and now I get the green lock from Chrome Canary. Note: I'm not *100%* if this is okay, but it does seem valid.

---

Finally, make sure nginx (in my case) is using the bundle and the key used to generate the csr:

```conf
ssl                  on;
ssl_certificate      /WWW/example.com/certs/bundle.crt;
ssl_certificate_key  /WWW/example.com/certs/example-decrypted.key;
```

Then restart nginx:

```nohighlight
nginx -s reload
```


## References & tools:

- [shaaaaaaaaaaaaa](https://shaaaaaaaaaaaaa.com/) (for checking SHA-1)
- [SSL labs](https://www.ssllabs.com/ssltest/analyze.html) (for deep SSL analysis)
- [common openssl commands](https://www.sslshopper.com/article-most-common-openssl-commands.html)