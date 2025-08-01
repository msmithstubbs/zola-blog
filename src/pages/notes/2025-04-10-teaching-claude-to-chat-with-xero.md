---
title: Teaching Claude to chat with Xero
draft: True
---

Building My Own Xero AI Agent

What if I didn't have to log into Xero to check on an invoice or look up a contact's details? What if I had my own personal AI chat agent to handle these tasks?

Last month Xero released an open-source tool for developers that opens up some interesting possibilities. Their tool is a Model Context Protocol (MCP) server. MCP is a relatively new standard introduced by Anthropic (the company behind Claude) to connect chat assistants with external tools. If you've used ChatGPT or Perplexity, you might've noticed the web search tool—activate it, and ChatGPT can search the web for answers. But ChatGPT can't search inside Xero because it’s not logged in and doesn't understand how Xero's information is structured.

MCP allows you to build custom tools (similar to plugins) for chat assistants. With the Xero MCP server, I can add it to a chat assistant, grant the necessary permissions, and the chat assistant can then access Xero on my behalf.

Xero published the MCP server as open-source code in a GitHub repository, complete with setup instructions. The setup isn't overly complicated but involves a few steps. First, you need a chat assistant that supports MCP tools—ChatGPT doesn't yet, unfortunately, but Claude does. You'll also need a Xero Developer account to create a custom connection, providing API access to a single organization. I'll use Xero’s Demo Company, which includes test data, so I don't risk messing up my actual data.

Once I approve the custom connection, I can add the MCP Xero tool to my Claude configuration, input the custom connection API keys, and restart the Claude app.



There's now a little hammer icon indicating 36 available tools, each letting Claude access specific Xero information. Clicking the hammer shows a list:



Each tool includes a description—but these descriptions aren't for me; they're guides for Claude.

Let's test one:

List contacts.

Claude chose the list-contacts tool, prompting me to approve:



After clicking "Allow," Claude fetches the data:



It returns the first 10 contacts. I'll try updating one:

Update Berry Brew's email address to barry.brew@example.com

Claude selects the update-contact tool, and after approval, completes the update:



Oops, there's a typo. Let's fix that:

Sorry, that should have been berry.brew@example.com

I can click the provided link to confirm the update in Xero:



Looks good!

Trying Something More Challenging

The real promise of MCP tools is their composability. I can integrate multiple tools, such as web search alongside Xero, asking, "Search for Berry Brew and update the email address in Xero."

While Google Gemini doesn't directly support MCP, some chat clients enable Gemini to use MCP tools. Let's attempt something advanced using Gemini Pro via the 5ire chat client (I enlarged the screenshot for clarity):



Here's what's happening:

I've provided multiple steps rather than a single query.

I included a screenshot, and Gemini extracted text from it.

Gemini used Xero tools to first find a contact called 'Smart Agency' and then search for relevant invoices.

Impressively, Gemini identified two invoices totaling the correct amount.

That's pretty good—especially the invoice total calculation, which isn't necessarily straightforward for an AI.

However, it's not perfect. The assistant offered to reconcile the invoices but lacks a reconciliation tool. This highlights a limitation: it's predicting the next logical step without actually having the capability.

It's still early days, but this technology is exciting. Equipping language models with practical tools to complete real tasks is becoming more feasible. There's work needed on rough edges and security, and integrating these workflows seamlessly remains a challenge—typing instructions isn't always faster than clicking buttons. Nonetheless, the potential is clear, and hopefully, soon, even non-coders will benefit.
