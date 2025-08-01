---
title: Configuring jujutsu
url: https://oppi.li/posts/configuring_jujutsu/
taxonomies:
  tags:
    - links
    - jujutsu
---

[Collection of useful tips](https://oppi.li/posts/configuring_jujutsu/) from [akshay](https://bsky.app/profile/oppi.li) for configuring [jujutsu](https://jj-vcs.github.io/jj/latest/). I particularly like the `tug` alias, which advances a bookmark on the current branch to one behind the current working copy revision.

```
tug = ["bookmark", "move", "--from", "heads(::@- & bookmarks())", "--to", "@-"];
```
