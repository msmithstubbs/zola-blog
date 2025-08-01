---
title: Porting a vim theme to Zed with o3-mini
taxonomies:
  tags:
    - zed
    - openai
    - prompts
---

I came across an editor theme called [Everforest](https://github.com/sainnhe/everforest). It's available in dark and light variants, and I wanted to try it out.

It's available for vim, but only the [dark mode has been ported to Zed](https://github.com/ThomasAlban/everforest-zed).

How hard would it be to get an LLM to create the light theme for me?

To do a quick port I used [gitingest](https://gitingest.com) to create a big chunk of text with everything from the original vim theme respository.

I also grabbed a copy of the dark theme JSON to give the model an example of the output I wanted.

Then I wrote a quick prompt:

    Convert the vim theme Everforest light to work in Zed. I already have the
    Everforest dark converted. Create light.json with the same structure and
    keys as the dark theme, but use the colour values from the light theme. Here
    is the dark theme:

    ```json
    <copy of dark.json>
    ```

    and here is the original theme:

    <git respositroy contents>


I saved the cotents to a text file and passed it to `o3-mini` using `llm`:

```bash
cat instructions.txt | llm -m o3-mini
```

This thought for a while, then produced a JSON file which I saved into my [local Zed themes path](https://zed.dev/blog/user-themes-now-in-preview) at `~/.config/zed/themes`.

And it worked! It had the correct structure and pretty good colour values. I needed to tweak a few values to get it right. The status bar was too dark, and the predictive text wasn't quite right.

Considering I've never created a Zed theme before this was a quick way to get a working version up and running, and even if I’d createit by hand I would expect to spend some time tweaking values.

How much did it cost? I checked the usage report in my OpenAI account to estimate how much this cost. About 45k tokens: 33,100 input tokens and 12,778 output tokens.
At $1.10/million input tokens and $4.40/million output tokens this cost about $0.08. Pretty good! I could probably get the input token count down a bit by excluding some extraneous files from the GitHub repo. It’s marginal though, and for a one-off task saving 1 cent isn’t worth it.

![A bar chart displaying token usage data. On February 20, a total of 45,878 tokens, 33,100 of these labeled as "Input" and 12,778 as "Output." ](token_usage.png)
The original Everforest theme repo includes examples screenshots of the theme in vim. I wonder if including a screenshot would help?

I updated the prompt to include:

    I've included a screenshot of the light theme being used in the vim editor.

and ran the prompt again:

```bash
cat instructions.txt | llm -m o3-mini -a \
  https://user-images.githubusercontent.com/37491630/206063932-6bd60bef-8d2a-40d7-86b9-b284f2fea7b0.png
```

but `o3-mini` doesn’t support image attachments! Currently four OpenAI [models have vision capability](https://platform.openai.com/docs/guides/vision): `o1`, `gpt-4o`, `gpt-4o-mini`, and `gpt-4-turbo`.

How well would this work with `gpt-4o`?

I tried it:

```bash
cat instructions.txt | llm -m 4o -a \
  https://user-images.githubusercontent.com/37491630/206063932-6bd60bef-8d2a-40d7-86b9-b284f2fea7b0.png
```

This time I got a response back almost immediately. I’m guessing this because `o3-mini` is a reasoning model and `gpt-4o` is not. `o3-mini` spends some time reasoning and planning before returning a response. `gpt-4o` just starts completions right away.

The result was better than the first one from `o3-mini`. This time the status bar was the correct colour. Only a few small changes but definitley better.

The cost for this one was 32,189 input tokens and 1,952 output tokens.
{% sidenote() %}
I was surprised to see a _lower_ number of input tokens when the prompt was slighly longer and I’d included an image this time. I assume this is down to a difference in the models and the way they each tokenise content.
{% end %}

No reasoning means less output tokens. `gpt-4o` is a more than twice the cost of `o3-mini` . Even with the lower number of output tokens the cost was slighly higher at $0.10.

This was a fun experiment. Not only was it quick to get something working but the price/quality ratio was excellent.
