# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Platform project. ADRs document significant technical decisions — what was decided, why, and what alternatives were considered.

## Index

| ADR | Title | Status |
|-----|-------|--------|
| [ADR-001](./001-monorepo-turborepo.md) | Monorepo with Turborepo and pnpm workspaces | Accepted |
| [ADR-002](./002-design-tokens.md) | Design tokens as single source of truth | Accepted |
| [ADR-003](./003-auth-adapter-pattern.md) | Auth adapter pattern | Accepted |
| [ADR-004](./004-cva-component-variants.md) | CVA for component variants | Accepted |

## ADR Format

Each ADR follows this structure:

- **Status** — Proposed / Accepted / Deprecated / Superseded
- **Context** — Why this decision was needed
- **Decision** — What was decided
- **Consequences** — Trade-offs, impact, and follow-on work

## Creating a New ADR

1. Copy the next sequential number (e.g. `005-my-decision.md`).
2. Fill in the template.
3. Set status to `Proposed` until the team has reviewed and agreed.
4. Update the index table above.
