---
order: 291
slug: /packages/nx-agent-eve-overview
title: Eve Overview
description: What Eve is, what it does, and how it fits the Vercel stack
tags: docs, packages, nx-agent, eve
icon: smart_toy
---

# Eve Overview

## What Eve Is

Eve is Vercel's open source, filesystem-first framework for building production AI agents.

In practice, that means an agent is represented as a directory structure where:

- Markdown files define instructions and reusable skills.
- TypeScript files define tools and runtime configuration.
- Optional channel and connection files define where the agent runs and how it accesses external systems.

## What Eve Does

Eve provides an opinionated way to build, run, and scale agents with production primitives built in.

Core capabilities include:

- Durable execution for long-running and multi-step tasks.
- Checkpointing and resume behavior across pauses, retries, and restarts.
- Sandboxed execution for isolated tool and code runs.
- Human approval gates for sensitive operations.
- Multi-channel delivery (for example web chat, Slack, API, and schedules).
- Subagent delegation for specialized tasks.
- Tracing and evaluations for observability and quality.

## Why This Matters

Without a framework like Eve, teams often stitch together multiple services for orchestration, model routing, execution isolation, and channel integrations.

Eve's value proposition is that these concerns are integrated into one framework and aligned with Vercel's AI infrastructure.

## How Eve Fits The Vercel Stack

Eve is positioned as a framework layer that uses Vercel primitives under the hood:

- AI Gateway: model routing, failover, and model access patterns.
- Workflows: durable orchestration and resumable execution.
- Sandbox: isolated runtime environments.
- Connect: authenticated access to external tools and services.

## Mental Model

A concise way to think about Eve:

- Like Next.js for agent backends.
- Markdown for behavior and guidance.
- TypeScript for executable tools and runtime control.
- Production durability and operations built in by default.

## Non-Goals And Boundaries

Eve is not a hosted no-code builder by itself. It is a framework for implementing agent systems in code with clear filesystem conventions.

It also does not remove the need for:

- Good prompt and instruction design.
- Secure tool design and least-privilege access.
- Evaluation and monitoring discipline.

## Initial Team Alignment (Working Agreement)

For this repository, we should treat Eve as:

- The primary framework for agent runtime and orchestration.
- A code-first system where agent behavior lives in versioned files.
- A production-oriented stack, not just a prototype helper.

## Sources

- Vercel docs index and Eve docs section.
- Vercel blog announcement: Introducing Eve.
- Eve landing page (eve.dev).
