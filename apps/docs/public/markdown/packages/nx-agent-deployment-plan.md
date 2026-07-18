---
order: 295
slug: /packages/nx-agent-deployment-plan
title: nx-agent Deployment Plan
description: Vercel deployment environments, release workflow, and rollback strategy
tags: docs, packages, nx-agent, deployment
icon: smart_toy
---

# nx-agent Deployment Plan (Vercel)

## Deployment Intent

Deploy nx-agent as a production-style example using Vercel-hosted infrastructure and Eve conventions.

## Environments

- Development: local and preview iterations.
- Preview: pull-request validation and stakeholder review.
- Production: stable public demo endpoint.

## Required Configuration

- Model and provider settings through AI Gateway.
- Tool/service credentials via environment variables.
- Explicit runtime limits for long-running tasks.
- Approval and audit settings for sensitive actions.

## Release Workflow

1. Merge PR with passing checks.
2. Verify preview deployment and smoke test critical chat flows.
3. Run eval suite and review failures.
4. Promote to production.
5. Validate post-deploy health and logs.

## Smoke Test Checklist

- Chat request/response works.
- Tool call path executes successfully.
- Approval-required action pauses and resumes correctly.
- Error fallback produces user-safe message.
- Traces and logs are visible for the test session.

## Rollback Strategy

- Use Vercel rollback to last known good deployment.
- Disable newly introduced tools or channels via config flag if needed.
- Re-run smoke tests after rollback.

## Operational Ownership

- On-call owner validates incidents and triages logs.
- Product owner approves rollback or hotfix decision.
- Engineering owner prepares corrective patch and follow-up eval cases.
