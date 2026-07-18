---
order: 55
slug: /architecture/tech-stack
title: Tech Stack
description: Core technologies used by the NX runtime and app experience
tags: docs, nx, architecture, techstack
icon: settings
---
# Tech stack overview

NX combines modern web runtime tooling, UI frameworks, state management, and platform services.

## Core stack map

| Technology | Role | Deep dive |
| --- | --- | --- |
| [Next.js 16](https://nextjs.org/) | App framework, routing, SSR/SSG, API routes | [/architecture/tech-stack/nextjs](/architecture/tech-stack/nextjs) |
| [React 19](https://react.dev/) | UI rendering and component model | [/architecture/tech-stack/react](/architecture/tech-stack/react) |
| [Node.js](https://nodejs.org/) | Runtime for build, tooling, and server code | [/architecture/tech-stack/nodejs](/architecture/tech-stack/nodejs) |
| [TypeScript](https://www.typescriptlang.org/) | Static typing and shared contracts | [/architecture/tech-stack/typescript](/architecture/tech-stack/typescript) |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state via Uberedux | [/architecture/tech-stack/redux-toolkit](/architecture/tech-stack/redux-toolkit) |
| [Material UI](https://mui.com/) | Component library and theming layer | [/architecture/tech-stack/material-ui](/architecture/tech-stack/material-ui) |
| [Firebase](https://firebase.google.com/) | Authentication and backend integration | [/architecture/tech-stack/firebase](/architecture/tech-stack/firebase) |
| [GSAP](https://greensock.com/gsap/) | Animation engine for Flash/movieclip experiences | [/architecture/tech-stack/gsap](/architecture/tech-stack/gsap) |
| [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/) | Interactive maps | [/architecture/tech-stack/mapbox-gl](/architecture/tech-stack/mapbox-gl) |
| Turborepo + pnpm workspace | Monorepo orchestration and task pipelines | [/architecture/tech-stack/turborepo-nx](/architecture/tech-stack/turborepo-nx) |
| [Recharts](https://recharts.org/) | Chart rendering | n/a (covered in feature docs) |
| [Resend](https://resend.com/) | Email delivery in API workflows | n/a (covered in API docs) |
| [FingerprintJS](https://fingerprint.com/) | Visitor fingerprinting | n/a (covered in app-level implementation docs) |
| PWA tooling | Offline support and service worker output | n/a (covered in runtime/app docs) |

## 5Ws coverage model

Each deep-dive page follows a practical 5Ws structure:

- **What** the technology is in NX context
- **Why** NX uses it
- **Where** it appears in the codebase
- **Who** depends on it
- **When** it runs or is most relevant

## Related docs

- [Architecture](/architecture)
- [Framework](/architecture/framework)
- [Framework Core](/architecture/framework-core)
- [API + TypeScript](/architecture/tech-stack/api-typescript)
- [Features](/features)
