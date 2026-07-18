---
order: 27
slug: /features/clever-text
title: CleverText
description: Typewriter-effect animated text component for markdown-driven pages
tags: docs, features, nx, clever-text, animation
icon: text_fields
---

# CleverText

`CleverText` is a small animated text component used directly in the design system and indirectly through the `CleverText` shortcode.

It reveals Markdown content with a typewriter effect, adds small timing variations for a more natural cadence, and runs a lightweight animation controller during mount.

## Behavior

- accepts Markdown text through `options.markdown`
- calls `options.onFinish` when the text has fully rendered
- sanitizes links to safe protocols and internal paths
- drops inline images rather than rendering untrusted media

The implementation lives in `app/NX/DesignSystem/components/CleverText/`.
