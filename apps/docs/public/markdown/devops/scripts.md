---
order: 33
slug: /devops/scripts
title: Scripts
description: Monorepo and app-level commands for development, build, test, and lint
tags: docs, devops, nx, scripts
icon: terminal
---

# Scripts

## Monorepo root

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all JavaScript/TypeScript dev tasks via Turbo, excluding `apps/python` |
| `pnpm run dev:all` | Start all dev tasks including `apps/python` |

## NX app

| Command | Description |
| --- | --- |
| `pnpm --filter ./apps/nx dev` | Start the development server on port 1999 |
| `pnpm --filter ./apps/nx build` | Build for production |
| `pnpm --filter ./apps/nx start` | Start the production server |
| `pnpm --filter ./apps/nx test` | Run the Jest test suite |
| `pnpm --filter ./apps/nx lint` | Run ESLint |
| `pnpm --filter ./apps/nx typecheck` | Run the TypeScript checker |
| `pnpm --filter ./apps/nx clean` | Remove build artifacts |
