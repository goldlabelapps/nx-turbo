# nx-agent Documentation

The authoritative docs now live in `apps/docs/public/docs/packages/`.
The package README remains a lightweight pointer for source files and agent tooling.

## Table of Contents

1. [Eve Overview](../../apps/docs/public/docs/packages/nx-agent-eve-overview.md)
2. [nx-agent overview](../../apps/docs/public/docs/packages/nx-agent.md)
3. [nx-agent Project Charter](../../apps/docs/public/docs/packages/nx-agent-project-charter.md)
4. [nx-agent Architecture](../../apps/docs/public/docs/packages/nx-agent-architecture.md)
5. [nx-agent MVP Backlog](../../apps/docs/public/docs/packages/nx-agent-mvp-backlog.md)
6. [nx-agent Deployment Plan](../../apps/docs/public/docs/packages/nx-agent-deployment-plan.md)
7. [nx-agent Local Setup](../../apps/docs/public/docs/packages/nx-agent-local-setup.md)
8. [Eve Init Comparison](../../apps/docs/public/docs/packages/nx-agent-eve-init-comparison.md)
9. [nx-agent Verification](../../apps/docs/public/docs/packages/nx-agent-verification.md)

## Agent Scaffold

- `agent/instructions.md`
- `agent/agent.ts`
- `agent/channels/eve.ts`
- `agent/skills/research.md`
- `agent/tools/getProjectContext.ts`
- `agent/tools/proposeSensitiveAction.ts`

## Web Chat Scaffold

- `next.config.ts` (with `withEve` integration)
- `app/` (Next.js chat UI)
- `components/` (UI elements scaffolded by Eve web channel)

## Evals

- `evals/evals.config.ts`
- `evals/smoke.eval.ts`

## Docs Conventions

- Add and update documentation in `apps/docs/public/docs/packages/`.
- Keep this README aligned with the docs-site pages.
- Prefer concise, implementation-focused docs with links to official sources.
