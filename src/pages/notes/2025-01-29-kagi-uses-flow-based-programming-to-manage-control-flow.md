---
title: Kagi uses flow based programming to manage control flow
date: 2025-01-29
taxonomies:
  tags:
    - kagi
    - software
---

[Zac Nowicki](https://github.com/z64) from [Kagi](https://kagi.com) on how Flow Based Programming is used to manage control flow:

> ‘After launching Kagi, we realized we needed to manage a ton of concurrent tasks, combined with even more checks and decision making. We needed to stay on top of a robust concurrent control flow, and not go crazy trying to debug it all. This was the motivator for the "second generation" backend.
>
> ‘Flow Based Programming (FBP) is the hidden gem we followed to build observable and complex concurrent systems. FBP is a methodology introduced in around the 1970s, and we use a modern variant that takes the simple ingredients:
>
> Simple "black box" interface. One message in → multiple messages out
> FIFO queues. First in, first out
> Routing table. This describes how messages are transferred between components
> ‘These three components produce a system so "regular" that you can describe control flow with any off-the-shelf diagramming tool. Put simply, we could create visualizations of our system representing the full source of truth; we just needed to write an interpreter for it!

-- [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/perplexity-and-kagi)

Rather than creating UMl diagrams of software architecture that are then implemented in code the diagrams *are* the code.
This means the visual representation of the system is always up to date.

It's always interesting to see what a small startup is doing when competing against a large incumbent.

More on FPB:

* [The state of Flow-based Programming](https://blog.kodigy.com/post/state-of-flow-based-programming/#problems-it-solves)
