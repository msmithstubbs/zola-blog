---
title: What the unique period parameter means for enqueing jobs in Oban
taxonomies:
  tags:
    - elixir
---

Oban lets you set `unique` parameters to avoid creating duplicate jobs.

If I’m sending an email I want to make sure the job is only inserted once:

```elixir
defmodule WelcomeEmailWorker do
  use Oban.Worker, unique: [period: 60]
	...
end

DailyEmailWorker.new(%{email: "bob@example.com"}) |> Oban.insert()
```

My mental model of how this works was that the `period` ensured no duplicates were inserted after that job. I was wrong. The period is actually subtracted from the current time.

This makes sense. A lot of the time this is exactly what you want: if a job is created to send a welcome email you want to make sure that job is created and executed only once. You don’t want a duplicate job to be inserted and looking back 60 seconds prevents this.

```elixir
iex> WelcomeEmailWorker.new(%{email: "bob@example.com"}) |> Oban.insert()
{:ok,
  %Oban.Job{
    id: 1,
    inserted_at: ~U[2024-06-01 12:00:00Z],
    conflict?: false
    ...
  }
}


iex> WelcomeEmailWorker.new(%{email: "bob@example.com"}) |> Oban.insert()
# An existing job conflicts, so that job is returned
{:ok,
  %Oban.Job{
    id: 1,
    inserted_at: ~U[2024-06-01 12:00:00Z],
    conflict?: true
    ...
  }
}

```

If I want to schedule multiple jobs in advance this becomes a problem. Even if `unique: [timestamp: :scheduled_at]` is used Oban still looks ahead for existing jobs.

[Soren, the creator of Oban, explains a simple solution](https://elixirforum.com/t/scheduling-jobs-with-unique-contrains/63876/2): set a field in the args that is unique for the day.

```elixir
defmodule DailyEmailWorker do
  use Oban.Worker, unique: [period: :infinity, keys: [:email, :date]]
  ...
end

iex> DailyEmailWorker.new(%{email: "bob@example.com", date: ~D[2024-06-01]}) |> Oban.insert()
{:ok,
  %Oban.Job{
    id: 1
    ...
  }
}

iex> DailyEmailWorker.new(%{email: "bob@example.com", date: ~D[2024-06-02]}) |> Oban.insert()
{:ok,
  %Oban.Job{
    id: 2
    ...
  }
}

```
