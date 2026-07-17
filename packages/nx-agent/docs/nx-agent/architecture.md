# nx-agent Architecture

## System Overview

nx-agent uses Eve as the agent runtime layer and Vercel primitives for model access, durable execution, and isolated compute.

## High-Level Components

- Chat Client
  - User-facing interface for conversation and action approvals.
- Eve Agent
  - Instructions, skills, tools, and orchestration logic.
- Tool Layer
  - Typed tools for retrieval, summarization, and controlled side effects.
- Vercel Infrastructure
  - AI Gateway for model routing.
  - Workflows for durable orchestration and resume.
  - Sandbox for isolated execution.
  - Observability for traces and runtime diagnostics.

## Request Flow

1. User sends a message in chat.
2. Eve agent interprets intent from instructions and relevant skills.
3. Agent optionally calls tools for context or actions.
4. If an action is sensitive, approval is requested.
5. Agent returns structured response to chat client.
6. Execution traces and outcomes are captured for review and evals.

## Data Boundaries

- Conversation state is durable and resumable.
- Tool inputs are validated.
- Tool outputs are normalized before response composition.
- Secrets are never hardcoded and are sourced from environment configuration.

## Reliability Principles

- Durable workflows for long-running steps.
- Idempotent tool calls where possible.
- Explicit retries and timeout handling for external calls.
- Clear fallbacks when dependencies fail.

## Safety Principles

- Least privilege for tools and connections.
- Approval gates for destructive or high-impact operations.
- Sanitization of model/tool outputs before presenting or executing.
- Auditable action trail through logs and traces.

## Initial Repo Layout

- agent/
  - instructions.md
  - agent.ts
  - channels/eve.ts
  - skills/
  - tools/
- app/
  - Next.js web chat UI mounted with Eve routes via `withEve`
- evals/
  - evals.config.ts
  - smoke.eval.ts
- docs/nx-agent/
  - project-charter.md
  - architecture.md
  - mvp-backlog.md
  - deployment-plan.md
