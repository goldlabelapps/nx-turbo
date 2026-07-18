# @nx/newspaper

A newspaper-inspired theme system for dense, readable editorial products.

## Design Principles

- Build around hierarchy: lead stories, secondary stories, and section rails.
- Increase information density while preserving scanability.
- Keep a refined, ad-free visual language with strong type rhythm.
- Prioritize mobile-first reading comfort and desktop compositional power.

## Installation

```bash
pnpm add @nx/newspaper
```

## Usage

```tsx
import "@nx/newspaper/styles";
import { NewspaperShell, Masthead, StoryGrid, LeadStoryCard } from "@nx/newspaper";

export function HomePage() {
  return (
    <NewspaperShell>
      <Masthead title="NX Times" sections={["News", "Engineering", "AI", "Product"]} />
      <StoryGrid
        lead={
          <LeadStoryCard
            eyebrow="Top Story"
            title="A cleaner editorial experience for deep technical content"
            dek="Built for focus and speed, without ads or visual noise."
            href="/article/editorial-experience"
          />
        }
      />
    </NewspaperShell>
  );
}
```

## Exports

- Main components from package root.
- CSS from `@nx/newspaper/styles`.
- Token object from `@nx/newspaper/tokens`.
