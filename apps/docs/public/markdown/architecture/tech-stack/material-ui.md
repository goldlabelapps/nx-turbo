---
order: 47
slug: /architecture/tech-stack/material-ui
title: Material UI
description: How NX builds a branded design system on top of MUI theming and components
tags: docs, nx, architecture, techstack, mui
icon: palette
---
# Material UI

## What

Material UI (MUI) is the component and theming foundation for the NX design system.

## Why

MUI accelerates delivery with accessible primitives while still allowing tenant-specific theming, layout composition, and branded styling controls.

## Where

- Design system entry: `app/NX/DesignSystem/DesignSystem.tsx`
- Theme and palette logic: `app/NX/DesignSystem/**`
- Shared UI package components: `packages/ui/**`

## Who

- Design-system maintainers shape shared UX behavior
- Product teams reuse MUI-driven components instead of building per-page UI
- Tenants receive consistent interactions with configurable brand expression

## When

MUI theme providers and components are mounted on every page render and respond to tenant config and runtime state updates.
