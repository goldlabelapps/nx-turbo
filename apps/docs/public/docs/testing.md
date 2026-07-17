<div>
	<h1 style="display: flex; align-items: center; gap: 8px;">
				<a href="../README.md" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
		<img
			src="./media/nx-icon.png"
			width="24"
			height="24"
		/>
		</a>
		<span>NX° Turbo</span>
	</h1>
</div>

### Testing Guide

## Stack

- Test runner: Jest
- DOM environment: jsdom
- UI testing: React Testing Library + user-event
- Setup file: `tests/jest.setup.ts`

## Commands

- `npm test`
- `npm run test:watch`
- `npm test -- <path-to-test-file>`

## Test Layout

- `tests/unit/`: pure logic, server hooks, API helpers, Redux/actions
- `tests/integration/`: multi-component interactions and store-driven behavior
- `tests/smoke/`: render sanity checks

## Covered Areas

- API helpers and route responses (`makeRes`, `makeTime`, `getEndpoints`, `/api` root route)
- Server markdown/navigation resolution (`serverUseMDBySlug`, `serverUseNav`, `serverUseAllMd`, `serverUseSlugs`, `serverUseRelated`)
- Redux and client actions (`setDesignSystem`, `navigateTo`, `setFlash`, paywall actions)
- UI integration (`Nav` theme toggle, `ShareVirus`, NX routing, NX bootstrap)
- Utility modules (`createSlug`, `militaryTime`, `makeIdentity`, `ageFromDoB`)

## Notes

- If a test imports high-level barrels that pull ESM-only dependencies, prefer focused module mocks for test isolation.
- For React-Redux selectors in mocks, use stable fallback references instead of inline `{}` values to avoid selector stability warnings.
