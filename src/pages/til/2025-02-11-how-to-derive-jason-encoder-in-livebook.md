---
title: How to derive Jason.Encoder in Livebook
taxonomies:
  tags:
    - elixir
    - livebook
---

I ran into the issue of trying to include `@derive Jason.Encoer` in a struct while working Livebook.

My code was simple enough:

```elixir
defmodule ContentPart do
  @derive Jason.Encoder
  defstruct [:text]
end
```

but I was getting a warning:

> warning: the Jason.Encoder protocol has already been consolidated, an implementation for ContentPart has no effect.

I found a simple fix in a comment by [Wojtek Mach](https://github.com/livebook-dev/livebook/issues/1405#issuecomment-1246289370):

```elixir
Mix.install([:jason], consolidate_protocols: true)
```
