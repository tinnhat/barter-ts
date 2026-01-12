# update_ui_v2 — Change log and instructions

Summary
- Created branch: `update_ui_v2`.
- Added Vitest and testing-library for unit tests.
- Added initial unit tests for `src/utils.ts`.
- Added `src/setupTests.ts` for test setup.
- Added a basic Chakra UI theme at `src/theme.ts` and wired it into `src/main.tsx`.
- Updated `vite.config.ts` with Vitest configuration.
- Updated `package.json` scripts and devDependencies (Vitest + testing libs).

Files changed/added (workspace-relative)
- [Front-end/package.json](Front-end/package.json)
- [Front-end/vite.config.ts](vite.config.ts)
- [Front-end/src/setupTests.ts](src/setupTests.ts)
- [Front-end/src/__tests__/utils.test.ts](src/__tests__/utils.test.ts)
- [Front-end/src/theme.ts](src/theme.ts)
- [Front-end/src/main.tsx](src/main.tsx#L1-L80)

How to run locally
1. Switch to the branch:

```
cd Front-end
git checkout update_ui_v2
```

2. Install dependencies:

```bash
cd /Users/nguyennhattin/Developer/barter-ts/Front-end
npm install
```

3. Run tests:

```bash
npx vitest --run
```

4. Start dev server:

```bash
npm run dev
```

Notes & Next steps
- I added a central Chakra theme to improve the look-and-feel. The full UI migration to Chakra components is not yet complete — that is the next major task (refactor components in `src/components` and pages in `src/pages` to use Chakra primitives and remove duplicated SCSS where appropriate).
- I created an example unit test suite for `src/utils.ts` (see `src/__tests__/utils.test.ts`) with clear comments.
- I kept existing SCSS files intact to avoid large breaking changes in one commit; a phased component-by-component migration is recommended.

If you'd like I can:
- Continue migrating components (header, footer, product list, forms) to Chakra UI one-by-one.
- Add more unit tests for hooks and critical components.
- Run a TypeScript/ESLint sweep and fix issues introduced by the migration.

Please confirm if you want me to proceed automatically migrating all components to Chakra UI, or if you'd prefer a prioritized list (e.g., header/footer first).