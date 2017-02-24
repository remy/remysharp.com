# Speed

Bottom line: latency based DNS. Only available in AWS AFAIK, plus instances need to be on AWS.

## 1. dokku via vagrant on aws

- vagrant
- [find the AMI](https://cloud-images.ubuntu.com/locator/) for the specific region AND for ubuntu (otherwise it doesn't work)

## LetsEncrypt & SSL

From the instance itself, run:

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
```

Now on your local machine (talking through the local dokku command) add LE:

```bash
dokku domains:add myapp myapp.com # add your root domain
dokku config:set --no-restart myapp DOKKU_LETSENCRYPT_EMAIL=you@email.com
dokku letsencrypt myapp
dokku letsencrypt:cron-job --add
```

## http/2

You need to upgrade nginx to 1.11.9 (stable seems to be on 1.10.0 and [has issues](https://github.com/dokku/dokku/issues/2435))

```bash
sudo add-apt-repository ppa:chris-lea/nginx-devel
sudo apt-get update
sudo apt-get install nginx=1.11.* -y
```
