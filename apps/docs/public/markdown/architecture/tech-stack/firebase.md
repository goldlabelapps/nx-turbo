---
order: 48
slug: /architecture/tech-stack/firebase
title: Firebase
description: How Firebase supports authentication and backend integration in NX cartridges
tags: docs, nx, architecture, techstack, firebase
icon: lock
---
# Firebase

## What

Firebase provides authentication and related backend integrations for NX paywall/account features.

## Why

NX uses Firebase to ship production-ready identity workflows quickly, including user sessions and protected user-facing surfaces.

## Where

- Client bootstrap: `app/NX/lib/firebase.ts`
- Auth-driven surfaces: `app/account/**`, paywall feature areas
- Config wiring: tenant/runtime configuration and environment variables

## Who

- Platform contributors maintain auth integration points
- Product teams build subscription/account experiences on top of it
- End users authenticate through Firebase-backed flows

## When

Firebase is initialized when auth-aware pages or cartridges load and remains active through user authentication and account interactions.
