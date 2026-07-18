---
order: 54
slug: /architecture/nx-lib
title: NX Lib
description: Server-side and shared helper layer for metadata, slugs, nav, and runtime utilities
tags: docs, nx, architecture
icon: settings
---
`app/NX/lib/` contains the framework's server-side and cross-cutting helpers.

## Key areas

- `getTenant.tsx` resolves the active tenant config and Markdown root
- `getMeta.tsx` builds page metadata from tenant defaults and page overrides
- `serverHooks/` handles Markdown lookup, slug generation, nav building, and related-content helpers
- `firebase.ts` bootstraps Firebase services for client-side cartridges
- `vanilla-js/` contains small framework utilities such as slug and identity helpers

This folder is where most framework-level behavior is implemented outside the visible UI components.
