---
order: 292
slug: /packages/nx-agent-project-charter
title: nx-agent Project Charter
description: Purpose, goals, success criteria, and milestones for nx-agent
tags: docs, packages, nx-agent
icon: smart_toy
---

# nx-agent Project Charter

## Purpose

nx-agent is a production-style example agent application designed to demonstrate how to build and deploy a durable, multi-tool conversational assistant on Vercel using Eve.

The app must feel like a real product with clear scope, ownership, operations, and deployment standards.

## Product Narrative

nx-agent is a domain-aware assistant that helps users ask questions, retrieve trusted project knowledge, and execute approved actions through a clean chat interface.

The initial release focuses on reliability, trust, and observability over feature count.

## Goals

- Ship an end-to-end working agent app on Vercel.
- Use Eve as the core agent framework.
- Demonstrate production fundamentals: durability, tool boundaries, approvals, logs, and evals.
- Provide a clean repo structure and documentation that can be reused as a starter pattern.

## Non-Goals (MVP)

- Multi-tenant billing and full SaaS administration.
- Advanced workflow builders and user-customizable agent programming.
- Extensive enterprise IAM integration beyond what is needed for the example.

## Success Criteria

- Users can open chat, ask questions, and receive grounded responses.
- Agent can call at least one internal tool and one external-style integration path.
- Potentially risky actions require explicit approval before execution.
- Basic eval suite exists and runs in CI or release workflow.
- Deployment to Vercel is reproducible from repository docs.

## Constraints

- Keep architecture practical for a small team.
- Prefer code and config conventions that map directly to Eve and Vercel primitives.
- Documentation in docs/ is source of truth; root README is docs TOC.

## Owner Model

- Product Owner: defines scope and acceptance criteria.
- Agent Engineer: implements instructions, tools, skills, and workflows.
- Platform Engineer: owns deployment, environment config, and observability.
- Reviewer: validates safety, quality, and release readiness.

## Milestones

1. Foundation
   - Repo structure, project charter, architecture, and setup docs.
2. Agent Core
   - Instructions, skills, and minimum toolset.
3. Chat Surface
   - User-facing chat experience connected to the Eve agent.
4. Hardening
   - Approvals, evals, and operational runbook.
5. Launch
   - Vercel deployment and release checklist completion.
