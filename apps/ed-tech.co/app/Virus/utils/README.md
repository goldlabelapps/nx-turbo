# Utils Working Folder

This folder is a working area for utility and prompt-related assets used by the Virus module.

## Purpose

- Keep reusable prompt data and helper assets together.
- Allow rapid iteration on utility files without cluttering action/component folders.
- Provide a stable location for shared prompt-related resources.

## Current contents

- `randomVirus.tsx`: prompt generator logic.
- `virusOutbreak.tsx`: outbreak prompt logic.
- `parseDevice.tsx`: device parsing/update utility thunk.
- `utils.ts`: device formatting helpers.
- `deviceModels.json`: device model lookup data used by `parseDevice.tsx`.
- `index.tsx`: full barrel file for utility exports.

## Barrel exports

The barrel in `index.tsx` re-exports everything in this folder that is part of the runtime utility API:

- `parseDevice`
- `randomVirus`
- `pandemicPhases`
- `virusOutbreak`
- `formatLanguages`
- `formatDeviceSummary`
- `deviceModels`

## Import style

Prefer importing Virus utils from the folder barrel:

```ts
import { parseDevice, randomVirus, formatDeviceSummary } from './utils';
```

This keeps imports stable if utility files are reorganized later.

## Notes

- Files in this folder may be imported by runtime code.
- If a utility here becomes broadly reused, consider moving it to a dedicated shared folder later.
