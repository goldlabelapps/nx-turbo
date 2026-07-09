# Design System Overview

## Purpose

The Leida design system provides tokens, brand assets, reusable components, and UI kits.

## Core Structure

- `tokens/`: colors, typography, spacing, fonts, base styles
- `assets/`: backgrounds and logos
- `components/`: brand, forms, feedback, surfaces, navigation
- `guidelines/`: design foundation reference cards
- `ui_kits/`: complete page-level compositions

## Brand Direction

- Warm paper-based palette with a single clay accent
- Editorial typography stack
- Soft corners, warm elevation, frosted glass treatments
- Plain, peer-to-peer copy tone

## Implementation Notes

- `styles.css` is the primary entry point for shared styling.
- Keep prompt markdown in component directories for AI/tooling usage.
- Treat generated artifacts (`_ds_bundle.js`, manifests) as non-source outputs.
