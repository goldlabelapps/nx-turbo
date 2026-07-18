---
order: 42
slug: /architecture/tech-stack/nextjs
title: Next.js
description: How NX uses Next.js for routing, rendering, APIs, and static generation
tags: docs, nx, architecture, techstack, nextjs
icon: language
---
# Next.js

## What

Next.js is the framework layer for the NX runtime. It provides App Router routing, server rendering, static generation, metadata APIs, and deployment-friendly build tooling.

## Why

NX uses Next.js to avoid reinventing core web platform concerns: route resolution, server/client component boundaries, bundling, and production build behavior.

## Where

- App routes: `apps/docs/app`, `apps/nx/app`
- Catch-all markdown routes: `app/[[...slug]]/page.tsx`
- API handlers: `app/api/**/route.ts`
- Build entry: `next.config.ts` and package `build` scripts

## Who

- Core framework contributors use it to define route architecture
- Feature teams use it to ship pages and API endpoints
- Content authors benefit from static markdown generation at build time

## When

Next.js runs during local development (`next dev`), static/production builds (`next build`), and runtime request handling for server-rendered routes and APIs.
