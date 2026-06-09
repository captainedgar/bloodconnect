# AGENTS.md

## Expo SDK 54

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code. New Architecture (`newArchEnabled`) and React Compiler (`reactCompiler`) are both enabled — code must be compatible with both.

## Commands

**Frontend (root):**
- `npm start` — start Expo dev server
- `npm run lint` — ESLint via `expo lint` (ignores `backend/`)
- `npx tsc --noEmit` — typecheck (no `typecheck` script in package.json)
- No test framework is installed; there are no tests
- No CI configuration exists

**Backend (`backend/`):**
- `npm run dev` — start with `tsx watch`
- `npm run typecheck` — typecheck
- `npm run db:migrate` — run Prisma migrations
- `npm run db:push` — push schema without migration
- `npm run db:generate` — regenerate Prisma client
- `npm run db:studio` — open Prisma Studio
- Backend requires a running PostgreSQL; copy `.env.example` to `.env` and configure `DATABASE_URL`

## Architecture

- **expo-router v6** file-based routing; entry is `expo-router/entry`
- `app/(tabs)/` — main tab group (index, profile, requests)
- `app/(auth)/` — auth group (login, register); auth guard in `app/_layout.tsx` redirects based on `isAuthenticated`
- `app/modal.tsx` — modal route
- `screens/` — standalone screen components not yet wired into the router (e.g. `MapScreen.tsx`)
- Path alias `@/*` maps to project root (configured in `tsconfig.json`)
- State: **zustand** (`store/`) · Data fetching: **@tanstack/react-query** (provider in root layout) · Forms: **react-hook-form** + **zod** · Maps: **react-native-maps** + **expo-location** · Realtime: **socket.io-client**
- `typedRoutes` experiment is on — route types are auto-generated under `.expo/types/` (generated on first `npx expo start`)
- API client in `services/api.ts` reads `EXPO_PUBLIC_API_URL` (defaults to `http://localhost:3000`); no `.env` file is committed
- Auth tokens persisted via `expo-secure-store` (`services/secure-store.ts`); axios interceptor auto-injects token and handles refresh on 401
- `backend/` — Node/Express/TypeScript API with Prisma + PostgreSQL; separate `package.json`, `tsconfig.json`, and `node_modules`

## Conventions

- Code in **English**, UI strings in **Spanish**
- Files: **kebab-case** (`blood-compatibility.ts`) · Components: **PascalCase** (`BloodBankMap.tsx`) · Hooks: **camelCase** (`useBloodBanks`) · Types: **PascalCase** (`BloodType`) · Constants: **UPPER_SNAKE_CASE** (`API_BASE_URL`)
- Theme colors in `constants/theme.ts` (light/dark); use `StyleSheet` from React Native — no CSS-in-JS or styling library
- Shared components in `components/`, hooks in `hooks/`, types in `types/`
- Backend follows controller → service → Prisma pattern; routes in `src/routes/`, validation with zod schemas
- `npm run reset-project` moves starter template to `app-example/` and creates a blank `app/` — **destructive**, do not run on a working branch
