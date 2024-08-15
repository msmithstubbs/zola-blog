+++
title = "snaplet/seed automates dummy data for a local database"
[taxonomies]
tags = ["javascript", "tools"]
+++

[snaplet/seed](https://github.com/snaplet/seed) takes a database schema and uses AI to generate fake data, including relationships, to make testing and development easier.

```sh
npx @snaplet/seed init
npx @snaplet/seed sync
# edit the seed.ts file 
npx tsx seed.ts
```

You can also add `dryRun: true` to the seed script to just log the SQL and see what will be inserted ([docs](https://snaplet-seed.netlify.app/seed/getting-started/quick-start)).

```js
const seed = await createSeedClient({
  dryRun: true
});
```

The same team have also open sourced [snaplet/copycat](https://github.com/snaplet/copycat) for generating deterministic test data.
