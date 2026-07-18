---
order: 43
slug: /architecture/tech-stack/react
title: React
description: How NX uses React components, hooks, and composition for UI runtime
tags: docs, nx, architecture, techstack, react
icon: language
---
# React

## What

React is the UI composition model in NX. Pages, cartridges, design-system components, and markdown-rendered widgets all resolve to React component trees.

## Why

React enables reusable UI primitives and predictable component composition across tenants, features, and application surfaces.

## Where

- Runtime shell: `app/NX/**`
- Route-level pages: `app/**/page.tsx`
- Markdown component rendering: `react-markdown` usage in route and shortcode components
- Shared UI packages: `packages/ui/**`

## Who

- Front-end contributors build and maintain UI with React
- Content/product teams consume React-backed shortcodes inside markdown
- End users interact with React-rendered application shells and feature pages

## When

React is active in every render cycle: initial server render, hydration, client navigation, and dynamic state updates.
