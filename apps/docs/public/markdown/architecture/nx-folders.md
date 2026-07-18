---
order: 53
slug: /architecture/nx-folders
title: NX Folders
description: Capability-based map of the app/NX runtime folders
tags: docs, nx, architecture
icon: settings
---
`app/NX/` is the framework runtime. It is organised by capability rather than by page.

| Folder | Purpose |
| --- | --- |
| `NX.tsx` | Root runtime wrapper that applies tenant theme and shared UI |
| `DesignSystem/` | Layout, navigation, icons, theming, feedback, and reusable UI hooks |
| `Uberedux/` | Lightweight global state store and hooks |
| `Flash/` | Animation stage, movie clips, and Flash-style interaction primitives |
| `Shortcodes/` | Markdown-to-React bridge for embedded components |
| `Paywall/` | Firebase-backed auth and account UI |
| `Orders/` | Commerce-facing placeholder surface |
| `lib/` | Server hooks, metadata helpers, Firebase bootstrap, and utility functions |
| `types.d.ts` | Shared framework types |

This folder is the main extension point when turning NX into a product-specific app.
