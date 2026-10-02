# PawCare — agent notes

Expo SDK **57** / React Native 0.86 / React 19.2 / TypeScript 6, single package, npm (only
`package-lock.json`; **bun is not installed**). No CI, no README, no `src/` dir, no tests yet.

## Verified commands

```bash
npx tsc --noEmit   # the ONLY working check right now — passes clean
npm start           # or: npm run ios | npm run android
```

- **`npx expo lint` does not work.** No ESLint config exists, so it tries to auto-install
  `eslint@^9` + `eslint-config-expo@~57.0.2` and dies with `ERESOLVE`: `react-native-worklets`
  is pulled in by `@expo/ui` (via `expo-router`) at `*`, but `expo-modules-core@57.0.20` wants
  `^0.7.4 || ^0.8.0 || ^0.9.0 || ^0.10.0`. Don't "run lint before finishing" — there is no lint
  step. Typecheck is the verification step.
- **`npm run web` does not work.** `react-native-web` and `@expo/metro-runtime` aren't installed
  (`react-dom` is only a hoisted transitive dep). Web needs `npx expo install react-dom
  react-native-web @expo/metro-runtime` first.
- **Any `npx expo install <pkg>` will hit the same ERESOLVE**, since it shells out to `npm
  install`. Use `npm i --legacy-peer-deps`, or add an `expo.install.exclude` entry in
  `package.json` for `react-native-worklets` to stop the version-validation warning too.
- Always `npx expo install <pkg>` rather than `npm install <pkg>` — it resolves SDK-57-compatible
  versions.

## Routing — two traps

Routes live in **`app/` at the repo root**. `main` is `expo-router/entry` in `package.json`; the old
`App.tsx` + `index.ts` entry pair is deleted. Every file under `app/` is a screen; `_layout.tsx`
files define navigators. Keep components/hooks/utils in new top-level dirs (`components/`,
`hooks/`), never inside `app/`.

`src/app` is the SDK 55+ **template** convention and works equally well; the plugin's default
`root` is `"app"`. Both can coexist — `src/app` silently wins. Don't switch unless the user asks.

**SDK 56+ breaking change:** app code must no longer import from `@react-navigation/*`. Import
`Stack`, `Tabs`, `Link`, `useRouter`, etc. from `expo-router` instead. Nearly every YouTube
expo-router tutorial predates this and will not work here.
Docs: https://docs.expo.dev/router/migrate/sdk-55-to-56.md

1. **`app/Index.tsx` is capital-I and maps to route `/Index`, not `/`.** This is why the app shows
   an unmatched/blank route on launch. Expo Router maps the segment `index` → `''` (`''` + `/`),
   so the filename must be **lowercase** `index.tsx`. There is no case normalization in
   `getRoutesCore.js`. Confirmed in `.expo/types/router.d.ts`, which lists only `/Index` and
   `/_sitemap` — `/` is simply not a route. Rename to `app/index.tsx`. Watch for the same trap in
   other files, and on case-insensitive filesystems (macOS/Windows) the two names collide.
2. **There is no `app/_layout.tsx`, and that's fine for now** — `getRoutesCore.js` auto-injects a
   default root layout when none exists. But you cannot use `<Stack>`/`<Tabs>`, wrap providers, or
   configure a global `StatusBar` until you create it.

Typed routes are effectively **inert**: `app.json` has no `experiments.typedRoutes`, and
`tsconfig.json`'s `include: ["**/*.ts", "**/*.tsx"]` does not pick up
`.expo/types/router.d.ts` (tsc globs skip dot-directories), so `router.push()` hrefs aren't
checked. Add `".expo/types/**/*.d.ts"` to `include` if you want that checking.

## Native projects are generated

`/ios` and `/android` are in `.gitignore` and don't exist (Continuous Native Generation). Never
create or edit them by hand, never commit them. Configure native behavior in `app.json` or a
config plugin. Expo Go only bundles Expo's own native modules — anything else needs a dev build
(`npx expo run:ios|android` or `eas build --profile development`).

## Expo has changed — do not trust your training data

SDK 57 is well past what most model training covers. Before writing code against any Expo, EAS, or
React Native API, fetch the versioned docs rather than answering from memory:

1. Check the `expo` major version in `package.json`.
2. `https://docs.expo.dev/versions/v<major>.0.0/`
3. `https://docs.expo.dev/llms.txt` is an index of all Expo docs with explicit corrections to
   common LLM misconceptions. Follow it to the specific page.

## Repo state to be aware of

The bare-`App.tsx` → Expo Router migration is **uncommitted on `master`**: `App.tsx`/`index.ts`
are deleted and `app/` is untracked. Expect a dirty tree; don't "restore" the deleted files.