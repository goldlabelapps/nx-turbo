# Architecture

## Codebase structure

```text
/
|- app/                     Next.js App Router root
|  |- [[...slug]]/page.tsx Single catch-all page route
|  |- api/                 REST API handlers and utilities
|  \- NX/                  Framework core, design system, state, and cartridges
\- public/
  |- nx/
   |  |- config.json       Tenant configuration
   |  \- markdown/         Tenant content
   \- shared/              Shared static assets
```

## Multi-tenant model

The active tenant is selected through `NEXT_PUBLIC_TENANT`. Each tenant lives in `public/<tenant>/` with its own `config.json` and `markdown/` content tree.

## Markdown-as-CMS

A single catch-all route resolves URLs to Markdown files, renders them, and builds navigation directly from the content folder structure.

## Cartridges

Tenant features are enabled through `cartridges` in `config.json`, including `designSystem`, `paywall`, `lingua`, `echoPay`, and `images`.

## Uberedux

Client state is managed through a single Redux slice using dot-notation keys such as `designSystem.themeMode`.

## Shortcodes

Markdown content can render React components through shortcode syntax:

```md
[PageLink icon="rocket" title="Get started" url="/help"]
[CleverText text="Ready to create an NX app?"]
```

## Request flow

```text
URL -> [[...slug]]/page.tsx
  -> getTenant()
  -> serverUseMDBySlug()
  -> gray-matter
  -> serverUseNav()
  -> <NX>
  -> rendered page
```

For implementation detail, see [NX folders](nx-folders.md), [API](../devops/api.md), and [Testing](../devops/testing.md).
