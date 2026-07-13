# Virus°

[![npm version](https://badge.fury.io/js/virus.svg)](https://badge.fury.io/js/virus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

v2.1.9b - A client-side Virus feature module for Next.js + React, powered by Firebase and FingerprintJS.

## Overview

Virus° provides a complete visitor-identification and content loop:

- Fingerprint-aware visitor lifecycle (new vs returning visitor)
- Firestore-backed virus creation and live reads
- Virus score growth by page visits
- Drop-in UI entry points (`VirusButton`, `VirusDialog`) and pages (`Viruses`, `NewVirus`, `VirusPage`)
- Avatar + flag UI helper (`AvaFlag`) for identity display

The term "virus" in this module is thematic/game-like.

## Types

Core type definitions live in `types.d.ts` and describe the shape of fingerprint and geo payloads used throughout the module.

- `T_Fingerprint` — the main fingerprint document shape, including the device and geo blocks
- `T_DeviceInfo` — parsed browser/device metadata saved under `device`
- `T_Geo` — IP geolocation payload structure saved under `geo`
- `T_Email` — email payload structure used by the module

These types are the best place to understand the data contract for Firestore writes, fingerprint enrichment, and UI rendering.

## Installation

```bash
npm install virus
```

## Usage

Import the components and hooks as needed:

```tsx
import { Virus, useVirus, VirusButton } from 'virus';

// In your component
const MyComponent = () => {
  const { fingerprint } = useVirus();

  return (
    <div>
      <Virus />
      <VirusButton />
    </div>
  );
};
```

## Runtime Flow

1. `Virus.tsx` mounts and dispatches `initVirus()` when the virus slice is empty.
2. `initVirus()` lazily loads FingerprintJS and stores `visitorId` at `redux.virus.fingerprint`.
3. When a fingerprint exists, `checkFingerprint()` creates or updates `fingerprints/{fingerprint}`.
4. `useSubFingerprint()` subscribes to fingerprint document updates via `subscribeFingerprint()`.
5. If fingerprint doc has no `device` block, `parseDevice()` enriches it with browser/device metadata.
6. `fetchGeo()` enriches fingerprint with geolocation data.
7. `updateHistory()` tracks visitor page visit history.
8. UI components render identity, device data, geo data, and history information.

## Folder Map

```text
Virus/
|- 2.1.9b
|- config.json
|- index.tsx
|- README.md
|- types.d.ts
|- Virus.tsx
|- actions/
|  |- initVirus.tsx
|  |- setVirus.tsx
|  |- device/
|  |  `- parseDevice.tsx
|  |- fingerprint/
|  |  |- checkFingerprint.tsx
|  |  |- deleteFingerprint.tsx
|  |  |- forgetFingerprint.tsx
|  |  |- onFingerprint.tsx
|  |  |- subscribeFingerprint.tsx
|  |  `- updateFingerprint.tsx
|  |- geo/
|  |  `- fetchGeo.tsx
|  `- history/
|     `- updateHistory.tsx
|- components/
|  |- AvaFlag.tsx
|  |- Debug.tsx
|  |- DeviceData.tsx
|  |- Favourites.tsx
|  |- Fingerprint.tsx
|  |- GeoData.tsx
|  |- History.tsx
|  |- Identity.tsx
|  |- Score.tsx
|  |- Share.tsx
|  |- VirusButton.tsx
|  |- VirusDialog.tsx
|  |- Viruses.tsx
|  |- VirusPage.tsx
|  `- Mapbox/
|     |- index.tsx
|     |- Mapbox.tsx
|     |- mapboxDark.json
|     |- mapboxLight.json
|     `- MapPin.tsx
|- hooks/
|  |- useDoc.tsx
|  |- useFingerprint.tsx
|  |- useSubFingerprint.tsx
|  `- useVirus.tsx
`- utils/
   |- README.md
   |- deviceModels.json
   |- firebase.ts
   |- geoString.tsx
   |- index.tsx
   |- randomIdentity.tsx
   |- randomVirus.tsx
   |- utils.ts
   `- virusOutbreak.tsx
```

## Public API

Exports from `index.tsx`:

- Root: `Virus`
- Actions: `initVirus`, `setVirus`, `parseDevice`, `fetchGeo`, `checkFingerprint`, `deleteFingerprint`, `forgetFingerprint`, `onFingerprint`, `subscribeFingerprint`, `updateFingerprint`, `updateHistory`
- Hooks: `useDoc`, `useFingerprint`, `useSubFingerprint`, `useVirus`
- Utilities: `randomIdentity`, `randomVirus`, `virusOutbreak`, `geoString`, `deviceModels`
- Firebase helpers: `getFirebaseApp`, `getFirebaseAuth`, `getFirebaseFirestore`, `getFirebaseMessaging`, `getFirebaseStorage`
- UI components: `AvaFlag`, `Debug`, `DeviceData`, `Favourites`, `Fingerprint`, `GeoData`, `History`, `Identity`, `Score`, `Share`, `VirusButton`, `VirusDialog`, `VirusPage`, `Viruses`, `Mapbox`
- Types: `T_Fingerprint`, `T_DeviceInfo`, `T_Geo`, `T_Email`

## State + Data

### Redux slice

Expected location: `state.redux.virus`.

Common keys used by this module include:

- `fingerprint`
- `fingerprintDoc`
- `title`
- `clever`
- `icon`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
- `toggleText`
- `topViruses`

### Firestore collections

`fingerprints/{fingerprint}`

- `created: number` (epoch ms)
- `updated: number` (epoch ms)
- Optional `device` metadata set by `parseDevice()`

`viruses/{id}`

- user payload fields (for example `name`, `message`, optional `score`)
- `created: number` (epoch ms)
- `updated: number` (epoch ms)

## Environment Variables

Defined in `utils/firebase.ts`:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Integration

1. Ensure dependencies and host app integrations are available:
    - Firebase SDK (`firebase/app`, `firebase/firestore`, etc.)
    - FingerprintJS (`@fingerprintjs/fingerprintjs`)
    - Redux/Uberedux host wiring (`NX/Uberedux`)
    - Design System actions/components used by this module (`NX/DesignSystem`)

2. Mount the root entry component:

```tsx
import Virus from './Virus/Virus';

export default function AppShell() {
  return <Virus />;
}
```

3. Add route screens:

```tsx
// app/viruses/page.tsx
import { Viruses } from '../Virus';

export default function Page() {
  return <Viruses />;
}
```

```tsx
// app/viruses/new/page.tsx
import { NewVirus } from '../../Virus';

export default function Page() {
  return <NewVirus />;
}
```

```tsx
// app/viruses/[id]/page.tsx
import { VirusPage } from '../../Virus';

export default function Page() {
  return <VirusPage />;
}
```

4. Confirm Firestore rules permit reads/writes to:
    - `fingerprints`
    - `viruses`

## Behavior Notes

- `deleteFingerprint()` removes the document and sets a session flag to suppress immediate recreation.
- `forgetFingerprint()` removes the document, clears the session flag, then redirects to Google.
- `checkFingerprint()` sets visitor-specific UI copy for new vs returning users.
- `getFirebaseMessaging()` returns `null` on SSR or unsupported browsers.

## Developer Notes

- Prefer relative imports inside this module to avoid barrel-driven circular dependencies.
- `Virus.tsx` currently imports from the module barrel, so future refactors should keep cycle risk in mind.
- Some files still use permissive `any` typing; tighten types if extending action payloads.

---
Last updated: 8 May 2026