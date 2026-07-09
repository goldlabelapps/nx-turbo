# Flash

Flash is NX's animation cartridge.

It provides a stage component, movie clip primitives, small ActionScript-style controllers, and shared state helpers for interactive scenes.

## Main pieces

- `Flash.tsx` renders the animation stage
- `MovieClips/` contains reusable animated components
- `ActionScript/` contains controller classes for motion logic
- `lib/actions/setFlash.tsx` writes Flash state into Uberedux
- `lib/hooks/` exposes Flash-oriented runtime hooks

It powers components such as the chatbot movie clip and `ShareVirus`.
