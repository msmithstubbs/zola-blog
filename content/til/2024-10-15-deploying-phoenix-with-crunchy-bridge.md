+++
title = "Notes on deploying Phoenix application to fly.io with Crunchy Data postgres"

[taxonomies]
tags = ["elixir", "til", "postgres"]

+++
Deploying an Elixir Phoenix app to fly.io with Postgres running on Crunchy Data works well but there a couple of steps to get it all working. I’m making a note of it here for future reference.

## Crunchy Bridge requires IPv4

Once you’ve set the `DATABASE_URL` with the connection string from Crunchy Bridge you might see `NXdomain` errors: Postgres can’t connect to the host.

```txt
[error] Postgrex.Protocol (#PID<0.2494.0>) failed to connect: ** (DBConnection.ConnectionError) tcp connect (p.56vnpfhikjfn5k54wdvvweir44.db.postgresbridge.com:5432): non-existing domain - :nxdomain
```

Fly uses IPv6, but the connection string Crunchy Bridge supplies is IPv4. The default `config/runtime.exs` includes an IPv6 configuration option for Ecto which can be removed:

```elixir
  config :myapp, MyApp.Repo,
    url: database_url,
    socket_options: maybe_ipv6, # <-- Remove this line
    pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")
```

## Crunchy Bridge enforces SSL connections

The app can now reach the database host but another error appeared:

```txt
[error] Postgrex.Protocol (#PID<0.2499.0>) failed to connect: ** (DBConnection.ConnectionError) ssl connect: Options (or their values) can not be combined: [{verify,verify_peer},
2024-10-14T23:31:34Z app[6e82541eb56648] syd [info]                                                {cacerts,undefined}] - {:options, :incompatible, [verify: :verify_peer, cacerts: :undefined]}
```

 This one is to do with SSL verification. Crunchy Bridge quite reasonably requires all connections to use SSL. Their documentation instructs you to enable SSL by setting the Repo configuration to `ssl: true`. This should work unless you’re on OTP 26+. According to a forum post ([How to set SSL options correctly when connecting to Heroku postgres db?](https://elixirforum.com/t/how-to-set-ssl-options-correctly-when-connecting-to-heroku-postgres-db/59426/2?u=msmithstubbs)) OTP 26 changed the default SSL verification setting from `verify_none` to `verify_peer`.  Ecto is now trying to connect over SSL and verify the certificate.

The simple solution here is to switch it back to the old setting in `runtime.exs`

```elixir
  config :my_app, MyApp.Repo,
    ssl: true,
    ssl_opts: [verify: :verify_none],
    url: database_url
```

If you want to verify the server certificate it requires a little more configuration:

1. Download the public certificate from Crunchy Bridge. Certificates are issued per team, so get the correct certificate for the team the database belongs to. The certificate is [available through the dashboard or API](https://docs.crunchybridge.com/concepts/ssl).
2. Save the certificate in `priv/repo/team.pem`
3. Update the Ecto SSL config:

```elixir
  database_host_name = URI.parse(database_url).host

  certfile_path =
    :code.priv_dir(:my_app)
    |> Path.join("repo/team.pem")

  config :my_app, MyApp.Repo,
    ssl: true,
    ssl_opts: [
      verify: :verify_peer,
      cacertfile: certfile_path,
      server_name_indication: String.to_charlist(database_host_name)
    ],
    url: database_url,

```

Deploy and Ecto should now be able to connect.

## Migrations won’t run without `ssl` started

Attempting to run migrations in production with the Release module may result in this error:

```txt
 ** (RuntimeError) SSL connection can not be established because `:ssl` application is not started,
you can add it to `extra_applications` in your `mix.exs`:
```

Add `:ssl.start()` to  `MyApp.Release.load_app/0` :

```elixir
  defp load_app do
    Application.load(@app)
    :ssl.start()
  end
```
