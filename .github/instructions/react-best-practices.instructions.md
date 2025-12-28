---
applyTo: 'src/**/*.ts, src/**/*.tsx'
---

## useEffect Best Practices

Effects are for synchronizing with **external systems** only.

### Don't Use Effects For

- Deriving state from props (compute during render or use `useMemo`)
- Handling user actions (use event handlers)
- Chains of state updates (restructure logic)

### Do Use Effects For

- Subscriptions and cleanup
- Syncing with native modules
- Timer-based side effects

### Data Fetching

Use **React Query** (`@tanstack/react-query`) instead of raw `useEffect`:

```tsx
const { data, isLoading, isError } = useMeta(type, id);
```

---

## Debug Logging

Use the shared debug helpers:

```tsx
// In React components
const debug = useDebugLogger('ComponentName');
debug('eventName', { key: value });

// In non-React modules
const debug = createDebugLogger('ModuleName');
debug('eventName', { key: value });
```

Log important decision points: autoplay, stream selection, navigation branches, error recovery.

---

## Optional Chaining for Callbacks

- Prefer optional chaining over `typeof fn === 'function'` checks.
- Pattern: `const id = getId?.(item) ?? item.fallback;`
- Example:

```ts
// Good
const groupId = getItemGroupId?.(item) ?? item.groupId ?? null;
const label = getGroupLabel?.(groupId) ?? groupId;

// Avoid
const groupIdBad = typeof getItemGroupId === 'function' ? getItemGroupId(item) : item.groupId;
```
