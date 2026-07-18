---
order: 30
slug: /features/design-system-review-checklist
title: Design System Review Checklist
description: Pre-promotion checklist for design concepts entering the shared system
tags: docs, features, nx, design-system, review
icon: checklist
---

# Design System Review Checklist

Use this checklist before a design concept becomes a shared component, variant, or token decision.

## When to use it

- After initial concept generation
- Before implementation starts
- Before promoting a local pattern into the shared design system
- During design review for major UI changes

## Review inputs

Bring these artifacts into the review:

- The concept or mock being reviewed
- The user goal and success condition
- The list of reused primitives
- Any newly proposed primitives, variants, or tokens
- Notes from the Copilot critique pass in [docs/features/design-system-copilot-prompts.md](./design-system-copilot-prompts.md)

## Pass or fail rule

The concept should not move forward unchanged if any of these are true:

- It depends on hardcoded visual values that should come from tokens.
- It introduces a one-off interaction pattern without a strong product reason.
- It creates accessibility regressions in keyboard use, contrast, focus, or content order.
- It duplicates an existing primitive with only cosmetic differences.
- It looks strong in a mock but does not hold up in mobile, loading, empty, or error states.

## Checklist

### 1. User intent and content

- Is the primary user action obvious within a few seconds?
- Does the layout reflect the importance of the content instead of decorative balance?
- Is the wording clear, specific, and aligned with the current product voice?
- Are there places where design is compensating for weak content rather than improving it?

### 2. Brand fit

- Does the concept look like it belongs to this product family?
- Does it follow the current brand rules for typography, tone, surfaces, and interaction cues?
- Is it distinctive without inventing a parallel visual language?
- If the concept feels fresh, is that freshness coming from composition rather than from breaking the system?

### 3. Token discipline

- Are color, spacing, typography, radius, shadow, and motion driven by existing tokens?
- Are any values effectively new tokens disguised as local styling?
- If new tokens are proposed, are they broadly reusable and clearly named?
- Would a future rebrand or theme change still flow cleanly through this design?

### 4. Component reuse

- Which existing primitives are reused as-is?
- Which proposed changes are true variants instead of new components?
- Is there any local styling that should instead become a shared primitive?
- Are we adding a new abstraction for a repeated problem, or just for this one screen?

### 5. Interaction quality

- Are primary, secondary, and destructive actions clearly distinguished?
- Do hover, focus, pressed, disabled, loading, empty, success, and error states exist where needed?
- Are interactions consistent with existing button, input, navigation, and feedback patterns?
- Is anything visually attractive but confusing in real use?

### 6. Accessibility

- Does the reading order make sense without relying on visuals?
- Can the UI be used fully by keyboard?
- Are focus states visible and consistent?
- Is contrast acceptable for text, controls, and boundaries?
- Are target sizes and spacing usable on touch devices?
- If motion is used, does it communicate something useful and remain tolerable?

### 7. Responsive behavior

- Does the concept preserve hierarchy on small screens?
- Are important actions still visible without awkward scrolling?
- Do cards, tables, menus, and filters adapt cleanly?
- Does the design avoid desktop-only assumptions about width, hover, or persistent panels?

### 8. System durability

- Will this pattern still make sense when the product gains more content, states, or complexity?
- Is the design resilient to longer copy, localization, or missing data?
- Does it fail gracefully when content is sparse or unexpectedly dense?
- Are we creating a pattern others can learn and reuse, or a brittle exception?

### 9. Engineering cost

- Is the design straightforward to implement with the current stack?
- Does it require unusual layout or state management work that the user will not value?
- Are there hidden costs in animation, responsiveness, or state handling?
- Could a simpler version deliver most of the value with less risk?

### 10. Promotion decision

For each new pattern, decide one:

- Token
- Primitive
- Component variant
- Composed pattern
- Local-only implementation

If the team cannot classify it clearly, it is usually not ready to enter the shared system.

## Review outcomes

End each review with one of these outcomes:

- Approve for prototype
- Approve with required revisions
- Keep local, do not systemize
- Reject and return to concept exploration

Record the specific reasons, not just the outcome.

## Short scoring rubric

Score each area from 1 to 5:

| Area | 1 | 3 | 5 |
| --- | --- | --- | --- |
| User clarity | Confusing | Mostly clear | Immediately clear |
| Brand fit | Off-system | Generally aligned | Strongly aligned |
| Token discipline | Drifts often | Small exceptions | Fully disciplined |
| Reuse potential | One-off | Some reuse | Strong candidate for shared use |
| Accessibility | Significant gaps | Fixable gaps | Strong by default |
| Buildability | Expensive or vague | Moderate | Efficient and clear |

High visual appeal does not outweigh weak token discipline, poor reuse potential, or accessibility regressions.

## Recommended review sequence

1. Summarize the user goal in one sentence.
2. Identify what is reused versus new.
3. Run the checklist from user intent through engineering cost.
4. Classify any new pattern before approving it.
5. Record required changes and the review outcome.

## Notes for this repo

- Token decisions should stay aligned with [docs/decisions/002-design-tokens.md](../decisions/002-design-tokens.md).
- The feature-level design-system overview lives in [docs/features/design-system.md](./design-system.md).
- The Copilot generation and critique prompts live in [docs/features/design-system-copilot-prompts.md](./design-system-copilot-prompts.md).
- Brand-specific rules and component guidance live in [packages/design-system/SKILL.md](../../packages/design-system/SKILL.md).