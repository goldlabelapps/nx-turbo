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

### API + TypeScript Guide

## API Location

All API handlers are in `app/api`.

- `app/api/route.ts` - root API metadata/index response
- `app/api/clients/route.ts` - clients list endpoint (paged or random)
- `app/api/products/route.ts` - products list endpoint (paged or random)
- `app/api/email/route.ts` - outbound email endpoint using Resend

## Shared API Utilities

- `app/api/lib/makeRes.ts` - normalized response envelope
- `app/api/lib/makeTime.ts` - timestamp formatting helper
- `app/api/lib/getEndpoints.ts` - endpoint metadata list for API root
- `app/api/lib/getBaseurl.ts` - base URL resolver
- `app/api/lib/getSupabasePublicClient.ts` - Supabase client access for server handlers

## Route Behavior Summary

### `GET /api`

Returns success meta plus endpoint metadata list, with current message value `NX° API`.

### `GET /api/clients`

- query params: `number`, `page`, `random`
- default paging: `number=100`, `page=1`
- random mode accepts: `true`, `1`, `yes`, `on`
- returns query summary, pagination object, and list

### `GET /api/products`

- query params: `number`, `page`, `random`
- orders non-random results by `updated` descending
- returns query summary, pagination object, and list

### `POST /api/email`

- validates required fields: `toEmail`, `toName`, `subject`, `template`, `body`
- supports `basicEmailTemplate`
- requires `RESEND_API_KEY`
- returns success/error envelope via `makeRes`

## TypeScript Contracts

Project-level and NX types are defined in:

- `app/types.d.ts`
- `app/NX/types.d.ts`

Notable shared types include:

- `T_LeidaProps`, `LeidaRoutePath`, email payload/response types
- `T_Config`, `T_Theme`, `T_Frontmatter`, nav interfaces
- `I_NX`, `I_DesignSystem`, `I_MakeRes`, and severity enums

## API Tests

- `tests/unit/api/route.test.ts`
- `tests/unit/api/getEndpoints.test.ts`
- `tests/unit/api/getBaseurl.test.ts`
- `tests/unit/api/makeRes.test.ts`
- `tests/unit/api/makeTime.test.ts`
