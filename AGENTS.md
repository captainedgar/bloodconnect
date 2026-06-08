# AGENTS.md

## Expo SDK 54

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code. New Architecture (`newArchEnabled`) and React Compiler (`reactCompiler`) are both enabled — code must be compatible with both.

## Commands

- `npm start` — start Expo dev server
- `npm run lint` — ESLint via `expo lint`
- `npx tsc --noEmit` — typecheck (no `typecheck` script exists in package.json)
- No test framework is installed; there are no tests

## Architecture

- **expo-router v6** file-based routing; entry is `expo-router/entry`
- `app/` is the router directory; `app/(tabs)/` is the tab group, `app/modal.tsx` is a modal route
- `screens/` holds standalone screen components not yet wired into the router (e.g. `MapScreen.tsx`)
- Path alias `@/*` maps to project root (configured in `tsconfig.json`)
- State: **zustand** · Data fetching: **@tanstack/react-query** · Maps: **react-native-maps** + **expo-location**
- `typedRoutes` experiment is on — route types are auto-generated under `.expo/types/`

## Conventions

- UI strings are in **Spanish**
- Theme colors in `constants/theme.ts` (light/dark); no CSS-in-JS or styling library
- Components in `components/`, hooks in `hooks/`
- `npm run reset-project` moves starter template to `app-example/` and creates a blank `app/` — destructive, do not run on a working branch
