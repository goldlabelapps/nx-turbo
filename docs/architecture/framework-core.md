# Framework core

`app/NX/` is the framework runtime that wraps every rendered page.

The top-level `NX` component reads the active tenant configuration, resolves the current theme, and mounts shared UI such as feedback handling before page content renders.

## Core responsibilities

- bridge tenant config into the runtime
- mount the design system
- expose shared state through Uberedux
- support feature cartridges such as Flash, Paywall, and Shortcodes

Use this alongside [Framework](framework.md) for the product-level story and [NX folders](nx-folders.md) for the concrete folder map.
