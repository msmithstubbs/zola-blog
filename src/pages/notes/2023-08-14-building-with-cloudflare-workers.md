---
title: Building a lightweight cron job with Cloudflare Workers
aliases:
  - cloudflare/workers/2023/08/14/building-with-cloudflare-workers/
taxonomies:
  tags:
    - cloudflare
    - workers
---

Imagine you have thousands and thousands of commodity servers running in data centers all over the world. These servers are close to the end user so the response time is fast. Wouldn't it be great if you could write scripts that run on these servers?  Make sure it’s distributed, so you deploy once and it's available in every location. But it's also cheap, secure, and fast.

I needed somewhere to run a little cron job every five minutes. Cloudflare workers seemed like a good fit.

## What Cloudflare offers

Cloudflare Workers are serverless functions: you write scripts, upload them to Cloudflare and they will be run when requested. The request could be an HTTP request from a browser. It can also be a request from another worker: you can connect different workers with [service bindings](https://developers.cloudflare.com/workers/configuration/bindings/about-service-bindings/)
and then call one worker from another. You call another worker by making a request:

```
// call highScoreWorker from another bound worker
const workerResponse = await highScoreWorker.fetch(request)
```

In Cloudflare requests are everywhere.

## Is it cheap to run Cloudflare Workers?

Maybe. It depends. A free plan is available with 100,000 requests/day, with a max execution time of 10 ms. This is pretty good for free, and if you're running scripts for your hobby projects this is probably enough.

The paid plan starts at $5/month which works out at $0.50 / million requests, max execution time of 50 ms (by default). This sounds cheap, and it might be, but the problem with serverless computing is you don't really know what your usage is going to be like in advance. For $5 you can also get [a shared VM](https://www.linode.com/pricing/#compute-shared) with 1GB ram that runs day and night. That might be cheaper, but it also might be more work managing the server for small tasks.

There are [other limits](https://developers.cloudflare.com/workers/platform/limits/#worker-limits), too.
A worker can use a maximum of 128 MB RAM, and on the free plan, there are limits to the number of workers, the number of scripts, and lots of other edge cases. The $5/month paid workers plan significantly increases most of these.

## Not quite Node.js

Cloudflare Workers can run JavaScript, Typescript, or WebAssembly. If you're writing a worker in JavaScript you might think you're you can write a script just like you would for Node.js. I certainly did, and then I found out that while Cloudflare workers run the V8 engine, just like Node.js, the platform has its own runtime which is not exactly the same. Many useful APIs are available, like `fetch()` and the Streams API, but if you try to include any [npm](https://www.npmjs.com/)
package you might find it depends on an API that is not available. I ran into this problem trying to use [aws-sdk](https://www.npmjs.com/package/aws-sdk) and it failed. My solution was to switch to [aws4fetch](https://www.npmjs.com/package/aws4fetch) which provides a lower level API but fewer dependencies. Cloudflare Workers also have a [polyfill option](https://developers.cloudflare.com/workers/wrangler/configuration/#node-compatibility)
which provides many missing Node.js APIs, but not all of them.

## What about logging?

Debugging isn't much fun without logging. Cloudflare Workers offers a couple of options.
You can tail a worker from the console with `wrangler tail` and you'll see realtime console output from your worker.
If you want to store logs somewhere you'll need a paid workers plans which gives you access to [Logpush](https://developers.cloudflare.com/logs/about/),
Cloudflares log shipping service. Logpush will batch together log messages and deliver them to a logging service. [Several providers are supported](https://developers.cloudflare.com/logs/get-started/enable-destinations/) (Datadog, Google BigQuery, and a few more).
You can also log to Amazon S3 or Cloudflare's own R2 storage service.

Running a super cheap cron job doesn't require anything too sophisticated, and the message volume is going to be low. I had a look around for cheap options and came across BetterStack. They support Cloudflare Logpush but also offer an HTTP API. Fire a request and you are logging. BetterStack provides [sample code](https://betterstack.com/docs/logs/cloudflare/worker/)](https://betterstack.com/docs/logs/cloudflare/worker/) to include in your worker.
