---
applyTo: '**/*.test.ts, **/*.test.tsx, **/jest.config.js, **/jest.setup.js'
---

## Testing (React Native)

Use the React Native testing approach that matches the confidence you need (fast feedback first; device realism last):

- **Static analysis**: Prefer catching issues early with **TypeScript** (type checking) and **ESLint** (linting).
- **Write testable code**: Keep modules small; separate **UI (components)** from **business logic/state** so logic can be tested without rendering.
- **Jest (JS tests)**: Use Jest for **unit** and **integration** tests. Keep each test focused and independent; structure as **Arrange / Act / Assert**; use `describe`, `beforeEach`, etc.
- **Mocking**: Prefer real dependencies when practical, but mock **external systems** (network, file/db I/O) and **native modules** when Node-based tests can’t run them.
- **Component tests**: Prefer **React Native Testing Library** and test from the **user perspective** (rendered text / accessibility queries + interactions). Avoid testing implementation details (props/state) and avoid relying on `testID` unless necessary.
- **Snapshots**: Use sparingly and keep them small; prefer explicit expectations when possible to reduce noisy diffs and accidental “update snapshot” behavior.
- **E2E tests**: Use device/simulator tests (commonly **Detox**; alternatives include Appium/Maestro) for critical flows. They provide highest confidence but are slower and can be flaky.
