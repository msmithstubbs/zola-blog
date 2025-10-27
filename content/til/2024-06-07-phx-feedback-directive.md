---
layout: blog-page.njk
date: 2024-06-07
title: "Replacing `phx-feedback-for` directive in Phoenix LiveView"
tags:
  - til
  - elixir
permalink: "/til/phx-feedback-directive/"
---

Phoenix provided a `phx-feedback-for` directive to help with styling form error messages ([Phoenix Form Bindings](https://hexdocs.pm/phoenix_live_view/form-bindings.html#error-feedback)).

This has been removed in LiveView 1.0 in favour of the `used_input/1` function.

It's a simpler concept now:

```html
<input type="text" name={@form[:title].name} value={@form[:title].value} />

<div :if={used_input?(@form[:title])}>
  <p :for={error <- @form[:title].errors}><%= error %></p>
</div>
```
