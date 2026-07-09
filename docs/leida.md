<div>
	<h1 style="display: flex; align-items: center; gap: 8px;">
		<a href="../" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
		<img
			src="./media/nx-icon.png"
			width="24"
			height="24"
		/>
		</a>
		<span>NX° Turbo</span>
	</h1>
</div>

# Leida Guide

## Purpose

`app/Leida` contains the Leida app module and domain-specific flows:

- Auth
- Clients
- Products
- Routines
- Theme
- UI
- Layout

## Entry Points

- `app/Leida/index.tsx`: Leida barrel exports for components, actions, and hooks
- `app/Leida/Leida.tsx`: main routed Leida shell

## Runtime Behavior

`Leida.tsx`:

- bootstraps feature slices by dispatching init actions (`initAuth`, `initClients`, `initProducts`, `initRoutines`, `initUI`, `initLayout`, `initTheme`)
- computes `isAppReady` from slice init flags
- toggles layout loading state using `setLayout('isLoading', ...)`
- normalizes route paths and renders route-specific pages (`/`, `/theme`, `/routines`, `/products`, `/clients`)

## Key Modules

- `Auth/`: login/logout UI and auth state actions
- `Clients/`: list fetch + email workflow and client state hooks/actions
- `Products/`: product dataset + routine card UI
- `Routines/`: AM/PM routine staging and product sequence rendering
- `Theme/`: MUI wrappers and theme state
- `UI/`: email form and UI state
- `Layout/`: shared shell, nav, header/footer/loading

## Utility

- `app/Leida/lib/ageFromDoB.ts`: calculates user-friendly age string with validation

## Leida Testing

- routing/init integration: `tests/integration/leida-routing.test.tsx`
- age utility coverage: `tests/unit/leida/ageFromDoB.test.ts`
- auth/clients action flows: `tests/unit/leida/actions/auth-clients.test.ts`
