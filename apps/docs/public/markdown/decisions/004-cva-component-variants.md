# ADR-004: CVA for Component Variants

**Status:** Accepted  
**Date:** 2024-01-01

## Context

The `@platform/ui` component library exposes components (e.g. `Button`, `Badge`) with multiple visual variants (size, intent, appearance). Managing these variants with inline conditional class strings is:

- Verbose and error-prone.
- Not type-safe — invalid variant combinations can be passed without a compile error.
- Hard to discover — consumers cannot see available variants from the TypeScript type alone.

## Decision

Use **CVA (Class Variance Authority)** for all component variant definitions.

CVA provides:

- A `cva(base, variants)` function that returns a typed variant resolver.
- Full TypeScript inference — variant prop types are automatically derived from the CVA definition.
- Support for `compoundVariants` (styles applied only when multiple variants combine in a specific way).
- A `defaultVariants` option so components work without any variant props.

Example:

```ts
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center rounded font-medium",
  {
    variants: {
      variant: { default: "bg-primary text-white", outline: "border border-input" },
      size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);
```

The `ButtonProps` type is derived from the CVA definition, so consumers get auto-complete and type errors for invalid props.

## Alternatives Considered

| Alternative | Reason not chosen |
|-------------|-----------------|
| Inline ternaries / clsx conditionals | Not type-safe; verbose; hard to read |
| Tailwind Variants (tv()) | Feature superset of CVA; CVA is simpler for current needs |
| CSS Modules with data attributes | Breaks the Tailwind-first approach; more file overhead |
| Stitches / vanilla-extract | Runtime CSS-in-JS overhead; diverges from Tailwind approach |

## Consequences

- **Positive:** Variant types are automatically inferred — no manual `type ButtonVariant = ...` maintenance.
- **Positive:** Variants are co-located with the component, not scattered across class strings.
- **Positive:** `compoundVariants` enables subtle interactions between variants without complex conditionals.
- **Negative:** CVA is a build dependency; all consuming packages must have it (or get it transitively via `@platform/ui`).
- **Follow-on:** Document the `buttonVariants` export from `@platform/ui` so consumers can extend Button styles using the same variant system.
