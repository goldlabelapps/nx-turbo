---
order: 29
slug: /features/design-system-copilot-prompts
title: Design System Copilot Prompts
description: Prompt pack for generating and reviewing design ideas within the shared design system
tags: docs, features, nx, design-system, copilot
icon: auto_awesome
---

# Design System Copilot Prompt Pack

Use these prompts to generate and review design ideas without drifting away from the shared design system.

Pair this prompt pack with the review gate in [docs/features/design-system-review-checklist.md](./design-system-review-checklist.md).

## How to use this pack

- Start with a narrow brief: one page, flow, or component at a time.
- Name the design constraints up front: tokens, typography, spacing, interaction rules, accessibility, and brand voice.
- Ask for multiple distinct directions, then force tradeoff analysis.
- Do not promote a pattern into the shared system until it survives review and appears reusable.

## Shared context block

Paste this block before any of the prompts below and adjust as needed.

```md
You are designing inside an existing design system.

Constraints:
- Use the existing design tokens as the source of truth for color, spacing, type, radius, shadow, and motion.
- Prefer existing shared primitives before inventing a new component.
- Do not hardcode visual values that should come from tokens.
- Keep the result accessible: clear hierarchy, keyboard-safe interactions, responsive layout, and strong contrast.
- Treat the output as a system proposal, not a one-off mock.

Brand and UI rules:
- Use the current product voice and visual rules from the design-system docs.
- Reuse established patterns for buttons, cards, navigation, and feedback.
- When proposing something new, explain whether it should become a token, primitive, composed component, or remain local.

Output format:
- Intent
- Layout summary
- Component list
- Token usage notes
- Accessibility notes
- Risks
- Recommendation
```

## Prompt 1: Generate design directions

```md
Generate 3 clearly different design concepts for [page, flow, or component].

Goal:
[describe the user job and success condition]

Audience:
[describe the user and context]

Constraints:
- Reuse the existing design system and tokens.
- Keep implementation realistic for the current codebase.
- Avoid one-off styling unless you justify it.

For each concept:
- Name the concept.
- Describe the visual idea in 3 to 5 sentences.
- List which existing primitives should be reused.
- List what is new.
- Call out what should become shared if this direction is chosen.
- Identify one main risk.

Make the 3 concepts meaningfully different in hierarchy, density, and tone.
```

## Prompt 2: Explore one concept more deeply

```md
Take concept [name] and turn it into a more concrete design spec.

Include:
- Section-by-section layout breakdown
- Desktop and mobile behavior
- Interaction states
- Content hierarchy
- Token categories that drive the design
- Existing components to reuse
- New primitives or variants that would be required

Flag anything that looks visually strong but systemically weak.
```

## Prompt 3: Review a concept critically

```md
Review this design concept as a design-system critic.

Evaluate it against these criteria:
- Brand fit
- Token compliance
- Reuse of existing primitives
- Accessibility
- Responsive behavior
- Content clarity
- Implementation complexity
- Risk of creating one-off patterns

For each criterion:
- Give a short verdict: strong, acceptable, weak
- Explain why
- Suggest the smallest improvement that would raise the score

End with:
- What should be rejected
- What should be revised
- What is ready to prototype
```

## Prompt 4: Compare competing ideas

```md
Compare these two or three design concepts for [page, flow, or component].

Judge them on:
- Clarity of user journey
- Consistency with the current design system
- Opportunity for reuse across the product
- Accessibility risk
- Engineering cost
- Likelihood of aging well

Return:
- A winner
- A runner-up
- Which elements from the losing concepts should still be kept
- A merged recommendation if the best solution is hybrid
```

## Prompt 5: Decide what becomes systemized

```md
Given this approved concept, identify what should enter the design system.

Classify each proposed addition as one of:
- Token
- Primitive
- Component variant
- Composed pattern
- Local-only implementation

For each item:
- Explain why it belongs in that category
- Name dependencies on existing primitives
- Identify any naming or API concerns
- State whether it should be documented with examples and dos or don'ts
```

## Prompt 6: Turn a concept into build-ready UI guidance

```md
Convert this design concept into implementation-ready guidance for a frontend engineer.

Return:
- The component tree
- Required states
- Responsive rules
- Content constraints
- Token categories to use
- Accessibility requirements
- What should not be custom styled

Do not generate code yet. Produce a structured handoff that preserves the system.
```

## Prompt 7: Run a pre-build red-team pass

```md
Red-team this UI proposal before implementation.

Look for:
- Hidden one-off styling
- Token drift
- Duplicate patterns that should reuse an existing primitive
- Weak empty, loading, error, or disabled states
- Mobile layout failures
- Accessibility regressions
- Brand inconsistencies

Return only concrete findings, ordered by severity, with a recommended fix for each.
```

## Review rubric

Use this simple scorecard when narrowing ideas.

| Criterion | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Brand fit | Generic or off-brand | Mostly aligned | Distinctly aligned |
| Token discipline | Frequent drift | Minor exceptions | Clean token usage |
| Reuse potential | Mostly one-off | Some reusable parts | Naturally systemized |
| Accessibility | Major gaps | Acceptable with fixes | Strong by default |
| Buildability | Costly or vague | Moderate effort | Clear and efficient |

Reject concepts that score high visually but low on token discipline or reuse potential.

## Recommended working loop

1. Use Prompt 1 to generate options.
2. Use Prompt 4 to narrow to one direction.
3. Use Prompt 2 to deepen the winner.
4. Use Prompt 3 and Prompt 7 to critique it.
5. Use Prompt 5 to decide what enters the design system.
6. Use Prompt 6 to hand the result to implementation.

Prototype disposable concepts in [packages/design-system/templates/concept-lab/ConceptLab.dc.html](../../packages/design-system/templates/concept-lab/ConceptLab.dc.html) before moving anything into app code. Usage notes live in [packages/design-system/templates/concept-lab/README.md](../../packages/design-system/templates/concept-lab/README.md), and you can open the lab from the repo root with `pnpm preview:concept-lab`.

## Notes for this repo

- Keep design-token decisions aligned with [docs/decisions/002-design-tokens.md](../decisions/002-design-tokens.md).
- Treat [docs/features/design-system.md](./design-system.md) as the feature-level overview.
- Reuse the branding and house rules from [packages/design-system/SKILL.md](../../packages/design-system/SKILL.md) when generating concepts.
- Use [docs/features/design-system-review-checklist.md](./design-system-review-checklist.md) before promoting a concept into shared system primitives.