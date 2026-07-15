---
name: "Design System: Generate Concepts"
description: "Generate 3 design-system-aligned UI concepts for a page, flow, or component in this repo"
argument-hint: "Describe the page, flow, or component to explore"
agent: "agent"
---

Generate 3 clearly different design concepts for the user's requested page, flow, or component.

Use these repo references as hard constraints:
- [Design system overview](../../docs/features/design-system.md)
- [Copilot prompt pack](../../docs/features/design-system-copilot-prompts.md)
- [Token decision](../../docs/decisions/002-design-tokens.md)
- [Brand rules and component guidance](../../packages/design-system/SKILL.md)

Requirements:
- Reuse the existing design system and tokens.
- Prefer existing primitives before inventing anything new.
- Do not hardcode visual values that should come from tokens.
- Keep the concepts realistic for the current codebase.
- Make the concepts meaningfully different in hierarchy, density, and tone.

For each concept, return:
- Name
- Intent
- Visual idea in 3 to 5 sentences
- Existing primitives to reuse
- New patterns or variants proposed
- Token usage notes
- Accessibility notes
- Main risk
- Recommendation on whether the new parts should stay local or become shared

If the brief is too vague, ask only the minimum follow-up questions needed to generate useful concepts.