# ADR-002: Design Tokens as Single Source of Truth

**Status:** Accepted  
**Date:** 2024-01-01

## Context

A large frontend platform with multiple apps and a shared component library needs consistent visual values across every surface — colors, spacing, typography, shadows, border radii, transitions, and breakpoints.

Without centralisation:

- Colors could be hardcoded as hex strings in components and Tailwind config.
- Spacing values could diverge between apps.
- A rebrand or theme change would require updating values in dozens of files.
- Tailwind's config and CSS custom properties would be out of sync.

## Decision

Create a dedicated `@platform/design-tokens` package that is the **single source of truth** for all design values.

- Token values are stored as **JSON files** (primitive and easy to generate from design tools like Figma Tokens or Style Dictionary).
- A TypeScript module (`tokens.ts`) re-exports all tokens with full type safety.
- A `tailwind-theme.ts` module derives the Tailwind theme extension from the tokens, ensuring Tailwind utilities match the token values.
- A `css-variables.ts` module generates CSS custom properties for runtime theming (light/dark mode).
- No `#hexvalue` or hard pixel size appears anywhere outside this package.

## Alternatives Considered

| Alternative | Reason not chosen |
|-------------|-----------------|
| Tailwind config as source of truth | Tailwind config is CSS-only; not usable in JS/TS or CSS-in-JS contexts |
| CSS custom properties only | No TypeScript types; hard to consume in non-CSS contexts |
| Inline values in components | No consistency; changes require updates everywhere |
| Style Dictionary | Powerful but adds complexity; JSON + TS module is sufficient for this scale |

## Consequences

- **Positive:** A single file change propagates a color update across all apps and components.
- **Positive:** TypeScript consumers get auto-complete on token values.
- **Positive:** Tailwind utilities and CSS variables are always in sync.
- **Negative:** Contributors must be disciplined about not hardcoding values outside this package.
- **Negative:** `@platform/design-tokens` becomes a critical dependency — breaking changes require coordinated upgrades.
- **Follow-on:** Lint rules should be added to detect hardcoded colors/spacing in component files.
