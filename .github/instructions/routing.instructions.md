---
applyTo: 'src/**/*.ts, src/**/*.tsx'
---

## Routing (expo-router)

```tsx
// Navigation
router.push({ pathname: '/details/[id]', params: { id, type } });

// Access params
const { id, type } = useLocalSearchParams<{ id: string; type: ContentType }>();
```

- Files in `src/app/` automatically become routes
- Use `_layout.tsx` for shared layouts
- Dynamic routes: `[id].tsx`
