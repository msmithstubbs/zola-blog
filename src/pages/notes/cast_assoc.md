---
title: cast_assoc/3 for updating a subset of associations
date: 2024-04-30
taxonomies:
  tags:
    - elixir
    - ecto
---

`cast_assoc/3` ([docs](https://hexdocs.pm/ecto/Ecto.Changeset.html#cast_assoc/3)) has as interesting feature: it will only cast data for records that are preloaded.

It’s subtle: I thought all records had to be preloaded to use it. The docs explain this otherwise:

> By preloading an association using a custom query you can confine the behavior of `cast_assoc/3`. This opens up the possibility to work on a subset of the data, instead of all associations in the database.

You can preload a subset by passing a query when you preload:

```elixir
query = from p in Post, where p.status = :published
author |> Repo.preload(posts: query)
```

One thing to watch for is that `Ecto.Repo.preload/3` won’t do anything if the associations are already loaded. You can override this with `force: true`

```elixir
author = author |> Repo.preload(:posts)

query = from p in Post, where p.status = :published

# noop: this does nothing since they are already loaded
author |> Repo.preload(posts: query)

# this will fetch the filtered set of associations
author |> Repo.preload([posts: query], force: true)
```
