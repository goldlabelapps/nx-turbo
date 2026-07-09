---
name: leida-design
description: Use this skill to generate well-branded interfaces and assets for Leida (Ask Leida Ltd.), a B2B SaaS product giving solo skin therapists one living aftercare page per client. Contains essential design guidelines, colors, type, fonts, brand assets, and UI-kit components for prototyping or production. Editorial "skin & parchment" aesthetic: parchment grounds, italic Times display, DM Sans body, DM Mono labels, a single clay accent, frosted glass, warm shadows.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things are
- `readme.md` - the full design guide: brand context, content voice, visual foundations, iconography, component + UI-kit index.
- `styles.css` - the single stylesheet to link; it `@import`s every token file. Reference tokens by their CSS custom properties (e.g. `var(--leida-clay)`, `var(--font-serif)`, `var(--shadow-card)`).
- `tokens/` - colour, type, spacing/radius/shadow/motion, base element styles.
- `assets/logos/` - the Leida wordmark and sparkle mark (black / dusty / off-white SVGs). Copy these; never redraw them.
- `components/` - React primitives (`brand/`, `forms/`, `feedback/`, `surfaces/`, `navigation/`); each has a `.d.ts` (props) and `.prompt.md` (usage).
- `ui_kits/` - full page recreations: `marketing-site/`, `aftercare-app/`.
- `guidelines/` - foundation specimen cards.

## House rules (quick reference)
- Grounds = parchment/paper; text = warm brown ink; **one** accent = clay, and only clay. No pure black/white, no cool grey, no decorative gradients, **no emoji**, **no em dashes** in copy.
- Display type is **italic Times**, sentence case. Labels/buttons are **DM Mono UPPERCASE**, wide-tracked. Body is DM Sans.
- Everything interactive is a **pill**; cards are soft (26px) with **warm brown shadows**; float things on **frosted glass**.
- The **sparkle star** is the only recurring icon, use `StarMark` / the SVGs, not an icon library.
- Voice: a trusted colleague, plain, warm, second person, no hype.
