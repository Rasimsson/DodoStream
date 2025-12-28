# Contributing to DodoStream

Thanks for taking the time to contribute.

## Ways to help

- Report bugs (include reproduction steps + device/platform)
- Request features (explain the user problem and expected UX)
- Improve docs (README, setup notes, screenshots)
- Submit PRs (small, focused changes are easiest to review)

## Development setup

### Prerequisites

- Node.js (LTS recommended)
- `pnpm`
- Expo tooling (Android Studio / Xcode depending on target)

### Install

```bash
pnpm install
```

### Run

```bash
pnpm start
```

### Quality checks

```bash
pnpm lint
pnpm format
pnpm test
```

## Project conventions

- Keep changes minimal and focused; avoid drive-by refactors.
- Prefer TypeScript strict correctness.
- Use the existing theme tokens and shared components.
- For TV-interactive UI, use the existing focus primitives/components (e.g. `Focusable`).
- For data fetching, prefer the existing React Query hooks.

## Submitting changes

1. Fork the repo
2. Create a branch
3. Make your change (include tests if the area already has tests)
4. Run `pnpm lint` and `pnpm test`
5. Open a PR with:
   - what changed
   - why
   - how you tested

## Reporting bugs

Please include:

- Platform (Android TV / Android / tvOS), OS version
- Device model (if relevant)
- Steps to reproduce
- Expected vs actual behavior
- Logs if available
