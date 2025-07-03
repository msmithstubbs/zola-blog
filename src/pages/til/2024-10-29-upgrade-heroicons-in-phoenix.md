---
title: How to upgrade Heroicons in an existing Phoenix app
taxonomies:
  tags:
    - elixir
    - phoenix
    - til
    - postgres
---

Heroicons are a set of SVG icons stored in `assets/vendor/heroicons`. They are setup when you run `mix phx.new` along with
a handy `UPGRADE.MD` file that explains the simple upgrade process:

```sh
export HERO_VSN="2.0.16" ; \
  curl -L "https://github.com/tailwindlabs/heroicons/archive/refs/tags/v${HERO_VSN}.tar.gz" | \
```

Replace the `2.0.16` with the latest version on [Heroicons](https://heroicons.com/) and that should do it.

My project was created before the ‘micro’ size class of icons was created so I needed to add them to  `tailwind.config.js`

```javascript
plugin(function ({ matchComponents, theme }) {
  let iconsDir = path.join(__dirname, "./vendor/heroicons/optimized");
  let values = {};
  let icons = [
    ["", "/24/outline"],
    ["-solid", "/24/solid"],
    ["-mini", "/20/solid"],
    ["-micro", "/16/solid"], // Added this line
  ];

```
