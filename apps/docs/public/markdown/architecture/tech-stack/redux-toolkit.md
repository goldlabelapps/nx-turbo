---
order: 46
slug: /architecture/tech-stack/redux-toolkit
title: Redux Toolkit (Uberedux)
description: How global state is modeled and updated through NX Uberedux patterns
tags: docs, nx, architecture, techstack, redux
icon: hub
---
# Redux Toolkit (Uberedux)

## What

Redux Toolkit powers NX global state through the Uberedux pattern: a centralized slice with structured keys and shared actions for framework/runtime concerns.

## Why

A single global state model keeps cross-feature behavior consistent (theme, loading, markdown cache, feedback, cartridges) and avoids fragmented state logic.

## Where

- Store and reducers: `app/redux/**`
- Design-system and runtime state actions: `app/NX/DesignSystem/actions/**`
- Docs references: `/features/uberedux`, `/architecture/framework-core`

## Who

- Framework maintainers define shared state shape
- Feature contributors consume and update centralized state
- UX features (theme, nav, loading, feedback) depend on predictable state transitions

## When

Redux state is initialized at app boot, updated on navigation and user events, and read continuously by runtime and cartridge components.
