---
layout: blog-page.njk
date: 2025-04-17
title: "Glow is markdown viewer for the terminal"
link: "https://github.com/charmbracelet/glow"
tags:
  - cli
  - llm
  - markdown
permalink: "/links/glow-is-markdown-viewer-for-the-terminal/"
---

Glow renders markdown in the terminal with ANSI colors and styles. It has a built in pager.  Very handy for viewing [llm logs](https://llm.datasette.io/en/stable/logging.html#logs-for-a-conversation):

```sh
llm logs --current | glow -p
```
