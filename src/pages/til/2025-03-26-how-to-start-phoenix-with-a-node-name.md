---
title: How to start Phoenix with a node name
taxonomies:
  tags:
    - elixir
    - livebook
    - til
---

It can be handy to start Phoenix with a node name and cookie. This is often used in distributed systems in production, but I find it handy to use in development with Livebook.

Rather than starting Phoenix with the usual `mix phx.server` I use:

```elixir
elixir --name my_app@127.0.0.1 --cookie dev -S mix phx.server
```

replacing `my_app` with something more appropriate.  I leave cookie as `dev` because I'm not concerned about security when running locally.

Once the server is running, I connect to it from Livebook:

<figure>
    <img with="369" height="317" src="/til/livebook_configure_node_settings.png" alt="Screenshot of the Cloudflare page rule UI">
</figure>


* Click **Runtime Settings**, then **Configure**.
* Enter the `my_app@127.0.0.1` and the cookie into the panel.

Once connected I can interact with the process from Livebook.
