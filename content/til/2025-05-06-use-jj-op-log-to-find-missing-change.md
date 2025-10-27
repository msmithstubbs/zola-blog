---
layout: blog-page.njk
date: 2025-05-06
title: "Use jj op log to find missing change"
tags:
  - jujutsu
  - git
  - tools
permalink: "/til/use-jj-op-log-to-find-missing-change/"
---

[jujutsu](https://jj-vcs.github.io/jj/latest/) has a useful `jj op log` command that shows the history of each operation performed on the repository. Each command that modifies the repo is logged, such as `jj commit` or `jj show` (most `jj` commands commit the working copy changes when you run them).

A useful modifier is `--op-diff` which shows what changed for each operation.


```bash
jj op log --op-diff
```

It was particularly useful to find some changes that I'd accidentally overwritten.
