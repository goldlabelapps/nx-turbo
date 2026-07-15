---
name: "Design System: Review Concept"
description: "Critically review a UI concept against this repo's design-system, token, and accessibility rules"
argument-hint: "Paste or describe the concept to review"
agent: "agent"
---

Review the user's concept as a design-system critic.

Use these repo references:
- [Review checklist](../../docs/features/design-system-review-checklist.md)
- [Copilot prompt pack](../../docs/features/design-system-copilot-prompts.md)
- [Design system overview](../../docs/features/design-system.md)
- [Brand rules and component guidance](../../packages/design-system/SKILL.md)

Evaluate the concept against:
- Brand fit
- Token discipline
- Reuse of existing primitives
- Accessibility
- Responsive behavior
- Content clarity
- Implementation complexity
- Risk of one-off patterns

Return findings first, ordered by severity.

For each finding:
- Title
- Why it matters
- The smallest change that would fix or reduce it

Then end with:
- What is strong
- What must change before prototyping
- Whether the concept should be approved, revised, kept local, or rejected

If there are no significant findings, say that explicitly and mention any residual risk or testing gap.