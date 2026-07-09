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

### Theme module

This module owns presentation integration for the Leida app, including the app's MUI theme adapter and the shared monorepo design-system wiring.

## Design-system integration

Shared design-system integration now lives in `app/Leida/Theme/designSystem.ts`.

That file does two explicit things:

- imports `@leida/design-system/styles` so shared design-system CSS is loaded with the Leida theme layer
- re-exports approved shared presentational primitives for use by the app, currently `LeidaLogo`

## Why it lives here

The old `DS` folder name was too vague. The actual concern is not a separate app module, it is theme and presentation integration.

Putting this logic in `Theme` makes the ownership clearer:

- `Theme/Theme.tsx` loads shared design-system styles
- `Theme/components/MUI.tsx` applies the app's MUI theme
- `Theme/designSystem.ts` exposes the small set of shared design-system primitives the app is allowed to consume

## Current scope

Today the safe integration path is:

- use `@leida/design-system/styles`
- use selected source-level components from `@leida/design-system` when they are low-risk and presentational
- keep the app's local MUI theme adapter in place

Direct use of `@leida/ui` remains deferred until its MUI version is aligned with `apps/v3`.

## Usage rule

If a Leida component needs a shared design-system primitive, import it from `app/Leida/Theme/designSystem.ts` rather than reaching into `@leida/design-system` directly.