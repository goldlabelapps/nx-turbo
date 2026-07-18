---
order: 49
slug: /architecture/tech-stack/gsap
title: GSAP
description: How NX uses GSAP for Flash-style animation timelines and interaction effects
tags: docs, nx, architecture, techstack, gsap
icon: movie
---
# GSAP

## What

GSAP is the animation engine behind NX Flash and movieclip-style interactions.

## Why

GSAP enables precise timeline control and smooth animation choreography that CSS-only approaches would make harder to maintain at feature scale.

## Where

- Flash feature docs: `/features/flash`, `/features/chatbot-movieclip`, `/features/share-virus`
- Flash runtime components: `app/NX/Flash/**`
- Feature-level animation flows in app routes and cartridges

## Who

- Front-end engineers building interactive scenes use GSAP timelines
- Product teams use Flash-based experiences for rich storytelling
- End users receive motion-driven interfaces and transitions

## When

GSAP is invoked during mount/interaction phases of Flash features, route transitions, and context-specific animated content blocks.
