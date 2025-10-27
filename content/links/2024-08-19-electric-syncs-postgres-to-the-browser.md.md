---
layout: blog-page.njk
date: 2024-08-19
title: "electric: sync postgres to the browser"
tags:
  - link
  - typescript
  - elixir
  - postgres
permalink: "/links/electric-syncs-postgres-to-the-browser.md/"
---

> [Electric](https://github.com/electric-sql/electric) provides an [HTTP API](https://next.electric-sql.com/api/http) for syncing [Shapes](https://next.electric-sql.com/guides/shapes) of data from Postgres.

Replicates changes from postgres. Use the electric typescript client to sync data to your browser application. It uses a concept called Shapes to specify what data should be synced. The sync service is written in Elixir.

Looks like a good option for "I need Postgres on the server, but something like Firebase in the web client"
