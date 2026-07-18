---
order: 52
slug: /architecture/framework-core
title: Framework Core
description: The NX runtime layer that wraps and configures every rendered page
tags: docs, nx, architecture, framework
icon: settings
---
`app/NX/` is the framework runtime that wraps every rendered page.

The top-level `NX` component reads the active tenant configuration, resolves the current theme, and mounts shared UI such as feedback handling before page content renders.

## Core responsibilities

- bridge tenant config into the runtime
- mount the design system
- expose shared state through Uberedux
- support feature cartridges such as Flash, Paywall, and Shortcodes

Use this alongside [Framework](/architecture/framework) for the product-level story and [NX folders](/architecture/nx-folders) for the concrete folder map.
