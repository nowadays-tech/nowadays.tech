---
title: Agent Screen
description: A spam filter for AI agents
external_url: https://github.com/nowadays-tech/agent-screen
status: Open source
released: 2026-10-22
published: true
technologies: [Swift, Claude Code, Security-One]
images:
  - path: /assets/images/agent-screen/01-screen.png
    alt: Text from web pages, search results, MCP tools and CLI output passes a screen before it reaches the agent
    featured: true
---

Agent Screen is a Mac menu bar app that sits between Claude Code and the Anthropic API. It passes every request through unchanged.

When an agent reads outside text, such as a web page, a search result or an MCP tool's output, a small decision model scores it. That model is Superagent's [Security-One](https://huggingface.co/superagent-ai/security-one-27b). Text that looks like prompt injection gets flagged in the menu bar.

Today it only flags. It never blocks. Read why in [AI needs a spam filter](https://www.danielfriis.com/notes/ai-needs-a-spam-filter/).
