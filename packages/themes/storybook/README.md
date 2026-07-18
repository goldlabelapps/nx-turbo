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

## Add a new theme

1. Register it in `.storybook/themes.ts`.
2. Import that theme's styles in `.storybook/preview.tsx`.
3. Add a story under `stories/` showing the theme in context.

The Storybook toolbar options are generated from `themeRegistry`, so new entries appear automatically.
