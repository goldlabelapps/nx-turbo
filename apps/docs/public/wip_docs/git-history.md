# NX° Turbo — Git History & Development Timeline

> A chronological walkthrough of how the NX° Turbo monorepo was assembled, from the very first commit to the present state.

---

## Phase 1 — Bootstrapping the Repo (9 Jul 2026)

### Initial Commit
The project started with just three files: `.gitignore`, `LICENSE` (MIT), and an empty `README.md`. The copyright holder was promptly updated to **Goldlabel Apps Ltd**, the README was styled with a header, logo link, and media assets, and the first NX icon PNG was added to `docs/media/`.

### Monorepo Foundation
The second significant commit brought in the entire monorepo scaffold in a single large push:

- **`pnpm-workspace.yaml`** and root **`turbo.json`** defined the workspace and Turborepo pipeline.
- **`apps/example`** — a Next.js 13+ demo with App Router pages (`/client`, `/marketing`), design-system preview bundles (JS, CSS, tokens), and UI kit templates for an *aftercare app* and a *marketing landing page*.
- **`apps/v3`** — the production Next.js app (later renamed several times). It contained a full **Leida** feature suite: Auth, Clients, Layout, Flash movie-clip system, Chatbot, Shortcodes, Paywall, and TypeScript types.
- **`packages/design-system`** — CSS token system (base, colors, fonts, spacing, typography), component guidelines HTML cards, and template files.
- **`packages/ui`** — a lightweight MUI-backed TypeScript theme package.

---

## Phase 2 — Docs Standardisation (9 Jul 2026)

With the repo structure in place, the next several commits focused on creating a consistent documentation experience:

1. Added a branded **NX° Turbo header block** to every `docs/` markdown file (README, API/TypeScript, testing, theme, and per-app/package guides).
2. Fixed internal links so that opening any doc in isolation navigated correctly back to the root README.
3. Extended the same header treatment to the per-app and per-package doc pages under `docs/apps/` and `docs/packages/`.
4. Standardised all headings to `###` style, removed the obsolete `docs/leida.md` guide, and bumped the package to **v1.0.1**.

---

## Phase 3 — NX App Refactoring (9 Jul 2026)

The `apps/v3` app underwent a round of structural refactoring:

- **Routing** — The NX export was redirected through a `legacy-index` so `NXProvider` could be consumed independently.
- **Bootstrap** — Switched the v3 NX page to use the `NXProvider` wrapper; aligned integration tests with the updated entry points.
- **App rename** — `apps/v3` was renamed to **`apps/nx_3.0.0`** (a "swap" commit that preserved all file contents).

---

## Phase 4 — Multi-Tenant Architecture & New Apps (13 Jul 2026)

### New App: EdTech (`apps/ed-tech.co`)
An `ed-tech.co` Next.js app was added to the monorepo. It shares the same NX framework architecture (DesignSystem context, CleverText, Shortcodes, Paywall, Flash) as the main app, with its own GitHub Actions CI workflow. Dev/clean scripts were immediately standardised to use `pnpm`.

### New App: Python (`apps/python`)
A minimal Python app was scaffolded under `apps/python`:
- CLI entry point (`app/main.py`)
- `unittest` test suite
- `pyproject.toml` project metadata
- GitHub Actions workflow for compile + test
- Turbo-compatible `package.json` scripts

This made NX° Turbo one of the few JavaScript monorepos with a first-class Python workspace member.

### Docs Reorganisation
`apps/free.goldlabel.pro` docs were split into logical subdirectories: `architecture/`, `devops/`, `features/`, and `getting-started/`. A new `docs/README.md` TOC was added. The `config.json` site name was updated to **NX° Turbo** with `defaultTheme: light`.

### App Package Identity
- `apps/free.goldlabel.pro` renamed to **`apps/nx.goldlabel.pro`** (via `apps/free.goldlabel.pro` → `apps/nx_3.0.0` → `apps/nx.goldlabel.pro`).
- The default tenant was renamed from `free` to `nx` throughout config, server hooks, and tests.
- pnpm bumped from v8.15.0 to **v10.12.4**.

### CI & Toolchain Alignment
- GitHub Actions workflow migrated to **Node.js 22 + Corepack + pnpm**.
- `.node-version` and `.nvmrc` pinned to `22.22.2` at both repo root and app level.
- `.npmrc` and `pnpm-workspace.yaml` configured for strict package management.
- Turbo pinned to **2.10.4** in devDependencies.
- A `normalizeTenant` helper added so the legacy `free` slug maps to `nx` at runtime.

---

## Phase 5 — Toolchain Upgrades & Clean-Up (15 Jul 2026)

- Root workspace bumped to **v1.0.2**; pnpm and Turbo updated to latest patch versions.
- `pnpm-workspace.yaml` gained an `allowBuilds` section to comply with pnpm 11's explicit build-approval workflow.
- Dead Flash hooks (`useIsMobile`, `usePrefersColorScheme`) and a no-op paywall init action were removed, simplifying the NX app.
- All NX app documentation was **centralised into the root `docs/` tree** (removing per-app `docs/` folders). Four **Architecture Decision Records (ADRs)** were added.
- A `dev:all` workspace script was added (default `dev` excludes the Python app).
- A **design-system concept-lab toolkit** landed: three GitHub Copilot prompt commands (`generate-concepts`, `review-concept`, `systemize-patterns`), a formal design-review checklist (`docs/features/design-system-review-checklist.md`), and a disposable concept-lab HTML template (`packages/design-system/templates/concept-lab/`).
- The `ed-tech` dev script was fixed to skip a redundant `pnpm install` on startup.

---

## Phase 6 — Docs App, Storybook, & New Agent Apps (17 Jul 2026)

This was the most active single day of development.

### Docs Relocation
The entire `docs/` tree was moved to **`apps/docs/public/docs/`**, aligning documentation with the docs-app's public asset structure. README links and image paths were updated accordingly.

### Storybook
**Storybook 8 (React + Vite)** was added to `packages/design-system`:
- `.storybook/main.ts` and `preview.ts` configuration.
- Initial stories for Logo and Button components.
- Stories subsequently expanded to cover every design-system component: Eyebrow, Favicon (formerly StarMark), Accordion, Badge, Tag, Input, RangeSlider, SegmentedToggle, TopBar, Card, PriceTier, ProductCard, StatCard.
- Turbo pipeline tasks and root npm scripts for `storybook` and `build-storybook`.

### Agent App (`apps/agent`)
A new **Next.js agent frontend** was built from scratch:

1. **Scaffold** — Base layout, home page, 404 page, global styling, wired to `@nx/design-system`.
2. **Shell & Routes** — Full App Router structure with Workbench, Chat, History, and Settings routes inside a shared `AppFrame` with global navigation, route analytics, sitemap/robots, and loading/error states.
3. **API & Persistence** — Server routes for chat, workbench generation, and history retrieval. A `data/agent-history.json` file-based store was introduced, with async page rendering for real session data.
4. **PWA** — `next-pwa` integration with web app manifest, app icons, and installable metadata.
5. **Firebase Adapter** — A new `packages/firebase-adapter` workspace package using `firebase-admin` to read/write agent history from Firestore, with graceful fallback to the file store.

### nx-agent Package (`packages/nx-agent`)
A production-style **Eve framework** AI agent was scaffolded:
- Agent definition, channel auth configuration.
- Tools: `getProjectContext`, `proposeSensitiveAction`.
- Eval suite.
- `shadcn/ui` components and AI chat elements (conversation, message, reasoning, tool).
- Dev/start pinned to port **1991**.
- Documentation consolidated into `apps/docs/public/docs/packages/`.

### Node.js Version
Engine constraint relaxed from `>=20 <23` to `>=20 <25` to support Node 24.

### Logo Assets
All NX logo and star SVG variants replaced with clearly labelled placeholder artwork (accessibility attributes included) pending final brand delivery.

---

## Phase 7 — Design System Rebrand & UI Overhaul (17 Jul 2026)

### Palette Overhaul
The warm parchment/clay palette was replaced with a **bold, high-contrast cool scheme**:
- Deep night ink backgrounds (`#0b1020`)
- Electric cobalt neutrals
- Cool blue-white grounds (`#f4f7ff`)
- Vivid signal accent (`#ff4d00`)

Color tokens, brand components, Storybook backgrounds, and guideline cards were all updated.

### StarMark → Favicon
The shared brand icon component was renamed from `StarMark` to `Favicon` across all exports, stories, prompts, adherence rules, and UI kits. The `Logo` component was rebuilt using `Favicon` + `NX°` typography.

### NX App UI Redesign
Working through several iterative commits:

1. **Remove MUI wrappers** — The NX catch-all page, not-found, and sign-in screens were stripped of MUI layout dependencies.
2. **nx-flash package** — A new `@leida/nx-flash` workspace package introduced Flash-style stage primitives, MovieClip/Text components, Chatbot modules, ActionScript-style animation helpers, and icons.
3. **Three-column shell** — The NX site was refactored into a nav/main/sidebar panel layout with global CSS tokens.
4. **Webfonts** — Switched to **Instrument Sans**, **IBM Plex Mono**, and **Cormorant Garamond**.
5. **PageLink** — Refactored to consume the design-system `Button` component.
6. **Glass-morphism panels** — Nav, main, and sidebar columns styled with `site-panel` glass containers.
7. **Collapsible navigation** — `<details>`/`<summary>` accordion branches added to the nav tree.
8. **Markdown rendering** — Fixed invalid HTML where block-level shortcode output was wrapped in `<p>` or `<span>`.
9. **Type safety** — `any` params replaced with explicit `T_PageProps`/`T_PageParams` generics.
10. **Safe metadataBase** — `resolveMetadataBase` utility added to `layout.tsx` to handle missing or malformed config URLs gracefully.

### Agent Shell Routes Built
The full workbench route tree was constructed with all sub-pages, loading/error boundaries, and route analytics hooks.

---

## Phase 8 — Design System Presets & Docs Finalisation (18 Jul 2026)

### Selectable Design System Presets
The design system gained runtime **preset switching** via a `data-design-system` attribute on `<html>`:
- Presets introduced: `nx` (default), `neo-brutal`, `aurora`.
- App-level wiring from tenant config (`cartridges.designSystem.system`) and `NEXT_PUBLIC_DESIGN_SYSTEM`.
- The `aurora` preset was assigned to the docs app.
- The `agentic` (dark) preset was assigned to the agent app.

### Brand Assets Refresh
Old sketch files, avatar SVGs, and placeholder logo assets were removed. The NX favicon was updated with final artwork and shared under the design-system assets.

### Docs App Tenant Simplification
The docs app went through several rationalisation steps:

1. `public/docs` renamed to **`public/wip_docs`** for ongoing work.
2. `edtech` tenant renamed to `docs`; `free` and `edtech` slugs mapped to `docs` for backwards compatibility.
3. Docs app rebranded from **EdTech°** to **Docs°** with light theme default.
4. Tenant-based multi-context loading replaced with a single **`getDocsContext`** helper, flattening `public/docs/*` to `public/*`.

### Version Bump
Monorepo root version bumped to **v1.0.4**.

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Monorepo orchestration | [Turborepo](https://turbo.build/) + pnpm workspaces |
| Package manager | pnpm (v10 → v11) |
| Primary framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Design system | Custom CSS token system (`@nx/design-system`) with Storybook 8 |
| UI components | shadcn/ui (agent), MUI (legacy NX app) |
| Webfonts | Instrument Sans · IBM Plex Mono · Cormorant Garamond |
| AI / Agent | Vercel Eve framework (`packages/nx-agent`) |
| Backend storage | Firebase Firestore (production) · JSON file (fallback) |
| Polyglot support | Python (`apps/python`) with pytest/unittest |
| CI/CD | GitHub Actions (per-app workflows, Node 22, pnpm) |
| Deployment | Vercel (per-app `vercel.json`) |
| Node.js | 22.22.2 (pinned via `.nvmrc` / `.node-version`) |

---

## Workspace Structure (current)

```
nx-turbo/
├── apps/
│   ├── agent/          # AI agent Next.js PWA (dark agentic theme)
│   ├── docs/           # Documentation Next.js app (Aurora light theme)
│   ├── nx/             # Main NX° product app (nx theme)
│   └── python/         # Python CLI app
├── packages/
│   ├── design-system/  # CSS token design system + Storybook
│   ├── firebase-adapter/ # Firestore adapter for agent history
│   ├── nx-agent/       # Eve-based AI agent package
│   ├── nx-flash/       # Flash-style animation primitives
│   └── ui/             # Legacy MUI theme package
├── turbo.json          # Turborepo pipeline config
├── pnpm-workspace.yaml # pnpm workspace config
└── package.json        # Root workspace (v1.0.4)
```

---

*Generated from `git log --reverse` — all 26 PRs merged to `staging`.*
