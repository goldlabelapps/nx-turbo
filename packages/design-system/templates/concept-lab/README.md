# Concept Lab

The concept lab is a disposable workspace for design-system exploration before any idea becomes production UI.

## What it is for

- Compare 2 to 3 design directions for one page, flow, or component.
- Capture the user brief, shared constraints, and review notes in one place.
- Decide what should become a token, primitive, variant, composed pattern, or stay local.
- Keep speculative work out of app code until the concept survives review.

## Files

- [ConceptLab.dc.html](./ConceptLab.dc.html): the starter concept-lab template.
- [ds-base.js](./ds-base.js): loads the local design-system tokens and bundle into the template.

## Recommended workflow

1. Run the workspace prompts from `.github/prompts/`.
2. Generate 2 to 3 directions for a single UI problem.
3. Paste the strongest ideas into [ConceptLab.dc.html](./ConceptLab.dc.html).
4. Review them against [docs/features/design-system-review-checklist.md](../../../docs/features/design-system-review-checklist.md).
5. Promote only the smallest reusable parts into the shared system.

## Included example

The starter file includes a worked example for the client aftercare living page refresh. It compares three directions:

- Editorial reassurance
- Action-first scan
- Recovery status hybrid

Use that example as a pattern for how to document a real review, then replace it with the next concept you want to explore.

## Preview

From the repo root:

```sh
pnpm preview:concept-lab
```

From the design-system package:

```sh
pnpm preview:concept-lab
```

The preview command opens [ConceptLab.dc.html](./ConceptLab.dc.html) directly in the browser using the local static template setup already used by the other design-system templates.