---
order: 45
slug: /architecture/tech-stack/typescript
title: TypeScript
description: How NX uses TypeScript for contracts, safety, and maintainable scaling
tags: docs, nx, architecture, techstack, typescript
icon: data_object
---
# TypeScript

## What

TypeScript provides static typing for framework runtime code, app routes, Redux actions, API contracts, and shared packages.

## Why

Typing reduces runtime regressions, makes refactors safer, and clarifies shared interfaces between cartridges, APIs, and design-system components.

## Where

- Global/runtime contracts: `app/types.d.ts`, `app/NX/types.d.ts`
- App code: `*.ts` and `*.tsx` across `apps/*/app`
- Libraries and packages: `packages/**`
- Validation: workspace `type-check` task (`turbo run type-check`)

## Who

- Engineers rely on types to safely evolve framework internals
- Reviewers use types as executable documentation of intent
- Contributors in app and package layers share common interface contracts

## When

TypeScript safeguards code during authoring (editor diagnostics), CI validation, and pre-release checks through type-check tasks.
