---
order: 294
slug: /packages/nx-agent-mvp-backlog
title: nx-agent MVP Backlog
description: Prioritised backlog and definition of done for the initial release
tags: docs, packages, nx-agent
icon: smart_toy
---

# nx-agent MVP Backlog

## P0: Must Have

- [ ] Create baseline Eve agent directory with working instructions and model config.
- [ ] Implement at least one retrieval-style tool with schema validation.
- [ ] Implement at least one action-style tool behind approval.
- [ ] Wire agent to a chat surface.
- [ ] Define environment variables and deployment settings for Vercel.
- [ ] Add eval cases for happy path, ambiguous request, and unsafe request.
- [ ] Add README deployment and local run instructions.

## P1: Should Have

- [ ] Add subagent for research or summarization tasks.
- [ ] Add conversation memory conventions and retention policy.
- [ ] Add tracing dashboard guidance and incident triage steps.
- [ ] Add seed prompts and scripted demo flows.

## P2: Nice To Have

- [ ] Multi-channel support (for example Slack and web chat).
- [ ] Scheduled workflows (daily digests or status reports).
- [ ] Extended eval rubric with cost and latency thresholds.
- [ ] Branded UI polish for chat experience.

## Definition of Done (MVP)

- Core chat flow works end-to-end in deployed environment.
- Safety checks and approvals are tested.
- Evals pass for defined baseline cases.
- Documentation is complete and linked in root README TOC.
