# Uberedux

Uberedux is the framework state layer.

Instead of many feature slices, NX uses a single Redux slice and writes values by dotted paths such as `designSystem.themeMode` or `flash.sceneOpen`.

## Why it exists

- keeps shared framework state simple
- removes boilerplate for new cartridges
- makes cross-feature UI state easy to coordinate

## Main pieces

- `store.ts` defines the single slice and `setUbereduxKey`
- `UbereduxProvider.tsx` mounts the store
- hooks in `hooks/` expose dispatch and state access

This is the glue between the design system, Flash, paywall, and content-driven UI.
