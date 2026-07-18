# Themes Storybook

Central Storybook host for workspace themes.

## What it shows now

- Unix theme showcase (`Themes/Unix Showcase`)
- Newspaper theme showcase (`Themes/Newspaper Showcase`)
- Existing design-system component stories

## Run

```bash
pnpm --filter @nx/themes-storybook storybook
```

Build static output:

```bash
pnpm --filter @nx/themes-storybook build-storybook
```

## Deploy to Vercel

Use a dedicated Vercel project for this package.

Required project settings:

1. Root Directory: `packages/themes/storybook`
2. Framework Preset: `Other`
3. Build Command: `corepack pnpm build-storybook`
4. Output Directory: `storybook-static`

This package includes `vercel.json` with those build defaults so Vercel does not try to treat this deploy as Next.js.

## Add a new theme

1. Register it in `.storybook/themes.ts`.
2. Import that theme's styles in `.storybook/preview.tsx`.
3. Add a story under `stories/` showing the theme in context.

The Storybook toolbar options are generated from `themeRegistry`, so new entries appear automatically.
