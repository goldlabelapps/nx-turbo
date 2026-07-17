# nx-agent Documentation

This repository keeps project documentation in the `docs/` directory.
The root README serves as the table of contents.

## Table of Contents

1. [Eve Overview](docs/eve-overview.md)
2. [nx-agent Project Charter](docs/nx-agent/project-charter.md)
3. [nx-agent Architecture](docs/nx-agent/architecture.md)
4. [nx-agent MVP Backlog](docs/nx-agent/mvp-backlog.md)
5. [nx-agent Deployment Plan](docs/nx-agent/deployment-plan.md)
6. [nx-agent Local Setup](docs/nx-agent/local-setup.md)
7. [Eve Init Comparison](docs/nx-agent/eve-init-comparison.md)
8. [nx-agent Verification](docs/nx-agent/verification.md)

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

- Add and update documentation in `docs/`.
- Keep this README updated as the docs index.
- Prefer concise, implementation-focused docs with links to official sources.
