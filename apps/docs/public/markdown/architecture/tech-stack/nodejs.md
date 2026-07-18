---
order: 44
slug: /architecture/tech-stack/nodejs
title: Node.js Runtime
description: How NX depends on the Node.js runtime for build, tooling, and server execution
tags: docs, nx, architecture, techstack, node
icon: terminal
---
# Node.js Runtime

## What

Node.js is the execution runtime for Next.js server code, API handlers, scripts, and workspace tooling in the monorepo.

## Why

NX relies on Node.js to run modern JavaScript/TypeScript across development, CI, and production workflows with a consistent runtime contract.

## Where

- Version policy: root `package.json` engines (`>=20 <25`)
- Workspace tooling: `pnpm`, `turbo`, `eslint`, `jest`, `typescript`
- Server-side code paths: `app/api/**`, server hooks, build-time markdown indexing

## Who

- Developers use Node.js for local dev and scripts
- CI pipelines run Node.js for lint, test, and build
- Hosted runtime environments execute Node.js server bundles

## When

Node.js is required from bootstrap (`pnpm install`) through every lint/test/build command and all server-side request handling.
