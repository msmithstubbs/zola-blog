---
title: Use jj op log to find missing change
taxonomies:
  tags:
    - jujutsu
    - git
    - tools
---

[jujutsu](https://jj-vcs.github.io/jj/latest/) has a useful `jj op log` command that shows the history of each operation performed on the repository. Each command that modifies the repo is logged, such as `jj commit` or `jj show` (most `jj` commands commit the working copy changes when you run them).

A useful modifier is `--op-diff` which shows what changed for each operation.


```bash
jj op log --op-diff
```

It was particularly useful to find some changes that I'd accidentally overwritten.
