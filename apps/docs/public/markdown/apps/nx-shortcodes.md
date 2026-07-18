---
order: 38
slug: /apps/nx-shortcodes
title: NX Shortcodes
description: Shortcode system for embedding interactive UI blocks in markdown
tags: docs, apps, nx, shortcodes
icon: code
---

# NX Shortcodes

Shortcodes allow markdown authors to embed interactive UI blocks without writing React code directly.

## Available Shortcodes

- `HiddenMessage`
- `GithubLink`
- `FeedbackBtn`
- `CleverText`
- `ContentCard`
- `PageLink`

## How It Works

- Shortcodes are parsed from markdown at render time.
- Each shortcode maps to a React component.
- Attributes are passed through as component props.

## Extension Workflow

1. Add a component in the shortcode components folder.
2. Register it in shortcode parsing/rendering code.
3. Document usage for markdown authors.
