---
title: Headstart
description: A todo list you share with your AI assistant
external_url: https://headstart.lab.nowadays.tech
status: Open source
released: 2026-10-27
# Stays unpublished until the iPhone screenshot from NOW-194 is in
# assets/images/headstart/ and the repo is public.
published: false
technologies: [Swift, Cloudflare Workers, MCP]
images:
  - path: /assets/images/headstart/01-list.png
    alt: The Headstart list on iPhone, with the assistant's status line under each todo
    featured: true
---

Headstart is a todo app for iPhone and Mac that you share with your AI assistant. You write a todo, and the assistant starts on it.

It does the legwork, such as comparing prices or finding the steps, and writes what it found into the todo's notes. A one-line status under each todo shows where things stand. When it needs a decision from you, it asks there.

The assistant connects over MCP, so Claude and any other MCP client can read and write your todos. It runs on your own Cloudflare account.
