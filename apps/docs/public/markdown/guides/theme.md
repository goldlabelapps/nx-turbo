---
order: 48
slug: /guides/theme
title: Theme Guide
description: MUI theme adapter, design-system wiring, and multi-preset switching
tags: docs, nx, guides, theme, design-system
icon: palette
---

# Theme Guide

This module owns presentation integration for the NX app, including the app's MUI theme adapter and the shared monorepo design-system wiring.

## Design-system integration

Shared design-system integration now lives in `app/NX/Theme/designSystem.ts`.

That file does two explicit things:

- imports `@nx/ui/styles` so shared design-system CSS is loaded with the NX theme layer
- re-exports approved shared presentational primitives for use by the app, currently `NXLogo`

## Why it lives here

The old `DS` folder name was too vague. The actual concern is not a separate app module, it is theme and presentation integration.

Putting this logic in `Theme` makes the ownership clearer:

- `Theme/Theme.tsx` loads shared design-system styles
- `Theme/components/MUI.tsx` applies the app's MUI theme
- `Theme/designSystem.ts` exposes the small set of shared design-system primitives the app is allowed to consume

## Current scope

Today the safe integration path is:

- use `@nx/ui/styles`
- use selected source-level components from `@nx/ui` when they are low-risk and presentational
- keep the app's local MUI theme adapter in place

Direct use of `@nx/ui` remains deferred until its MUI version is aligned with `apps/v3`.

## Usage rule

If a NX component needs a shared design-system primitive, import it from `app/NX/Theme/designSystem.ts` rather than reaching into `@nx/ui` directly.

## Multi design-system switching

The shared CSS package now supports named design-system presets without changing component imports.

- keep importing `@nx/ui/styles`
- choose a preset with `data-design-system` on `<html>`
- in tenant-driven apps (`apps/nx`, `apps/docs`), set `cartridges.designSystem.system` in `public/<tenant>/config.json`
- in env-driven apps (`apps/agent`), set `NEXT_PUBLIC_DESIGN_SYSTEM`

Built-in presets:

- `nx` (default)
- `neo-brutal`
- `aurora`

If a preset value is missing or unknown, the system safely falls back to `nx` because base `:root` tokens remain loaded.