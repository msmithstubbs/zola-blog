---
title: Indexing and querying with embeddings and Livebook
url: https://www.youtube.com/watch?v=1QCwtyQ7Ctc&t=7s
taxonomies:
  tags:
    - elixir
    - livebook
    - embeddings
    - tutorial
---

In his video [Vector Search Demystified: Embedding and Reranking](https://www.youtube.com/watch?v=1QCwtyQ7Ctc&t=7s)
 [Zack Siri](https://zacksiri.dev/) uses Elixir and Livebook to demonstate how to index and query 100,000 embeddings.

It's a good introduction to preparing data with Explorer and indexing embeddings with Livebook. Zack uses [hnswlib](https://github.com/elixir-nx/hnswlib)
which provides an in memory vector store. This is fast and ideal for testing and iterating.

The reranking stage was particularly interesting. Zak uses a reranking model ([BAAI/bge-reranker-v2-m3](https://huggingface.co/BAAI/bge-reranker-v2-m3)) to improve the order of results from the vector search. I hadn't come across this variety of models before and I'm keen to learn more.

I asked Perplexity to create [an introduction to reranking models](https://www.perplexity.ai/search/give-me-an-introduction-to-rer-wGp9Z5BBTv6MecfZE2dreA) and it described them like this:

> Reranker models, also termed cross-encoders, are specialized neural networks designed to evaluate the relevance of documents to a query through direct pairwise comparisons. Unlike first-stage retrieval systems that rely on vector similarity, rerankers process the raw text of both the query and candidate documents, generating a relevance score that reflects their semantic alignment. This capability allows rerankers to address limitations in initial retrievals, such as mismatches caused by polysemy or syntactic variations.

The Livebook used in the video is available [on Github](https://github.com/zacksiri/notebooks/blob/main/vector-embeddings.livemd).
