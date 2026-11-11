# Tripadvancer frontend — agent context

## Project map

- This repository is the Tripadvancer web frontend (package `tripadvancer_frontend`), built with Next.js App Router, React, TypeScript, and Tailwind CSS.
- Its sibling backend repository is `../backend` (`tripadvancer-backend`), a NestJS API backed by Prisma, PostgreSQL/PostGIS, and Redis. For backend-related work, read `../backend/README.md`, the relevant module under `../backend/src/`, and `../backend/prisma/schema.prisma` before changing assumptions or contracts.
- The user has authorized changes in both the frontend and sibling backend repositories. Make coordinated changes across both when the task requires it, and keep backend schema and DTOs as the source of truth for API contracts.

## Frontend architecture

- Routes live in `src/app/`. Route groups `(portal)` provide the shared header/footer and cover the landing, feed, country, place, and user pages. `(maps)` contains the full-screen `/maps` experience. `(auth)` contains authentication callbacks and account recovery/deletion flows.
- Feature UI is organized under `src/components/features/` by domain; reusable primitives are in `src/components/ui/`; app-wide client providers are in `src/components/providers/` and `src/app/providers.tsx`.
- Backend-facing client queries use RTK Query. `src/utils/redux/services/api.ts` defines the shared base API; domain endpoints are injected from `src/utils/redux/services/*/*.api.ts`. `src/utils/redux/store.ts` configures the store and persists the `map`, `user`, and `widget` slices in browser storage. Internal Next.js routes use `internalAPI` and `src/app/api/`.
- Server-rendered data helpers are in `src/services/`. They call the backend directly using `NEXT_PUBLIC_API_URL`; authenticated server calls read the `sAccessToken` cookie.
- Auth uses SuperTokens on client and server. Shared configuration is in `src/utils/supertokens/`; account and callback routes are under `src/app/(auth)/auth/`. The backend also configures SuperTokens and its guards.
- Maps use MapLibre through `react-map-gl/maplibre`. Map state and UI state are in `src/utils/redux/features/map-slice.ts` and `widget-slice.ts`. Coordinate helpers and initial map settings are in `src/utils/helpers/maps.ts` and environment variables.
- The site is English-only. Keep user-facing copy directly in the relevant UI/metadata code; do not reintroduce locale routing, translation dictionaries, language switching, or translation libraries.
- `src/components/features/common/json-ld.tsx` safely renders structured data used by the root layout and indexable place/country pages.
- PWA support is configured in `next.config.ts`; global metadata, fonts, analytics, and providers are assembled in `src/app/layout.tsx`.

## Backend overview and integration

- The backend entry point is `../backend/src/main.ts`; it applies the `/api/v1` global prefix, CORS, global DTO validation, and SuperTokens exception handling. Controllers in `../backend/src/` define the actual HTTP behavior.
- Main API domains are `places`, `places-around`, `reviews`, `lists`, `visited`, `users`/`user`, `countries`, `latest`, `search`, `images`, `settings`, and `tasks`. Most business logic is in the corresponding Nest service and query files.
- Prisma models include users, places and photos, reviews and review photos, categories, lists and list-place links, visited places, ratings, countries, complaints, and mailing-list jobs. Place geometry uses PostGIS; migrations are under `../backend/prisma/migrations/`.
- The frontend uses `NEXT_PUBLIC_API_URL` (normally `http://localhost:3001/api/v1`) for the API and `NEXT_PUBLIC_INTERNAL_API_URL` (normally `http://localhost:3000/api`) for Next routes. Authenticated RTK Query calls include cookies; the backend verifies sessions with SuperTokens.
- Cross-check request/response types in `src/utils/redux/services/**/**.types.ts` and `src/utils/types/` against the backend DTOs and service results when changing an endpoint.

## Local workflow and conventions

- Frontend requires Node.js 18+ per README. Typical commands: `npm install`, `npm run dev` (port 3000), `npm run build`, `npm start`, and `npm run lint`.
- Copy `.env.example` to `.env.local` and configure the required variables. Do not commit `.env.local` or expose secret values. Public variables are embedded into the client bundle; only `SUPERTOKENS_CONNECTION_URI` and `SUPERTOKENS_API_KEY` are intended to remain server-side secrets.
- Frontend Docker Compose expects an external Docker network named `tripadvancer_net`; see `docker-compose.yml` and `Dockerfile`.
- Formatting is Prettier with 4 spaces, no semicolons, single quotes, 120-column print width, sorted imports, and Tailwind class sorting. Use the `@/*` alias for imports from `src/`.
- Keep UI changes in the corresponding feature folder and shared controls in `src/components/ui/`. Follow existing TypeScript types and RTK Query cache-tag/optimistic-update patterns when adding or changing data mutations.

## User's coding rules

- Follow the user's existing code style exactly. Inspect nearby code and repository formatting/lint rules before editing.
- Preserve the user's component naming, component decomposition, and ordering conventions for functions, props, and methods. Do not rename or reorganize for personal preference.
- Keep code simple, safe, and readable. Prefer the smallest clear change that solves the task.
- Clean up code touched or reviewed: remove dead code, stale comments, unused imports, and avoidable duplication. Point out worthwhile improvements; apply small, directly relevant improvements when they do not expand scope or complexity.
- Refactor only when needed to make the requested change safe, understandable, or maintainable. Do not refactor for its own sake.
- Check both repositories' Git status before work and preserve unrelated user edits. The user has explicitly authorized changes to both frontend and backend when the task calls for them.
- Do not add or run tests unless the user asks for testing or verification. If the task asks for an audit or verification, use focused checks and report what was and was not verified.

## Repository notes

- The backend README currently mentions the frontend at `http://localhost:5173`; the frontend's current Next.js scripts and Docker mapping use port `3000`.
- Before editing, inspect `git status` and preserve unrelated user changes. Existing local modifications may be present in files outside the scope of a task.
- Do not assume all old API tests remain active: many backend test files are named `*.spec.old.ts`. Inspect the specific test configuration and target before relying on them.
## Bugfix workflow

- Verify that a GitHub issue is still open and applies to the current code before changing anything. Reproduce it in the app when practical, then inspect the relevant implementation and data flow.
- If an issue is outdated, cannot be reproduced, lacks necessary details, or cannot be fixed safely, leave a concise English comment explaining the finding or asking for the missing information; do not make a speculative change.
- Handle one issue per branch. Create branches from the latest `develop` using `bugfix/<issue-number>` for bugs or `feature/<issue-number>` for features. Use the same branch name in both repositories when a fix needs both.
- Run focused checks for every fix and run the relevant project build or tests when practical. Report blocked checks and their cause.
- After pushing a fix, add a concise English issue comment that says the bug is fixed and includes the branch link and fix commit hash(es). Do not include PR status or links unless the user asks.
- Start each commit message with `[<issue-number>]` followed by a short English description, for example `[358] Refresh review photos after edit`. Use English for branch names and issue comments.
- The user handles PR creation and issue status changes manually unless they explicitly ask otherwise. Do not close an issue or change its status by default.
- Preserve existing UI design and shared components. Apply small SEO improvements when they naturally fit the fix. Database changes require a Prisma migration; never edit production data directly.
