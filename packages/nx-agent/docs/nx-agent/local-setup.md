# nx-agent Local Setup

## Why This Exists

The Eve init command currently requires Node.js 24 or later. This repository includes a manual scaffold so development can proceed with a clear migration path to the official initializer.

## Prerequisites

- Node.js 24+
- npm 10+

## Setup Steps

1. Use Node.js 24.
2. Install dependencies.
3. Run type checks.
4. Start web chat and/or Eve backend dev servers.
5. Run evals in deterministic mock mode.

## Commands

```bash
nvm use
npm install
npm run typecheck
npm run dev
```

## Useful Commands

```bash
# Next.js app + mounted eve routes via withEve
npm run dev

# Eve backend only (no TUI)
EVE_USE_MOCK_MODEL=1 npm run dev:eve -- --no-ui

# Eval suite (deterministic)
EVE_USE_MOCK_MODEL=1 npx eve eval
```

## Agent Entry

The nx-agent path is:

- `agent`

## Notes

- `package.json` pins Eve and defines baseline scripts.
- `tsconfig.json` is scoped to `agent/**/*.ts` and `evals/**/*.ts`.
- `agent/tools/proposeSensitiveAction.ts` demonstrates approval-first action design.
- This repository now includes official-style Eve runtime defaults plus nx-agent-specific docs and tooling.

## Script Conventions

- `npm run dev`, `build`, and `start` target the Next.js web chat app.
- `npm run dev:eve`, `build:eve`, and `start:eve` target the Eve runtime directly.
