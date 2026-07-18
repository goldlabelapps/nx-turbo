---
order: 21
slug: /features/design-system
title: Design System
description: MUI-based application shell with theming, layout, navigation, and reusable components
tags: docs, features, nx, design-system
icon: brush
---

# Design system

The design system is the UI cartridge that gives NX a ready-made application shell.

## Responsibilities

- build the active MUI theme
- render shared chrome such as header, footer, nav, hero, and feedback
- expose hooks for config, theme, feedback, and Markdown loading
- provide reusable components such as icons, fullscreen controls, and maps

`DesignSystem.tsx` is the entry point. It mounts the MUI `ThemeProvider`, resets loading state on route changes, and stores config in Uberedux when needed.
