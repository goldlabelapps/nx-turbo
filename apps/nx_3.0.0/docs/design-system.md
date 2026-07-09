# Design system

The design system is the UI cartridge that gives NX a ready-made application shell.

## Responsibilities

- build the active MUI theme
- render shared chrome such as header, footer, nav, hero, and feedback
- expose hooks for config, theme, feedback, and Markdown loading
- provide reusable components such as icons, fullscreen controls, and maps

`DesignSystem.tsx` is the entry point. It mounts the MUI `ThemeProvider`, resets loading state on route changes, and stores config in Uberedux when needed.
