---
order: 61
slug: /decisions/001-monorepo-turborepo
title: ADR-001: Monorepo with Turborepo
description: Decision to use a monorepo managed with pnpm workspaces and Turborepo
tags: docs, decisions, adr, monorepo, turborepo
icon: gavel
---

# ADR-001: Monorepo with Turborepo and pnpm workspaces

**Status:** Accepted  
**Date:** 2024-01-01

## Context

The platform consists of multiple applications (customer website, admin portal, documentation site, Storybook) and many shared libraries (UI components, design tokens, authentication, API client, hooks, utilities, etc.).

Without a monorepo, sharing code across these apps would require:

- Publishing and versioning each shared package to a registry.
- Manually coordinating breaking changes across repos.
- Duplicating configuration (TypeScript, ESLint, Prettier, Tailwind) in every repo.
- Running CI separately for every repo, with no cross-repo caching.

## Decision

Use a **monorepo** managed with **pnpm workspaces** and **Turborepo**.

- **pnpm workspaces** handles dependency installation and symlinking between local packages. pnpm is significantly faster than npm/yarn and has better disk efficiency via its content-addressable store.
- **Turborepo** orchestrates build tasks across the workspace. It understands the dependency graph and only rebuilds packages whose inputs have changed. Remote caching means CI is fast even as the repo grows.

## Alternatives Considered

| Alternative | Reason not chosen |
|-------------|-----------------|
| Multiple separate repos | High coordination overhead; shared code requires publishing |
| Nx | More opinionated and complex; Turborepo is simpler for this use case |
| Yarn workspaces | Slower installs; pnpm has better disk efficiency |
| Lerna | Largely superseded by Turborepo for task running |

## Consequences

- **Positive:** Single `pnpm install` sets up the entire platform. Changes to shared packages are immediately visible to consuming apps. CI can cache and skip unchanged work.
- **Positive:** Consistent tooling configuration across all packages via `@platform/config-*` packages.
- **Negative:** A single large repo requires discipline to avoid coupling apps to each other.
- **Negative:** Turborepo's remote cache requires configuration for CI; local development uses local cache only.
- **Follow-on:** All new shared code should be placed in `packages/`; apps must not import from other apps.
