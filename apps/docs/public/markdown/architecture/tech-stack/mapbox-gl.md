---
order: 50
slug: /architecture/tech-stack/mapbox-gl
title: Mapbox GL
description: How NX integrates geospatial maps into reusable design-system components
tags: docs, nx, architecture, techstack, mapbox
icon: map
---
# Mapbox GL

## What

Mapbox GL provides interactive vector map rendering used by map-capable NX UI components.

## Why

It gives NX a production-grade map stack for location-centric features without custom map rendering infrastructure.

## Where

- Dependencies: `mapbox-gl`, `react-map-gl`
- Reusable components and wrappers in design-system/component areas
- Content and feature surfaces that require geospatial context

## Who

- Feature engineers integrate map components into product flows
- Content authors and product teams embed location-aware experiences
- End users interact with map visualizations in supported routes

## When

Mapbox initializes when map components mount and receives updates from props/state as users interact with geospatial data.
