# Framework

NX is not a single app. It is a reusable framework and starter architecture for building Next.js products fast.

## What it gives you

- App Router-based page delivery
- file-based content through tenant Markdown
- themeable UI through the design system
- shared state through Uberedux
- optional animation, auth, and commerce cartridges
- PWA support already configured

## How it is meant to be used

1. Choose or create a tenant under `public/<tenant>/`
2. Configure branding and cartridges in `config.json`
3. Add content in `markdown/`
4. Extend `app/NX/` when you need new framework behavior

The result is a modular template for launching a modern Next.js app without rebuilding the same platform concerns on every project.
