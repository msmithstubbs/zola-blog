---
title: Glow is markdown viewer for the terminal
link: https://github.com/charmbracelet/glow
taxonomies:
  tags:
    - cli
    - llm
    - markdown
---

Glow renders markdown in the terminal with ANSI colors and styles. It has a built in pager.  Very handy for viewing [llm logs](https://llm.datasette.io/en/stable/logging.html#logs-for-a-conversation):

```sh
llm logs --current | glow -p
```
