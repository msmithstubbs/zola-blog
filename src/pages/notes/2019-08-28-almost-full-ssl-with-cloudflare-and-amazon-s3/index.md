---
title: Almost Full SSL With Cloudflare And Amazon S3
aliases:
  - 2019/08/28/almost-full-ssl-with-cloudflare-and-amazon-s3/
taxonomies:
  tags:
    - cloudflare
    - s3
    - aws
---

Storing static content on S3 and then putting Cloudflare in front of it is an easy and cheap way to serve content fast.

Serving the content is easy enough: create a bucket in S3 that matches the domain name and create a CNAME record in Cloudflare:

```
CNAME static.exampleapp.com static.exampleapp.com.s3-website-us-west-2.amazonaws.com
```


But say you’ve got a subdomain for static content, like `static.exampleapp.com`, and want to use SSL for root domain `exampleapp.com` things get a little more complicated. S3 supports SSL from a virtual host but you need to use a bucket name without any `.` characters (so you can have `static-exampleapp.exampleapp.com` but that’s not as neat.

After repeated googling the most recommended option was to to configure ‘Flexible SSL’ in Cloudflare for the whole site. This fixes the problem: Cloudflare will use plain HTTP to request the content from S3 then serve it over HTTPS to the end user. This is pretty good: the user has a secure connection all the way to the CDN and, since it is static content, it’s probably fine to have the last mile connection to S3 unencrypted.

But Flexible SSL affects the whole site. Any requests on the root domain, where an application might be living that contains private data, will also only be secure up to Cloudflare.

## Almost Full SSL with a page rule.
The easiest option is to leave Full SSL enabled for the site and then create a [page rule](https://support.cloudflare.com/hc/en-us/articles/218411427) to use Flexible SSL just for the subdomain.

{{ figure(img="cloudflare-page-rule.png", alt="Screenshot of the Cloudflare page rule UI") }}

![]()


This means requests to `https://exampleapp.com` are secure all the way to the origin server. Requests to `https://static.exampleapp.com` are partly secure. Cloudflare uses HTTP to make the actual request to S3 which is fine for publicly available content like site stylesheets. The response is sent back to the user over HTTPS.
