# CI/CD

NX uses GitHub Actions for continuous integration.

## Workflow

The repository currently ships one workflow:

- `.github/workflows/build.yml`

It runs on every pull request against any branch and treats the repo like a framework that must stay healthy at the platform level before changes are merged.

## What it does

1. checks out the repository
2. sets up Node.js 20 with Yarn cache
3. installs dependencies with `pnpm install --frozen-lockfile`
4. runs `pnpm --filter ./apps/nx.goldlabel.pro lint`
5. runs `pnpm --filter ./apps/nx.goldlabel.pro typecheck`
6. runs `pnpm --filter ./apps/nx.goldlabel.pro test --runInBand`
7. runs `pnpm --filter ./apps/nx.goldlabel.pro build`

## Why this matters

This pipeline protects the framework contract from four angles:

- **linting** keeps the codebase consistent
- **typechecking** protects framework APIs and shared types
- **tests** catch regressions in utilities, API helpers, Redux behavior, and UI integration points
- **build** proves the Next.js app still compiles as a working starter framework

## Position in the repo

For an open source framework repo, the workflow acts as a quality gate for pull requests rather than a deployment pipeline. It is focused on proving that NX remains a reliable, reusable base for spinning up modern Next.js apps quickly.
