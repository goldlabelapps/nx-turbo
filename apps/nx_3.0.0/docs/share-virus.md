# ShareVirus

`ShareVirus` is a Flash-style branded scene used by the `virus` cartridge and related full-screen flows.

It renders an animated NX logo, wraps the scene in the shared design system, and provides actions to restart the experience or jump to the tenant's admin route.

## Notes

- supports tenant-specific logo assets
- supports a 404 logo variant through the `is404` prop
- has a dialog wrapper component in `ShareVirusApp.tsx` for modal presentation

The implementation lives in `public/shared/flash/ShareVirus/`.
