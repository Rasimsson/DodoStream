---
applyTo: '**/*.tsx, src/theme/**/*.ts'
---

## Theme & Styling

### Use Theme for ALL Visual Values

The theme (`src/theme/theme.ts`) is the **single source of truth** for:

- **Colors**: Use semantic names (`mainBackground`, `primaryBackground`, `cardBackground`)
- **Spacing**: Use `xs`, `s`, `m`, `l`, `xl`, `xxl`
- **Border radii**: Use `s`, `m`, `l`, `xl`, `full`
- **Card sizes**: Use `theme.cardSizes.media`, `theme.cardSizes.continueWatching`, etc.
- **Sizes**: Use `theme.sizes.inputHeight`, `theme.sizes.modalMinWidth`, etc.
- **Focus styling**: Use `theme.focus.borderWidth`, `theme.focus.scaleMedium`, etc.

### Styling Rules

```tsx
// CORRECT - Use Box/Text with theme props
<Box backgroundColor="cardBackground" padding="m" borderRadius="l">
  <Text variant="cardTitle" color="textPrimary">Title</Text>
</Box>

// CORRECT - Use theme values for dimensions
const theme = useTheme<Theme>();
<Box width={theme.cardSizes.media.width} height={theme.cardSizes.media.height} />

// WRONG - Hardcoded values
<Box style={{ width: 140, height: 200, backgroundColor: '#1F222A' }} />
```

### Never Hardcode

- Colors (use theme colors)
- Spacing/padding/margin (use theme spacing)
- Dimensions for cards, inputs, modals (use `theme.cardSizes` or `theme.sizes`)
- Focus border width or scale (use `theme.focus`)
- Toast durations (use constants from `ui.ts`)
- Playback timing values (use constants from `playback.ts`)
