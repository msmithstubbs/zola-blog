+++
title="Thariq on building with the Claude Code SDK"
[taxonomies]
tags = ["link", "llm", "claude", "agents"]
+++

[Thariq on X](https://x.com/trq212):

> I have a search subagent that can search my inbox, but here’s the twist-
> Instead of the tool call returning an array of emails, it writes it to a log file and then it uses grep to search across these files.
> This performed way better and is super easy with the SDK.

The 'way better' refers to the alternative of using RAG, which he considers "fast, but noisy and hard to maintain."

Simply grepping for data follows the pattern of building agents to approach a task like a human would. If I wanted to find something in my inbox I don't think I'd build an indexed snapshot first. I'd just go search. Now that would be through the Fastmail web interface. Twenty years ago that would probably mean using grep to search through some files on disk.

Later in the thread he's asked how he made the demo video. Of course:

> Claude Code :)
> [Use Claude Code as your Video Editor](https://x.com/trq212/status/1947706205172068624)
