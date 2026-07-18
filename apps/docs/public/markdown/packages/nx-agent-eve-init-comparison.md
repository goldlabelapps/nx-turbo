# Eve Init Comparison

Date: 2026-07-17
Eve version: 0.24.6

## Summary

A fresh project was generated with the official Eve CLI initializer and compared to this repository.

Result: this repository is intentionally more product-doc heavy, while the official initializer is runtime-first and includes extra operational defaults.

## Files Added By Official Eve Init (Not Present In This Repo)

- `.vercelignore`
- `AGENTS.md`
- `CLAUDE.md`
- `agent/agent.ts`
- `agent/channels/eve.ts`
- `agent/instructions.md`
- `package-lock.json`

## Files Present In This Repo (Not In Fresh Eve Init)

- `.nvmrc`
- `README.md`
- `agent/agent.ts`
- `agent/instructions.md`
- `agent/skills/research.md`
- `agent/tools/getProjectContext.ts`
- `agent/tools/proposeSensitiveAction.ts`
- `docs/packages/nx-agent-eve-overview.md`
- `docs/packages/nx-agent-architecture.md`
- `docs/packages/nx-agent-deployment-plan.md`
- `docs/packages/nx-agent-local-setup.md`
- `docs/packages/nx-agent-mvp-backlog.md`
- `docs/packages/nx-agent-project-charter.md`

## Important Content Differences

### 1. Agent Directory Convention

Official scaffold uses `agent/` as the root agent directory.

This repo currently uses `agent/`.

Both are workable, but the official scripts and defaults assume `agent/` unless configured otherwise.

### 2. Package Scripts And Dependencies

Official scaffold provides scripts:

- `build`: `eve build`
- `dev`: `eve dev`
- `start`: `eve start`
- `typecheck`: `tsc`

It also includes:

- `@vercel/connect`
- `ai`
- `eve`
- `zod`

Current repo package setup is close, but not identical in script names and dependency set.

### 3. TypeScript Defaults

Official scaffold uses:

- `module`: `esnext`
- `moduleResolution`: `bundler`
- includes `agent/**/*.ts` and `evals/**/*.ts`

Current repo uses NodeNext resolution and a narrower include target.

### 4. Channel Auth Bootstrap

Official scaffold includes `agent/channels/eve.ts` with default auth wiring:

- `vercelOidc()`
- `localDev()`
- `placeholderAuth()`

This gives immediate compatibility for dev and Vercel deployment workflows.

### 5. Ignore Rules

Official scaffold `.gitignore` adds entries for:

- `.eve`
- `.vercel`
- `.next`
- `.output`
- `.nitro`
- `*.tsbuildinfo`

Current repo ignore file is minimal and should be expanded.

## Recommendation

To align this project with Eve defaults while keeping nx-agent docs and product structure:

1. Keep existing docs and product artifacts.
2. Add official runtime files (`agent/channels/eve.ts`, `.vercelignore`, `AGENTS.md`, `CLAUDE.md`).
3. Harmonize `package.json` scripts to include official `dev`, `build`, and `start` commands.
4. Expand `.gitignore` with Eve defaults.
5. Decide whether to keep `agent/` or migrate to a different agent directory for convention alignment.

## Decision Log

Implemented: adopted official Eve runtime defaults and migrated to `agent/` while preserving nx-agent-specific docs and tools.
