---
applyTo: 'src/**/*.ts, src/**/*.tsx'
---

## Zustand Stores

### Store Patterns

- Use per-profile data structure: `byProfile: Record<string, Data>`
- Access active profile via `useProfileStore.getState().activeProfileId`
- Use selectors to avoid unnecessary re-renders

### Available Stores

- `profile.store.ts` — Profile management
- `profile-settings.store.ts` — Per-profile settings (player, languages)
- `watch-history.store.ts` — Watch progress
- `my-list.store.ts` — Saved items
- `addon.store.ts` — Installed Stremio addons
