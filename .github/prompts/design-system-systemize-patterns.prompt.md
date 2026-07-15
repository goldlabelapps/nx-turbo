---
name: "Design System: Systemize Pattern"
description: "Classify approved UI ideas into tokens, primitives, variants, composed patterns, or local-only code"
argument-hint: "Describe the approved concept or pattern"
agent: "agent"
---

Given the user's approved concept or pattern, decide what should enter the shared design system.

Use these repo references:
- [Copilot prompt pack](../../docs/features/design-system-copilot-prompts.md)
- [Review checklist](../../docs/features/design-system-review-checklist.md)
- [Token decision](../../docs/decisions/002-design-tokens.md)
- [Brand rules and component guidance](../../packages/design-system/SKILL.md)

Classify each proposed addition as one of:
- Token
- Primitive
- Component variant
- Composed pattern
- Local-only implementation

For each item, return:
- Classification
- Why it belongs there
- Which existing primitives it depends on
- Whether it needs a new API surface
- Whether it needs documentation with examples and dos or don'ts
- Main risk if it is promoted too early

End with a short recommendation on the minimum system changes needed to support the concept cleanly.