# Testing

NX uses Jest with Testing Library and keeps tests under `tests/`.

## Suite layout

- `tests/unit/` covers utilities, Redux actions, server hooks, and API helpers
- `tests/integration/` covers assembled UI behavior such as nav state and Flash scenes
- `tests/smoke/` covers simple render checks for critical components

## What is covered today

- tenant resolution and metadata helpers
- Markdown discovery and navigation building
- API helper output and the `/api` root route
- Uberedux state updates
- design-system actions and theme toggling
- Flash-based components such as `ShareVirus`

## Configuration

- `jest.config.mjs` scopes the suite to `tests/`
- `tests/jest.setup.ts` loads `jest-dom` and browser shims
- the alias `@/` maps to the repository root

Run the suite with `yarn test`.
