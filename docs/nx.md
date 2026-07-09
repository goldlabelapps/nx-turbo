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

# NX Guide

## Purpose

`app/NX` is the core platform/runtime layer used by pages and app modules.

## Entry Points

- `app/NX/index.tsx`: public NX export
- `app/NX/NX.tsx`: root NX wrapper component

## NX Wrapper Responsibilities

`NX.tsx`:

- reads Design System settings from tenant config (`cartridges.designSystem` or `features.designSystem`)
- initializes theme mode/theme switching into state when missing
- builds effective theme payload (`light` / `dark` mode)
- renders a visible fallback block when config/theme is invalid

## Main Subsystems

- `DesignSystem/`: theming, nav, layout components, markdown fetch actions, feedback, mapbox/fullscreen helpers
- `Uberedux/`: global dynamic Redux slice + provider/hooks
- `Paywall/`: auth/account/avatar subscription and account update flows
- `Flash/`: movieclip/actionscript style animated system
- `Shortcodes/`: markdown-embedded component mapping
- `lib/`: tenant/meta/firebase/server hooks/utilities

## Server Hook Layer

Under `app/NX/lib/serverHooks`:

- `serverUseConfig`
- `serverUseMDBySlug`
- `serverUseNav`
- `serverUseAllMd`
- `serverUseSlugs`
- `serverUseRelated`

These drive markdown routing, nav generation, and related-content lookup.

## NX Testing

- NX bootstrap integration: `tests/integration/nx-bootstrap.test.tsx`
- nav theme toggle integration: `tests/integration/nav-theme-toggle.test.tsx`
- paywall action unit tests: `tests/unit/nx/paywall/setPaywall.test.ts`, `tests/unit/nx/paywall/remote-actions.test.ts`
- Redux store behavior: `tests/unit/redux/store.test.ts`
