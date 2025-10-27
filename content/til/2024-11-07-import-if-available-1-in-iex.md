---
layout: blog-page.njk
date: 2024-11-07
title: "import_if_available/1 in iex"
tags:
  - til
  - elixir
permalink: "/til/import-if-available-1-in-iex/"
---

IEx provides [`import_if_available/2`](https://hexdocs.pm/iex/IEx.Helpers.html#import_if_available/2) to import a module only if it exists.

So in my .iex.exs:

```elixir
import_if_available(Ecto.Query)
```

and there's no error if Ecto.Query doesn't exist.
