+++
title = "Disable Elixir Logger for a given process"
#date: 2022-10-31 11:48 +1000
[taxonomies]
tags = ["elixir"]
+++

It can be useful to disable the Elixir Logger output for a function that runs
frequently, particularly if the function is recalled frequently or repetitively.

To disable the logger for the current process set the log level to `none`:

```elixir
Logger.put_process_level(self(), :none)
```

Any other processes will continue to log with the default level.


