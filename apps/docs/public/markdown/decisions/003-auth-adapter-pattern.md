---
order: 63
slug: /decisions/003-auth-adapter-pattern
title: "ADR-003: Auth Adapter Pattern"
description: Decision to implement an adapter pattern for authentication providers
tags: docs, decisions, adr, auth
icon: gavel
---

# ADR-003: Auth Adapter Pattern

**Status:** Accepted  
**Date:** 2024-01-01

## Context

Authentication is a cross-cutting concern. The platform may need to support multiple authentication providers (Auth0, Clerk, custom JWT) — and different apps or customers may require different providers. Changing providers mid-project should not require rewriting all authentication-related code across every app.

## Decision

Implement an **adapter pattern** in `@platform/auth`.

- Define an `AuthAdapter` interface with four methods: `getSession`, `login`, `logout`, `refreshSession`.
- Ship three concrete adapters: `JWTAdapter`, `Auth0Adapter`, `ClerkAdapter`.
- Provide a `<AuthProvider>` React context that accepts any `AuthAdapter` instance.
- Expose a `useAuth()` hook that returns a consistent API regardless of which adapter is active.
- Protect routes with a `<ProtectedRoute>` component that works with any adapter.

Applications select an adapter at the provider level. All other code uses `useAuth()` without any knowledge of which adapter is in use.

## Alternatives Considered

| Alternative | Reason not chosen |
|-------------|-----------------|
| Direct Auth0/Clerk SDK usage in apps | Tight coupling; migration requires changes throughout |
| Single provider with feature flags | More complex conditional logic; still requires changes when switching |
| NextAuth.js | Good option but adds another dependency and has its own conventions; adapter pattern gives more control |

## Consequences

- **Positive:** Swapping authentication providers requires only changing the adapter passed to `<AuthProvider>` — no other changes needed.
- **Positive:** The adapter interface is small and easy to implement for custom backends.
- **Positive:** Testing is straightforward — inject a mock adapter.
- **Negative:** The abstraction layer means provider-specific features (e.g. social login, MFA UI) must be surfaced through the adapter interface or used outside it.
- **Negative:** Adapters must be kept up-to-date when provider SDKs change.
- **Follow-on:** Consider adding optional methods to `AuthAdapter` for advanced flows (MFA, passkeys) without breaking the base interface.
