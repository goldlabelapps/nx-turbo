---
order: 31
slug: /devops/api
title: API
description: Framework API layer, response envelope, and endpoint registry
tags: docs, devops, nx, api
icon: api
---

# API

NX ships with a small framework API layer under `app/api/`.

## Current surface

- `GET /api` returns a standard response envelope plus endpoint metadata
- `app/api/lib/` contains shared response and endpoint helpers

## Response envelope

`makeRes()` wraps API responses in a consistent shape:

```json
{
  "meta": {
    "time": "formatted timestamp",
    "baseURL": "http://localhost:1999/api",
    "severity": "success",
    "message": "Welcome to NXAPI"
  },
  "data": {}
}
```

## Endpoint registry

`getEndpoints()` is the framework's endpoint catalogue. Today it advertises Markdown content access and is used by the API root response.

The client-side `fetchMarkdown()` action also expects a Markdown endpoint at:

```text
/api/markdown/?slug=/some-page
```

That makes the API layer part of the framework contract, even when individual route handlers are still lightweight.

## Helpers

| File | Responsibility |
| --- | --- |
| `route.ts` | API root entry point |
| `lib/makeRes.ts` | Standard response envelope |
| `lib/makeTime.ts` | Human-readable timestamps |
| `lib/getBaseurl.ts` | Dev vs production API base URL |
| `lib/getEndpoints.ts` | Endpoint metadata registry |
