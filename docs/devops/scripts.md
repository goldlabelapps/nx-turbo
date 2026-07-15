# Scripts

## Monorepo root

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all JavaScript/TypeScript dev tasks via Turbo, excluding `apps/python` |
| `pnpm run dev:all` | Start all dev tasks including `apps/python` |

## NX app

| Command | Description |
| --- | --- |
| `pnpm --filter ./apps/nx.goldlabel.pro dev` | Start the development server on port 1999 |
| `pnpm --filter ./apps/nx.goldlabel.pro build` | Build for production |
| `pnpm --filter ./apps/nx.goldlabel.pro start` | Start the production server |
| `pnpm --filter ./apps/nx.goldlabel.pro test` | Run the Jest test suite |
| `pnpm --filter ./apps/nx.goldlabel.pro lint` | Run ESLint |
| `pnpm --filter ./apps/nx.goldlabel.pro typecheck` | Run the TypeScript checker |
| `pnpm --filter ./apps/nx.goldlabel.pro clean` | Remove build artifacts |
