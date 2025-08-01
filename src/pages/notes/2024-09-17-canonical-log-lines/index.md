---
title: Canonical log lines
taxonomies:
  tags:
    - tools
    - devx
---

Canonical log lines are a concept introduced in the Stripe blog post [Fast and flexible observability with canonical log lines](https://stripe.com/blog/canonical-log-lines) :

> We’ve found using a slight augmentation to traditional logging immensely useful at Stripe—an idea that we call canonical log lines. It’s quite a simple technique: in addition to their normal log traces, requests also emit one long log line at the end that includes many of their key characteristics. Having that data colocated in single information-dense lines makes queries and aggregations over it faster to write, and faster to run.

I’ve often included some structured logging in my log files, by prepending log lines with useful context:

```
[2020-01-01 23:00:00] [user_id=32] User successfully logged in.
```

This makes it easy to filter all log lines related to the user account 32. Using the `=` keeps it readable and makes it machine parseable.

But Stripe found stitching lots of data together can be difficult:

> Although logs offer additional flexibility in the examples above, we’re still left in a difficult situation if we want to query information across the lines in a trace. For example, if we notice there’s a lot of rate limiting occurring in the API, we might ask ourselves the question, “Which users are being rate limited the most?”

Stripe introduced canonical log lines in addition to the regular log statements. The canonical lines don’t prioritise human readability. They are dense, are emitted exactly once per event (web request, API call, background job, etc) with all the relevant data. They are canonical because “it’s the authoritative line for a particular request”.

In [Metrics For Your Web Application's Dashboards](https://sirupsen.com/metrics) Simon Hørup Eskildsen describes a JSON version of the canonical log line used by Readwise:

```json
{
  "severity": "info",
  "processing_time": 0.273,
  "enqueued_to_processed": 1532.069,
  "finished_at": 1647783951.0888088,
  "time_in_queue": 1531.796,
  "worker_name": "worker-h@4877ad9e-2884-4973-8f8a-f4e09934e0ad",
  "task_class": "main.tasks.send_daily_review_push_notification",
  "task_args": [],
  "task_id": "68ba3676-ef44-4515-a154-46d70748d9a0",
  "retries": 0,
  "task_kwargs": {
    "profile_id": "[redacted]"
  },
  "hostname": "4877ad9e-2884-4973-8f8a-f4e09934e0ad",
  "enqueued_at": 1647782419.0191329,
  "started_processing_at": 1647783950.8150532,
  "parent_id": "b6168daa-2edf-4e4e-8b15-a4b72a35fa02",
  "root_id": "b6168daa-2edf-4e4e-8b15-a4b72a35fa02",
  "state": "SUCCESS",
  "category": "celery",
  "queue": "t2h-c1",
  "memory_mib": 213.3
}
```

His version uses JSON, which probably makes it a little more readable.
