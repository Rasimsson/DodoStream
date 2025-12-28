---
applyTo: '**/*.tsx'
---

## TV Platform & Focus Management

### Use `<Focusable>` Wrapper

For TV focus handling, use the `<Focusable>` component from `src/components/basic/Focusable.tsx`.

### Focus Styling Rules

**CRITICAL**: Only MediaCard and ContinueWatchingCard should have outline focus. All other components (buttons, tags, list items, settings, etc.) should use **background and/or text color changes** for focus indication.

**Pattern 1: Color-based focus (DEFAULT for most components)**

Use background/text color changes via render prop. This is the standard pattern for buttons, tags, list items, settings, etc.

```tsx
// CORRECT - Color-based focus (no outline)
<Focusable onPress={handlePress}>
  {({ isFocused }) => (
    <Box
      backgroundColor={isFocused ? 'focusBackground' : 'cardBackground'}
      borderRadius="l"
      padding="m">
      <Text color={isFocused ? 'focusForeground' : 'textPrimary'}>Card Content</Text>
    </Box>
  )}
</Focusable>
```

**Pattern 2: Outline focus (ONLY for MediaCard/ContinueWatchingCard)**

Use `withOutline` prop + render prop to get `focusStyle` for the image container.

```tsx
// CORRECT - Outline focus for media cards only
<Focusable onPress={handlePress} withOutline>
  {({ focusStyle }) => (
    <Box width={theme.cardSizes.media.width} gap="s">
      {/* Apply focusStyle to image container */}
      <Box borderRadius="l" overflow="hidden" backgroundColor="cardBackground" style={focusStyle}>
        <Image source={posterSource} />
      </Box>
      <Text variant="cardTitle">{title}</Text>
    </Box>
  )}
</Focusable>
```

**Pattern 3: Button with focus background**

```tsx
// CORRECT - Button changes background on focus
<Focusable onPress={handlePress}>
  {({ isFocused }) => (
    <ButtonContainer
      style={isFocused ? { backgroundColor: theme.colors.focusBackgroundPrimary } : undefined}>
      <Text>Button</Text>
    </ButtonContainer>
  )}
</Focusable>
```

**WRONG - Using outline focus on non-media components:**

```tsx
// WRONG - Don't use outline focus on buttons, tags, list items, etc.
<Focusable
  onPress={handlePress}
  focusStyle={{
    outlineWidth: theme.focus.borderWidth,
    outlineColor: theme.colors.primaryBackground,
  }}>
  <Button />
</Focusable>
```

### Focus State Naming

Always use `isFocused` (not `focused`) for consistency across the codebase.

### Focus vs Active State

Focus and active states must be visually distinct:

- **Focus**: Use `focusBackground` / `focusForeground` colors
- **Active/Selected**: Use `primaryBackground` / `primaryForeground` colors

### Focus Visual Feedback

- Only MediaCard/ContinueWatchingCard use outline focus (`withOutline` prop)
- All other components use `focusBackground` and `focusForeground` theme colors
- Use `theme.focus.scaleMedium` (1.05) for scale transform on TV when needed
- Always test with D-pad/remote controls

---

## Advanced Focus Management

When standard focus behavior is insufficient, use `react-native-tvos` specific features.

### 1. TVFocusGuideView

Use `TVFocusGuideView` to manage focus groups, redirect focus, or trap focus.

```tsx
import { TVFocusGuideView } from 'react-native';

// Redirect focus to specific destinations
<TVFocusGuideView destinations={[viewRef.current]}>
  {/* content */}
</TVFocusGuideView>

// Trap focus within a container (e.g., for modals or sidebars)
<TVFocusGuideView trapFocusLeft trapFocusRight>
  {/* content */}
</TVFocusGuideView>

// Auto-focus the first focusable child or remember last focused child
<TVFocusGuideView autoFocus>
  {/* content */}
</TVFocusGuideView>
```

### 2. Preferred Focus

Use `hasTVPreferredFocus` to force focus to a specific element when the screen mounts or updates.

```tsx
// Force focus to this element
<Focusable hasTVPreferredFocus>{/* content */}</Focusable>
```

### 3. Explicit Focus Navigation

Use `nextFocus*` props to override default directional navigation.

```tsx
<Focusable nextFocusDown={nextItemRef.current} nextFocusRight={sideItemRef.current}>
  {/* content */}
</Focusable>
```
